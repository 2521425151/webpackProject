const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "m/js/start": './src/node/start.js',
        "m/js/end": './src/node/end.js',
        "pc/js/start": './src/node/start.js',
        "PC/js/end": './src/node/end.js'
    },
    // 编译输出配置
    output: {
        // [name]表示保留原js文件名
        filename: '[name].js',
        // 更改输出路径dist -> custom_output
        path: path.resolve(__dirname, 'custom_output'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 修改webpack.common.js，代码作用是将src/static直接copy到dist，并重命名为static。
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/static', to: 'static' }
            ],
        })
    ]
};
