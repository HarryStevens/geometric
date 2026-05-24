export default {
  input: "src/index.js",
  output: [
    {
      file: "build/geometric.js",
      format: "es",
    },
    {
      file: "build/geometric.cjs",
      format: "cjs",
      exports: "named",
    },
    {
      file: "build/geometric.min.js",
      format: "umd",
      name: "geometric",
      exports: "named",
    },
  ],
};
