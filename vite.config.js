import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import WindiCSS from 'vite-plugin-windicss';
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()/*, WindiCSS()*/],
//   windicss: {
//     config: 'tailwind.config.js',
//   },
// })

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
