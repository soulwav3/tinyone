const path = require('path');

module.exports = {
  entry: {
    App: './src/scripts/App.js',
  },
  output: {
    path: path.resolve('src/temp/scripts'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: [
            [
              "env",
              {
                "targets": {
                  "browsers": ["last 2 versions", "ie >= 10"]
                }
              }
            ]
          ]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}