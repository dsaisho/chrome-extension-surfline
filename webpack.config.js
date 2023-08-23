const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',    // Original entry point
    inject: './src/injected.js'   // New entry point
  },
  output: {
    filename: '[name].js',     // Dynamic filename based on the entry point's name
    path: path.resolve(__dirname, 'surfline-extension')
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "extension-manifest.json"),
            to: path.resolve(__dirname, "surfline-extension/manifest.json"),
          },
        ],
      }),
  ]
};