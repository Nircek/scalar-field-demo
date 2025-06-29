import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages (if deploying to a subdirectory)
  base: '/scalar-field-demo/',
  
  // Build configuration
  build: {
    // Output directory for built files
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: true,
    
    // Minify CSS and JS
    minify: 'terser',
    
    // Rollup options
    rollupOptions: {
      output: {
        // Keep the original file structure
        preserveModules: false,
        
        // Add hashes to filenames for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  }
}); 