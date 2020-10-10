const path = require('path');


const ImageminWebpackPlugin = require('imagemin-webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs'
    },
    optimization: {
        minimize: false
    },
    module: {
        // 4.0之前是 loaders,现在修改为 rules
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new LodashModuleReplacementPlugin({
            paths: true,
            collections: true
        }),
        new ImageminWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', 'json'],
        modules: ['node_modules']
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'react-router': {
            root: 'ReactRouter',
            commonjs: 'react-router',
            commonjs2: 'react-router',
            amd: 'react-router'
        },
        moment: {
            root: 'moment',
            commonjs2: 'moment',
            commonjs: 'moment',
            amd: 'moment'
        }
    }
};
