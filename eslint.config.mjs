import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import hooksPlugin from "eslint-plugin-react-hooks";
import stylexPlugin from "@stylexjs/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import eslintPluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: eslintPluginReact,
      "react-hooks": fixupPluginRules(hooksPlugin),
    },
  },
  {
    plugins: {
      "@stylexjs": fixupPluginRules(stylexPlugin),
    },
    rules: {
      "@stylexjs/sort-keys": [
        "error",
        {
          allowLineSeparatedGroups: true,
        },
      ],
      "@stylexjs/valid-styles": [
        "error",
        {
          propLimits: {
            backgroundColor: { limit: "*" },
            "border*Color": { limit: "*" },
            borderRadius: { limit: "*" },
            color: { limit: "*" },
            fontWeight: { limit: "*" },
          },
        },
      ],
    },
  },
  {
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  { settings: { react: { version: "19" } } },
  { ignores: ["**/dist/**/*", "**/out/**/*", "**/.tshy*/**/*"] },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
