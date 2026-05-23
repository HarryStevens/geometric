import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const defaultOutputPath = path.resolve(repoRoot, "build/api.generated.js");
const siblingSiteOutputPath = path.resolve(
  repoRoot,
  "../geometric-site/src/lib/api/api.generated.js",
);

const CATEGORY_ORDER = [
  "points",
  "lines",
  "polygons",
  "relationships",
  "angles",
];

function parseArgs(argv) {
  const outFlagIndex = argv.indexOf("--out");
  if (outFlagIndex !== -1 && argv[outFlagIndex + 1]) {
    return {
      outputPath: path.resolve(process.cwd(), argv[outFlagIndex + 1]),
      explicitOutput: true,
    };
  }

  if (argv[0]) {
    return {
      outputPath: path.resolve(process.cwd(), argv[0]),
      explicitOutput: true,
    };
  }

  return {
    outputPath: defaultOutputPath,
    explicitOutput: false,
  };
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function parseIndexExports(source) {
  const entries = [];
  const pattern = /export\s*\{([\s\S]*?)\}\s*from\s*"([^"]+)";/g;

  for (const match of source.matchAll(pattern)) {
    const specifiers = match[1]
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => {
        const [exported] = value.split(/\s+as\s+/);
        return exported.trim();
      });

    for (const name of specifiers) {
      entries.push({
        name,
        file: path.resolve(repoRoot, "src", match[2].replace(/^\.\//, "")),
      });
    }
  }

  return entries;
}

function extractDocInfo(fileSource, name) {
  const functionPattern = new RegExp(
    `export function ${name}\\s*\\(([\\s\\S]*?)\\)\\s*\\{`,
  );
  const functionMatch = fileSource.match(functionPattern);

  if (!functionMatch || functionMatch.index == null) {
    throw new Error(`Could not locate exported function "${name}".`);
  }

  const before = fileSource.slice(0, functionMatch.index);
  const lines = before.split("\n");

  let cursor = lines.length - 1;
  while (cursor >= 0 && lines[cursor].trim() === "") {
    cursor -= 1;
  }

  const jsdocLines = [];
  if (cursor >= 0 && lines[cursor].trim() === "*/") {
    while (cursor >= 0) {
      jsdocLines.unshift(lines[cursor]);
      if (lines[cursor].trim().startsWith("/**")) {
        cursor -= 1;
        break;
      }
      cursor -= 1;
    }
  }

  while (cursor >= 0 && lines[cursor].trim() === "") {
    cursor -= 1;
  }

  const lineCommentLines = [];
  while (cursor >= 0 && lines[cursor].trim().startsWith("//")) {
    lineCommentLines.unshift(lines[cursor].trim().replace(/^\/\/\s?/, ""));
    cursor -= 1;
  }

  const jsdoc = jsdocLines.join("\n");
  const descriptionLines = jsdoc
    .replace(/^\/\*\*|\*\/$/g, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean);

  const tagIndex = descriptionLines.findIndex((line) => line.startsWith("@"));
  const proseLines =
    tagIndex === -1 ? descriptionLines : descriptionLines.slice(0, tagIndex);
  const prose = proseLines.join("\n").trim();
  const fallbackDescription = lineCommentLines.join("\n").trim();
  const description = prose || fallbackDescription || humanizeName(name);
  const summary = firstSentence(description);
  const tagLines =
    tagIndex === -1 ? [] : descriptionLines.slice(tagIndex).filter(Boolean);

  const params = tagLines
    .filter((line) => line.startsWith("@param "))
    .map((line) => {
      const match = line.match(
        /^@param\s+\{([^}]+)\}\s+(\[[^\]]+\]|\S+)(?:\s+(.*))?$/,
      );

      if (!match) {
        throw new Error(`Could not parse @param line for "${name}": ${line}`);
      }

      return {
        type: normalizeType(match[1]),
        rawName: match[2],
        name: match[2].replace(/^\[|\]$/g, "").replace(/=.*/, ""),
        description: (match[3] || "").trim(),
        descriptionHtml: renderDescription((match[3] || "").trim()),
      };
    });

  const returnsLine = tagLines.find((line) => line.startsWith("@returns"));
  const returnsMatch = returnsLine?.match(
    /^@returns?\s+\{([^}]+)\}(?:\s+(.*))?$/,
  );
  const returns = returnsMatch ? normalizeType(returnsMatch[1]) : "unknown";

  return {
    description,
    descriptionHtml: renderDescription(description),
    summary,
    params,
    returns,
  };
}

