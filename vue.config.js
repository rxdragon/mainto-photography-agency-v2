/* eslint-disable no-console */
const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',

  // 是否使用md5码
  filenameHashing: true,

  // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  lintOnSave: true,

  // 生产环境是否开启source map
  productionSourceMap: true,

  // 内容安全策略及子资源完整性
  integrity: false,

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@assetsDir', resolve('src/assets'))
    if (config.plugins.has('progress') && process.env.CI_RUNNER_ID) {
      config.plugins.delete('progress')
    }
    config.plugin('define')
      .tap(args => {
        args[0].BUILD_TIME = +Date.now()
        console.log('打包时间：' + args[0].BUILD_TIME)
        return args
      })
  },

  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        configFile: '.stylelintrc.js',
        files: ['./src/assets/**/*.less', './src/**/*.vue'],
        formatter: 'verbose',
        fix: true
      })
    ]
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/styles/variables.less')
      ]
    }
  }
}
