// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  outDir: "../dist/frontend", // keeps frontend builds separate from Strapi
  vite: {
    plugins: [tailwindcss()],
  },
});
