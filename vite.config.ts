import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@hooks", replacement: resolve(dirName, "src/hooks") },
      { find: "@lib", replacement: resolve(dirName, "src/lib") },
      { find: "@store", replacement: resolve(dirName, "src/store") },
      { find: "@orderForm", replacement: resolve(dirName, "src/orderForm") },
      { find: "@helpers", replacement: resolve(dirName, "src/helpers") },
      { find: "@constants", replacement: resolve(dirName, "src/constants") },
      { find: "@assets", replacement: resolve(dirName, "src/assets") },
      { find: "@components", replacement: resolve(dirName, "src/components") },
      { find: "@pages", replacement: resolve(dirName, "src/pages") },
    ],
  },
});
