var path = require('path');

module.exports = {
  entry: {
    popup: "./js/popup.js"
  },
  output: {
    path: './build',
    filename: "[name].build.js"
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/, loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
