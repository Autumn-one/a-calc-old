const path = require("path");
module.exports = {
    mode: "production",
    entry: "./src/calc.js",
    devtool: "source-map",
    output: {
        filename: "calc.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "umd",
            name: "a_calc"
        },
        globalObject: "this"
    },
    externals: {
        numbro: {
            root: "numbro",
            commonjs: "numbro",
            commonjs2: "numbro",
            amd: "numbro"
        }
    }

};