function normalizeType(value) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripFormatting(value) {
  return value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function renderInlineMarkdown(value) {
  return value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderDescription(value) {
  if (!value) return "";

  const parts = [];
  const codeFencePattern = /```(\w+)?\n([\s\S]*?)```/g;
  let cursor = 0;

  for (const match of value.matchAll(codeFencePattern)) {
    if (match.index > cursor) {
      parts.push({ type: "prose", value: value.slice(cursor, match.index) });
    }

    parts.push({
      type: "code",
      language: match[1] || "",
      value: match[2].replace(/\n$/, ""),
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) {
    parts.push({ type: "prose", value: value.slice(cursor) });
  }

  return parts
    .map((part) => {
      if (part.type === "code") {
        const className = part.language
          ? ` class="language-${part.language}"`
          : "";
        return `<pre><code${className}>${escapeHtml(part.value)}</code></pre>`;
      }

      return part.value
        .trim()
        .split(/\n{2,}/)
        .filter(Boolean)
        .map(
          (paragraph) =>
            `<p>${renderInlineMarkdown(paragraph.replace(/\n/g, " "))}</p>`,
        )
        .join("");
    })
    .join("");
}

function firstSentence(text) {
  const trimmed = stripFormatting(text);
  const sentenceMatch = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  return sentenceMatch ? sentenceMatch[1].trim() : trimmed;
}

function humanizeName(name) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

function buildSignature(name, params) {
  const required = params.filter((param) => !param.rawName.startsWith("["));
  const optional = params.filter((param) => param.rawName.startsWith("["));
  let signature = required.map((param) => param.name).join(", ");

  for (const [index, param] of optional.entries()) {
    if (index === 0) {
      signature += signature ? `[, ${param.name}` : `[${param.name}`;
    } else {
      signature += `[, ${param.name}`;
    }
  }

  if (optional.length > 0) {
    signature += "]".repeat(optional.length);
  }

  return `geometric.${name}(${signature})`;
}

function categoryFromFile(filePath) {
  return path.basename(path.dirname(filePath));
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    const categoryDelta =
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDelta !== 0) {
      return categoryDelta;
    }

    return a.order - b.order;
  });
}

function toModuleSource(entries) {
  const serialized = JSON.stringify(entries, null, 2);

  return `// This file is generated from the local geometric source tree.\n// Do not edit it by hand.\n\nexport const apiGeneratedAt = ${JSON.stringify(
    new Date().toISOString(),
  )};\n\nexport const apiEntries = ${serialized};\n\nexport const apiEntriesBySlug = new Map(apiEntries.map((entry) => [entry.slug, entry]));\n\nexport const apiCategories = [...new Set(apiEntries.map((entry) => entry.category))];\n\n/**\n * @param {string} slug\n */\nexport function getApiEntry(slug) {\n  return apiEntriesBySlug.get(slug) ?? null;\n}\n\n/**\n * @param {string} category\n */\nexport function getApiEntriesByCategory(category) {\n  return apiEntries.filter((entry) => entry.category === category);\n}\n`;
}

async function main() {
  const { outputPath, explicitOutput } = parseArgs(process.argv.slice(2));
  const indexSource = await fs.readFile(
    path.resolve(repoRoot, "src/index.js"),
    "utf8",
  );
  const exports = parseIndexExports(indexSource);

  const entries = [];
  for (const [order, exported] of exports.entries()) {
    const fileSource = await fs.readFile(exported.file, "utf8");
    const doc = extractDocInfo(fileSource, exported.name);

    entries.push({
      slug: exported.name,
      name: exported.name,
      category: categoryFromFile(exported.file),
      signature: buildSignature(exported.name, doc.params),
      summary: doc.summary,
      description: doc.description,
      descriptionHtml: doc.descriptionHtml,
      params: doc.params.map((param) => ({
        name: param.name,
        type: param.type,
        description: param.description,
        descriptionHtml: param.descriptionHtml,
      })),
      returns: doc.returns,
      order,
    });
  }

  const moduleSource = toModuleSource(sortEntries(entries));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, moduleSource);
  console.log(
    `Generated API metadata: ${path.relative(process.cwd(), outputPath)}`,
  );

  if (
    !explicitOutput &&
    (await pathExists(path.dirname(siblingSiteOutputPath)))
  ) {
    await fs.writeFile(siblingSiteOutputPath, moduleSource);
    console.log(
      `Synced geometric-site API metadata: ${path.relative(
        process.cwd(),
        siblingSiteOutputPath,
      )}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
