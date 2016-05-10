"use strict";
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
    src: path.join(__dirname, "src/"),
    dist: path.join(__dirname, "dist/"),
    demo: path.join(__dirname, "demo/")
};
var COMMON = {
    entry: {
        src: PATHS.src + "<%= projectName %>.js"
    },
    eslint: {
        configFile: path.join(__dirname, ".eslintrc")
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"],
                    plugins: ["transform-runtime"],
                    cacheDirectory: true
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
        entry: {
            src: PATHS.demo + "demo.js"
        },
        output: {
            path: PATHS.demo,
            filename: "demo.bundle.js"
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
        entry: {
            src: PATHS.demo + "demo.js"
        },
        output: {
            path: PATHS.demo,
            filename: "demo.bundle.js"
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: "node_modules/html-webpack-template/index.ejs",
                filename: "index.html",
                title: "<%= projectName %>"
            })
        ]
    });
}

if (TARGET === "build") {
    module.exports = merge(COMMON, {
        entry: {
            src: PATHS.src + "<%= projectName %>.js"
        },
        output: {
            libraryTarget: "umd",
            library: "<%= projectName %>",
            path: PATHS.dist,
            filename: "<%= projectName %>.min.js"
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}
