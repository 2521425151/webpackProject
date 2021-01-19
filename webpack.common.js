const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        "mobile/js/start": './src/node/start.js',
        "mobile/js/end": './src/node/end.js',
        "pc/js/start": './src/node/start.js',
        "PC/js/end": './src/node/end.js',
        "PC/css/common": './src/node/index.css'
    },
    // 编译输出配置
    output: {
        // [name]表示保留原js文件名
        filename: '[name].js',
        // 更改输出路径dist -> custom_output
        path: path.resolve(__dirname, 'custom_output'),
    },
    resolve:{
        alias:{ // 通过别名来把原导入路径映射成一个新的导入路径
            '@': path.resolve(__dirname, 'src')
        }
    },
    /* optimization: {
        splitChunks: {
            cacheGroups: {
               styles: { // 修改webpack.common.js，使用正则，把src/css/common/下的css单独打包并引用。
                   test: /[\\/]common[\\/].+\.css$/,
                   name: 'style',
                   chunks: 'all',
                   enforce: true
               }
            }
        }
    }, */
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,   // 正则表达式，表示.css后缀的文件
                use: [
                    devMode ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          publicPath: './'
                        },
                    },
                    'css-loader'
                ]   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },
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
        // 用于解决只有样式条目(CSS/sass/less/手写笔)生成额外js文件的问题
        new FixStyleOnlyEntriesPlugin(),
        // 分离样式到css文件,把样式通过link方式引入
        new MiniCssExtractPlugin({
            filename: ({chunk}) => {
                if(chunk.name.includes('css')){ // 直接在入口配置css文件
                    return `[name].css`
                }else{ // 引入到相应入口的js文件的css文件
                    return `${chunk.name.split("/")[0]}/css/${chunk.name.split("/")[2]}.css`;
                }
                
            },
        }),
        // 每次编译前清空上一次编译文件
        new CleanWebpackPlugin(),
        // 修改webpack.common.js，代码作用是将src/static直接copy到dist，并重命名为static。
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/static', to: 'static' }
            ],
        })
    ]
};
