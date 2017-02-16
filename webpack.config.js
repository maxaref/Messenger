const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src/js'),
    entry: {
        app: './app.jsx',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].js',
        publicPath: '/js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'react'] }
                }],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[hash].[ext]'
                    }
                }
            }
        ],
    }
};
