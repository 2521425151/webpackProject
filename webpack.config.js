const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js'
    },
    plugins: [
        // 自动清空dist目录
        new CleanWebpackPlugin(),
        // 设置html模板生成路径
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['login']
        }),
    ],
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};