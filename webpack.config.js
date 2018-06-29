const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        global: "./app.js",
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //library: 'Entry'
    },
    module: {
        /*loaders: [
            {
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.js$/
            }
        ]*/
    },
    plugins: [
        //new UglifyJSPlugin()
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    //watch: true,
    devtool: "cheap-eval-source-map",
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
    }
};