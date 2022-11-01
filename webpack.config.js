const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    mode: "development",
    // How it will run
    // target: "web",
    // devServer: {
    //     port: "3000",
    //     static: ["./public"],
    //     open: true,
    //     hot: true,
    //     liveReload: true,
    // },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts"],
    },
    module: {
        // Rules for compiler dealing with different styles
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",

            },
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
              },
        ],
    },
};