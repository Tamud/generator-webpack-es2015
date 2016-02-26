"use strict";
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
    src: path.join(__dirname, "src/"),
    build: path.join(__dirname, "build/"),
    demo: path.join(__dirname, "demo/")
};
var COMMON = {
    entry: {
        src: PATHS.src + "index.js"
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.(css)|(sass)|(scss)|(less)|(styl)$/,
                loader: "style!css"
            }
        ]
    }
};

if (TARGET === "start" || !TARGET) {
    module.exports = merge(COMMON, {
        eslint: {
            configFile: path.join(__dirname, ".eslintrc")
        },
        output: {
            path: PATHS.demo,
            filename: "index.bundle.js"
        },
        devServer: {
            contentBase: PATHS.demo,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: "errors-only",
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === "demo") {
    module.exports = merge(COMMON, {
        output: {
            path: PATHS.demo,
            filename: "index.bundle.js"
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "demo.html"
            })
        ]
    });
}

if (TARGET === "build") {
    //module.exports = merge(COMMON, {
    //    output: {
    //        path: PATHS.build,
    //        filename: "index.min.js"
    //    },
    //    plugins: [
    //        new webpack.optimize.UglifyJsPlugin({
    //            compress: {
    //                warnings: false
    //            }
    //        })
    //    ]
    //});
}
