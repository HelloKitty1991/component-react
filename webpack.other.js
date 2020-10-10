const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');

const entryMap = {};
['mixins', 'directive'].forEach(type => {
    const dirPath = path.join(__dirname, 'src', type);
    const dirs = fs.readdirSync(dirPath);
    (dirs || []).forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.existsSync(filePath)) {
            entryMap[path.posix.join(type, file.slice(0, file.lastIndexOf('.')))] = filePath;
        }
    });
});

module.exports = merge(baseConfig, {
    entry: entryMap,
    plugins: [
        // new BundleAnalyzerPlugin(),
    ],
});
