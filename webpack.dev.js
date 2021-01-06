const { merge } = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    // 动态监测并实时更新页面
    devServer: {
        // contentBase: './dist',
        // 默认端口8080，可不填
        port: 8080,
        // 热更新，无需刷新
        hot: true
    }
});