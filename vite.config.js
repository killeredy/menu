import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const babelPlugins = [];

if (process.env.MIGHTYMELD) {
  babelPlugins.push('@mightymeld/runtime/babel-plugin-mightymeld');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: babelPlugins
      }
    })],
  base: './wp-content/plugins/linha-menu/dist/',
  assetsDir: 'assets',


  
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      outDir: './wp-content/plugins/linha-menu/dist',
      // Customize the name of the output file for production build
      output: {
        // For example, remove the ".js" suffix
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
