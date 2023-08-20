/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import path from "path";
import { defineConfig } from "vite";

export default defineConfig(function({ mode, command }) {
  return {
    root: command === "build" ? "./" : "./test/",
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "src/": path.resolve(__dirname, "src") + "/",
      },
    },
    plugins: [
    ],
    optimizeDeps: {
      include: [
      ]
    },
    build: {
      target: "modules",
      polyfillModulePreload: false,
      lib: {
        entry: "src/index",
        name: "i18n",
        formats: ["es"],
        fileName: "i18n"
      },
      cssCodeSplit: true,
      sourcemap: false,
      manifest: false,
      rollupOptions: {
        external: [
        ],
        output: {
          inlineDynamicImports: true
        }
      }
    },
  };
});
