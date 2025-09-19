import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@lib', replacement: resolve(__dirname, 'src/lib') },
      { find: '@store', replacement: resolve(__dirname, 'src/store') },
      { find: '@orderForm', replacement: resolve(__dirname, 'src/orderForm') },
      { find: '@helpers', replacement: resolve(__dirname, 'src/helpers') },
      { find: '@constants', replacement: resolve(__dirname, 'src/constants') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') }
    ]
  }
});


// import { defineConfig } from 'vite'
// import { resolve } from "path";
// import react from '@vitejs/plugin-react'
// import svgr from 'vite-plugin-svgr'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       "@hooks": resolve(__dirname, "src/hooks"),
//       "@lib": resolve(__dirname, "src/lib"),
//       "@store": resolve(__dirname, "src/store"),
//       "@orderForm": resolve(__dirname, "src/orderForm"),
//       "@helpers": resolve(__dirname, "src/helpers"),
//       "@constants": resolve(__dirname, "src/constants"),
//       "@assets": resolve(__dirname, "src/assets"),
//       "@components": resolve(__dirname, "src/components"), // если будешь делать общие компоненты
//       "@pages": resolve(__dirname, "src/pages") // если будешь делать общие компоненты
//     }
//   }
// });
