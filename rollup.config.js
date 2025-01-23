import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "build/geometric.js",
      format: "es",
    },
    {
      file: "build/geometric.umd.js",
      format: "umd",
      name: "geometric"
    }
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**"
    })
  ]
};
