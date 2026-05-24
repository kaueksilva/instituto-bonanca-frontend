import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // This is a single-language (pt-BR) website — i18n is not required.
      "i18next/no-literal-string": "off",
      // Next.js/React components legitimately use spread props.
      "react/jsx-props-no-spreading": "off",
    },
  },
]);

export default eslintConfig;
