import babel from "@rollup/plugin-babel"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

const extensions = [".js", ".ts"]

export default {
    external: [
        "effector"
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
            globals: {
                "effector": "effector"
            },
        },
        {
            file: "./dist/effector-extra.iife.js",
            format: "iife",
            name: "EffectorExtra",
            sourcemap: true,
            globals: {
                "effector": "effector"
            },
        }
    ],
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**",
            extensions,
        }),
        nodeResolve({ extensions }),
        commonjs({ extensions }),
        terser(),
    ]
}
