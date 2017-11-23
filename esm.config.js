import alias from "rollup-plugin-alias";
import resolve from "rollup-plugin-node-resolve";


export default {
  input: 'esm/index.js',
  output: {
    exports: 'named',
    file: 'index.js',
    format: 'iife',
    name: 'HyperHTMLElement'
  },
  plugins: [
    alias({
      'https://unpkg.com/hyperhtml@latest/esm/index.js': 'node_modules/hyperhtml/esm/index.js'
    }),
    resolve({
      module: true,
      jsnext: true,
      browser: true
    })
  ]
};
