const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    entry: [
        'react-hot-loader/patch',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        resolve('src/demo/entry.js')
    ],
    devtool: 'source-map',
    devServer: {
        inline: true,
        open: true,
        port: process.env.port || 8006,
        hot: true,
        compress: true,
        host: 'localhost',
        progress: true,
        historyApiFallback: true,
        https: false,
        disableHostCheck: true
    },
    output: {
        pathinfo: true,
        publicPath: '',
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/chunk/[name].[hash:8].js',
        library: 'library',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    // 4.0配置
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all'
        }
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        },
        extensions: ['js', 'jsx'],
        modules: ['node_modules']
    },
    module: {
        // 4.0之前是 loaders,现在修改为 rules
        rules: [{
            oneOf: [{
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 8192,
                    outputPath: ''
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=happyBabel'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader')
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                loader: 'file-loader',
                exclude: [/\.js$/, /\.jsx$/, /\.html$/, /\.json$/],
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: ''
                }
            }
            ]
        }]
    },
    plugins: [
        new HappyPack({
            // 用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            // 如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader'
            }],
            // 共享进程池
            threadPool: happyThreadPool,
            // 允许 HappyPack 输出日志
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new LodashModuleReplacementPlugin({
            paths: true,
            collections: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('public/index.html'),
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
        // new BundleAnalyzerPlugin()
    ]
};
