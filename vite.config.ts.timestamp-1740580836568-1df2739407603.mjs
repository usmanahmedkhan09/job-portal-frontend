// vite.config.ts
import vue from "file:///D:/projects/job-portal-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "node:path";
import AutoImport from "file:///D:/projects/job-portal-frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/projects/job-portal-frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///D:/projects/job-portal-frontend/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///D:/projects/job-portal-frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\projects\\job-portal-frontend";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.md$/
        // .md
      ],
      // global imports to register
      imports: [
        "vue",
        "@vueuse/core",
        {
          "@vueuse/integrations/useCookies": ["useCookies"]
        },
        "vue-router",
        "pinia",
        {
          "@indielayer/ui": ["useNotifications"],
          "axios": [
            // default imports
            ["default", "axios"]
            // import { default as axios } from 'axios',
          ],
          "pinia": [
            "createPinia",
            "defineStore"
          ]
        }
      ],
      dirs: ["./src/stores/*", "./src/Types", "./src/Composables/*"],
      defaultExportByFilename: true,
      vueTemplate: true,
      dts: "./auto-imports.d.ts"
    }),
    Components({
      dirs: ["src/Components"],
      extensions: ["vue"],
      directoryAsNamespace: false,
      dts: "src/types/components.d.ts"
    })
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      "@": path.join(__vite_injected_original_dirname, "./src")
    },
    extensions: [".js", ".vue", ".json", ".ts"]
  },
  server: {
    port: 3e3,
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path2) => path2.includes("sanctum") ? path2.replace(/^\/api/, "") : path2
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxqb2ItcG9ydGFsLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxqb2ItcG9ydGFsLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0cy9qb2ItcG9ydGFsLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8vIHRhcmdldHMgdG8gdHJhbnNmb3JtXG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgL1xcLm1kJC8sIC8vIC5tZFxuICAgICAgXSxcblxuICAgICAgLy8gZ2xvYmFsIGltcG9ydHMgdG8gcmVnaXN0ZXJcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ0B2dWV1c2UvaW50ZWdyYXRpb25zL3VzZUNvb2tpZXMnOiBbJ3VzZUNvb2tpZXMnXVxuICAgICAgICB9LFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdwaW5pYScsXG4gICAgICAgIHtcbiAgICAgICAgICAnQGluZGllbGF5ZXIvdWknOiBbJ3VzZU5vdGlmaWNhdGlvbnMnXSxcbiAgICAgICAgICAnYXhpb3MnOiBbXG4gICAgICAgICAgICAvLyBkZWZhdWx0IGltcG9ydHNcbiAgICAgICAgICAgIFsnZGVmYXVsdCcsICdheGlvcyddLCAvLyBpbXBvcnQgeyBkZWZhdWx0IGFzIGF4aW9zIH0gZnJvbSAnYXhpb3MnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgJ3BpbmlhJzogW1xuICAgICAgICAgICAgJ2NyZWF0ZVBpbmlhJyxcbiAgICAgICAgICAgICdkZWZpbmVTdG9yZScsXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZGlyczogWycuL3NyYy9zdG9yZXMvKicsICcuL3NyYy9UeXBlcycsICcuL3NyYy9Db21wb3NhYmxlcy8qJ10sXG4gICAgICBkZWZhdWx0RXhwb3J0QnlGaWxlbmFtZTogdHJ1ZSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgZHRzOiAnLi9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkaXJzOiBbJ3NyYy9Db21wb25lbnRzJ10sXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuICAgICAgZGlyZWN0b3J5QXNOYW1lc3BhY2U6IGZhbHNlLFxuICAgICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgLy8gJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgICdAJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy52dWUnLCAnLmpzb24nLCAnLnRzJ10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgcHJveHk6IHtcbiAgICAgICdeL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTo4MDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5pbmNsdWRlcygnc2FuY3R1bScpID8gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpIDogcGF0aCxcbiAgICAgIH0sXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixPQUFPLFNBQVM7QUFDclMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBTHhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQTtBQUFBLE1BRVQsU0FBUztBQUFBLFFBQ1A7QUFBQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxRQUNBO0FBQUE7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUdBLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNFLG1DQUFtQyxDQUFDLFlBQVk7QUFBQSxRQUNsRDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0Usa0JBQWtCLENBQUMsa0JBQWtCO0FBQUEsVUFDckMsU0FBUztBQUFBO0FBQUEsWUFFUCxDQUFDLFdBQVcsT0FBTztBQUFBO0FBQUEsVUFDckI7QUFBQSxVQUNBLFNBQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBTSxDQUFDLGtCQUFrQixlQUFlLHFCQUFxQjtBQUFBLE1BQzdELHlCQUF5QjtBQUFBLE1BQ3pCLGFBQWE7QUFBQSxNQUNiLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULE1BQU0sQ0FBQyxnQkFBZ0I7QUFBQSxNQUN2QixZQUFZLENBQUMsS0FBSztBQUFBLE1BQ2xCLHNCQUFzQjtBQUFBLE1BQ3RCLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxLQUFLLGtDQUFXLE9BQU87QUFBQSxJQUNuQztBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sUUFBUSxTQUFTLEtBQUs7QUFBQSxFQUM1QztBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFNBQVMsU0FBUyxJQUFJQSxNQUFLLFFBQVEsVUFBVSxFQUFFLElBQUlBO0FBQUEsTUFDN0U7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
