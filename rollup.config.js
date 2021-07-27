import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

export default {
    external: [
        "effector",
    ],
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: true,
        },
        {
            file: pkg["umd:main"],
            format: "umd",
            sourcemap: true,
            name: "EffectorExtra",
        },
        {
            file: "./dist/effector-extra.iife.js",
            format: "iife",
            name: "EffectorExtra",
            sourcemap: true,
        }
    ],
    plugins: [
        terser(),
        typescript(),
        babel({
            exclude: "node_modules/**",
            extensions: [".js", ".ts", ".tsx"],
        }),
    ]
}
