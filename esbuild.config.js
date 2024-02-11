#!/usr/bin/env node

/**
 * Build static frontend assets
 * @ref: https://esbuild.github.io/getting-started/#bundling-for-the-browser
 * @ref: https://esbuild.github.io/api/#target
 */

import { unlink } from "node:fs/promises";
import autoprefixer from "autoprefixer";
import { build } from "esbuild";
import postCssPlugin from "esbuild-style-plugin";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";

await build({
  entryPoints: ["assets/js/app.js", "assets/css/styles.css"],
  outdir: "static",
  bundle: true,
  sourcemap: false,
  allowOverwrite: true,
  minify: process.env.NODE_ENV === "production",
  target: ["chrome58", "firefox57", "safari11", "edge16"],
  drop: ["console", "debugger"],
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [postcssImport, autoprefixer, tailwindcss],
      },
    }),
  ],
})
  .then(async () => {
    console.log("Frontend assets has been compiled successfully.");
    await unlink("static/css/styles.js");
    process.exit(0);
  })
  .catch(() => {
    console.error(`Failed to compile frontend assets: ${error}`);
    process.exit(1);
  });
