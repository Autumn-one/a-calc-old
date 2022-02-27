const path = require("path");
module.exports = {
    mode: "production",
    entry: "./calc.ts",
    output: {
        filename: "calc.umd.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "umd",
            name: "calc",
        },
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
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
