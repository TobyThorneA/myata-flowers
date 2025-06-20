import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": resolve(__dirname, "src/hooks"),
      "@lib": resolve(__dirname, "src/lib"),
      "@store": resolve(__dirname, "src/store"),
      "@orderForm": resolve(__dirname, "src/orderForm"),
      "@helpers": resolve(__dirname, "src/helpers"),
      "@constants": resolve(__dirname, "src/constants"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"), // если будешь делать общие компоненты
      "@pages": resolve(__dirname, "src/pages") // если будешь делать общие компоненты
    }
  }
})
