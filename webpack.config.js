const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: { 
        app:path.resolve(__dirname, "./src/app.js"),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },
    module: {

    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],

    devServer:{
        contentBase: path.join(__dirname,'./public'),
        port: 8080,
        hot: true,
    },
    
    devtool: 'cheap-eval-source-map'
};