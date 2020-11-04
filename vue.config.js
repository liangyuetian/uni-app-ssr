const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VUE_NODE = process.env.VUE_NODE === 'node'
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  css: {
    extract: false // 关闭提取css,不关闭 node渲染会报错
  },
  configureWebpack: (c) => {
    // console.log(c)
    return {
      // 将 entry 指向应用程序的 server entry 文件
      entry: {
        index: [VUE_NODE ? './entry-server.js' : './entry-client.js']
      },
      //
      // // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
      // // 并且还会在编译 Vue 组件时，
      // // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
      target: VUE_NODE ? 'node' : 'web',
      // // 对 bundle renderer 提供 source map 支持
      devtool: 'source-map',
      // externals: [nodeExternals()], // 排除node_modules
      // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
      output: {
        libraryTarget: VUE_NODE ? 'commonjs2' : undefined
      },
      // https://webpack.js.org/configuration/externals/#function
      // https://github.com/liady/webpack-node-externals
      // 外置化应用程序依赖模块。可以使服务器构建速度更快，
      // 并生成较小的 bundle 文件。
      // externals: nodeExternals({
      //   // 不要外置化 webpack 需要处理的依赖模块。
      //   // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      //   // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      //   allowlist: /\.css$/
      // }),

      // 这是将服务器的整个输出
      // 构建为单个 JSON 文件的插件。
      // 默认文件名为 `vue-ssr-server-bundle.json`
      plugins: [
        // new HtmlWebpackPlugin({
        //   template:'./public/index.html',
        //   filename:'index22.html'
        // }),
        VUE_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
      ]
    }
  }
}
