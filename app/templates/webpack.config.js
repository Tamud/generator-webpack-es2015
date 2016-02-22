var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
    src: path.join(__dirname, "src"),
    build: path.join(__dirname, "build")
};
var COMMON = {
    entry: {
        src: PATHS.src + "<%= projectName %>.js"
    },
    output: {
        path: PATHS.build,
        filename: "<%= projectName %>.bundle.js"
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            {test: /(\.sass)|(\.scss)|(\.less)|(\.styl)$/, loader: "style!css<%= (typeof preprocessor === 'undefined' || preprocessor === 'none') ? '' : '!' + preprocessor %>"}
        ]
    }
};

if (TARGET === "start" || !TARGET) {
    module.exports = merge(COMMON, {
        eslint: {
            configFile: path.join(__dirname, ".eslintrc")
        },
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === "build") {
    module.exports = merge(COMMON, {
    });
}
