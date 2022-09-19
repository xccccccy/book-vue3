import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

let localDevApiUrl = 'http://localhost:5001'
let remoteApiUrl = 'http://8.142.136.153:5001'

var realApiUrl = remoteApiUrl

// https://vitejs.dev/config/
export default defineConfig({
  // 要用到的插件数组
  plugins: [
  vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  ],
  // 开发或生产环境服务的公共基础路径,可以是/foo/、https://foo.com/、空字符串或./(用于开发环境) 几种类型，这个选项也可以通过命令行参数指定（例：vite build --base=/my/public/path/）
  base: '/',
  // 静态资源服务的文件夹, 默认"public"
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    host: '0.0.0.0',
    // 服务器端口号
    port: 3000,
    // boolean | string 启动项目时自动在浏览器打开应用程序；如果为string，比如"/index.html"，会打开http://localhost:3000/index.html
    open: false,
    // 自定义代理规则
    proxy: {
      '/api': {
        target: realApiUrl, // 8.142.136.153:5001
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/faceapi': {
        target: realApiUrl, // localhost:5001
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/faceapi/, '/faceapi')
      },
      '/_api': {
        target: realApiUrl, // localhost:5001 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_api/, '/api')
      },
      '/spy/api': {
        target: realApiUrl, // 8.142.136.153:5001
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spy\/api/, '/')
      },
    }
  },
  build: {
    // 指定输出路径，默认'dist'
    outDir: '../flask-vue-myworld/static',

    // 指定生成静态资源的存放路径(相对于build.outDir)
    assetsDir: 'assets',
    
    // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
    assetsInlineLimit: '4096',

    // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
    cssCodeSplit: true,

    // 构建后是否生成source map文件，默认false
    sourcemap: false,
    
    // 为true时，会生成manifest.json文件，用于后端集成
    manifest: false
  }
})
