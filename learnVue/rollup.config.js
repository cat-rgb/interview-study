import babelPlugin from 'rollup-plugin-babel'

export default {
    input: './src/main',
    output: {
        file: 'dist/vue.js',
        name: 'Vue',
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        babelPlugin()
    ]
}
