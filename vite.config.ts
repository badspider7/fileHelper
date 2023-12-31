import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { notBundle } from 'vite-plugin-electron/plugin'
import pkg from './package.json'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import svgLoader from 'vite-svg-loader';


// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@@": path.resolve(__dirname, "electron")
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      electron([
        {
          // Main process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
            } else {
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons, 
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            plugins: [
              // This is just an option to improve build performance, it's non-deterministic!
              // e.g. `import log from 'electron-log'` -> `const log = require('electron-log')` 
              isServe && notBundle(),
            ],
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart({ reload }) {
            // Notify the Renderer process to reload the page when the Preload scripts build is complete, 
            // instead of restarting the entire Electron App.
            reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            plugins: [
              isServe && notBundle(),
            ],
          },
        }
      ]),
      // Use Node.js API in the Renderer process
      renderer(),
      svgLoader(({
        svgoConfig: {
          // plugins: [
          //   {
          //     name: 'cleanupIDs',
          //     params: {
          //       prefix: {
          //         // 避免不同 svg 内部的 filter id 相同导致样式错乱
          //         // https://github.com/svg/svgo/issues/674#issuecomment-328774019
          //         toString() {
          //           let count: number = this.count ?? 0;
          //           count++;
          //           this.count = count;
          //           return `svg-random-${count.toString(
          //             36,
          //           )}-`;
          //         },
          //       } as string,
          //     }
          //   }
          // ]
        }
      })),
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
