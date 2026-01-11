import nextConfig from "eslint-config-next";
import importPlugin from "eslint-plugin-import";

const config = [
  ...nextConfig,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
];

export default config;