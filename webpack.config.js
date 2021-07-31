require('dotenv').config()
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './vue/app.js',
  resolve: {
    alias: {
      vue:
        process.env.NODE_ENV === 'production'
          ? 'vue/dist/vue.min.js'
          : 'vue/dist/vue.js'
    }
  },
  output: {
    path: __dirname + '/public/js',
    filename: 'app.min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
