'use strict'
const ck = require('chalk')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV) // 判断是否为生产环境
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const resolve = dir => path.resolve(__dirname, dir)

console.log(ck.yellow.bold(`process.env.NODE_ENV: ${process.env.NODE_ENV}\n`))

module.exports = {
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  publicPath: '/',
  lintOnSave: true,
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/assets/theme/cube-ui'
        ]
      }
      // less: {
      //   data: `@import "~@/assets/theme/default/color.less";`
      // }
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    },
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/theme/default/color.less')
      ]
    }
  },
  pwa: {

  },
  // 配置webpack（链式）
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 修复 Lazy loading routes Error
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })

    // config.resolve.extensions = ['.js', '.vue', '.json', '.css'];
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))

    // 压缩图片
    // config.module
    //     .rule("images")
    //     .use("image-webpack-loader")
    //     .loader("image-webpack-loader")
    //     .options({
    //         mozjpeg: {progressive: true, quality: 65},
    //         optipng: {enabled: false},
    //         pngquant: {quality: "65-90", speed: 4},
    //         gifsicle: {interlaced: false},
    //         webp: {quality: 75}
    //     });
  },
  // 配置webpack
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'] // 移除console
            },
            warnings: false,
            mangle: false,
            output: {
              beautify: true// 压缩注释
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
    if (!IS_PROD) {
      /*
      * 不好用的配置项
      * cheap-eval-source-map
      * cheap-module-eval-source-map
      * eval-source-map
      *
      * 好用
      * cheap-source-map
      * cheap-module-source-map
      * inline-cheap-source-map
      * inline-cheap-module-source-map
      * source-map
      * inline-source-map
      * */
      config.devtool = 'inline-source-map'
    }
    // console.log(ck.blue(JSON.stringify(config)));
    // 配置 externals
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    config.externals = {
      'TcPlayer': 'TcPlayer'
    }
    // config.resolve = {
    //   extensions: ['.js', '.vue', '.json', '.css'],
    //   alias: {
    //     'vue$': 'vue/dist/vue.esm.js',
    //     '@': resolve('src')
    //   }
    // };
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8012',
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'https://api.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'https://api.zhuishushenqi.com'
        }
      },
      '/tnnevol': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tnnevol': 'http://127.0.0.1:3000'
        }
      }
    }
  }
}
