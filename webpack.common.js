const path = require("path");
module.exports = {
    mode: "production",
    entry: "./calc.ts",
    output: {
        filename: "calc_common.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "commonjs",
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
