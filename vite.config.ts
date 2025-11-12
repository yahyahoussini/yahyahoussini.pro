import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Image optimization plugin
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('webp')) {
          return new URLSearchParams('format=webp&quality=85');
        }
        return new URLSearchParams('format=webp&quality=85');
      }
    }),
    // Bundle analyzer (only in build mode)
    mode === "production" && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal loading
        manualChunks: (id) => {
          // Core React
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          
          // Animations (heavy library)
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          
          // 3D Graphics (very heavy)
          if (id.includes('@splinetool')) {
            return '3d-graphics';
          }
          
          // Charts
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          // Forms
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
          
          // Utils
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utils';
          }
          
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          
          // Query client
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          
          // Node modules go to vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.webp')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.png') || assetInfo.name?.endsWith('.jpg') || assetInfo.name?.endsWith('.jpeg')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      // Tree shaking
      treeshake: {
        moduleSideEffects: false
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: mode === "production" ? ['console.log', 'console.info', 'console.debug'] : []
      }
    },
    // Source maps (disable in production for smaller bundle)
    sourcemap: mode === "development",
    // CSS code splitting
    cssCodeSplit: true,
  },
}));
