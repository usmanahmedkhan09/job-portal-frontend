import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        'vue',
        '@vueuse/core',
        {
          '@vueuse/integrations/useCookies': ['useCookies']
        },
        'vue-router',
        'pinia',
        {
          '@indielayer/ui': ['useNotifications'],
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          'pinia': [
            'createPinia',
            'defineStore',
          ]
        }
      ],
      dirs: ['./src/stores/*', './src/Types', './src/Composables/*'],
      defaultExportByFilename: true,
      vueTemplate: true,
      dts: './auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/Components'],
      extensions: ['vue'],
      directoryAsNamespace: true,
      dts: 'src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  server: {
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.includes('sanctum') ? path.replace(/^\/api/, '') : path,
      },
    }
  }
})
