const path = require("path")

module.exports = {
    entry: {
        bundle: "./js/index.ts"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "src/assets/js")
    },

    mode: "production",
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                use: [
                    { loader: "babel-loader" }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                use: [
                    { loader: "babel-loader" }
                ]
            }
        ]
    }
}
