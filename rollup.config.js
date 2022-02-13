import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: './src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/bundle.cjs.js',
      sourcemap: !isProduction,
      exports: 'named',
      plugins: [isProduction && terser({ module: false, toplevel: true })]
    },
    {
      format: 'es',
      file: 'dist/bundle.esm.js',
      sourcemap: !isProduction,
      plugins: [isProduction && terser({ module: true, toplevel: false })]
    }
  ],
  plugins: [resolve(), commonjs()],
  external: ['react'],
  watch: {
    exclude: 'node_modules/**'
  }
}
