import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // Required for GitHub Pages: assets are served from /rahul-portfolio/ sub-path
    base: process.env.GITHUB_PAGES ? "/rahul-portfolio/" : "/",
  },
});
