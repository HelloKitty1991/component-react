const merge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
    ]
});
