import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-console": ["warn", { allow: ["error"] }],
      "no-restricted-syntax": "error",
    },
  },
  globalIgnores([".vercel", "note.ts"]),
]);
