export default [
  {
    ignores: [".next/**", "node_modules/**", "build/**", "dist/**"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];
