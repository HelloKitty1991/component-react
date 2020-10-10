const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const components = {};
const componentsPath = path.join(__dirname, 'src', 'components');
const dirs = fs.readdirSync(path.join(__dirname, 'src', 'components'));
(dirs || []).forEach(dir => {
    const filePath = path.join(componentsPath, dir, 'index.js');
    if (fs.existsSync(filePath)) {
        components[dir] = filePath;
    }
});
module.exports = merge(baseConfig, {
    mode: 'production',
    entry: components,
    output: {
        path: path.join(__dirname, 'lib', 'components')
    }
});
