const path = require("path");
module.exports = {
    mode: "production",
    entry: "./calc.ts",
    devtool: "inline-source-map",
    output: {
        filename: "calc.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "umd",
            name: "calc"
        },
        globalObject: "this"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
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
