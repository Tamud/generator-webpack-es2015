var webpack = require("webpack");
var merge = require("webpack-merge");
var path = require("path");
var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
    src: path.join(__dirname, "src"),
    app: path.join(__dirname, "app")
};
var COMMON = {
    entry: {
        src: PATHS.src
    },
    output: {
        path: PATHS.app,
        filename: "app.min.js"
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/}
        ]
    }
};

if (TARGET === "start" || !TARGET) {
    module.exports = merge(COMMON, {
        devServer: {
            contentBase: PATHS.app,
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
