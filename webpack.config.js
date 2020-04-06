const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin")

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve("./dist"),
        filename: "script/bundle.js"
    },
    plugins: [
        // 打包html
        new HtmlWebpackPlugin({
            template: "./public/index.html" //使用该路径下的html作为模板，自动引入打包后的bundle.js
        }),
        // 打包时清空原来dist中的内容
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
            test: /.ts$/,
            loader: "ts-loader"
        }]
    },
    resolve: {
        extensions: [".ts", ".js"] //解析时先查找ts文件，没有再看js文件
    }
}