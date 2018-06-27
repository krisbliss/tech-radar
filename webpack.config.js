const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        global: path.resolve(__dirname, './src/app.js')
    },

    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'bundle.js'
    },

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    plugins: [
        new UglifyJSPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]

    // devtool: "cheap-eval-source-map",
    // devServer: {
    //     // Only uncomment host settings for running devServer on docker
    //     //host: '0.0.0.0',
    //     hot: true,
    //     //contentBase: path.resolve(__dirname, 'dist'),
    //     port:8000
    // }
};
