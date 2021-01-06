const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        start: './src/node/start.js',
        end: './src/node/end.js'
    },
    // 编译输出配置
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
        // 输出路径为dist
        path: path.resolve(__dirname, 'dist'),
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
