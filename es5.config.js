import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

import alias from "rollup-plugin-alias";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: 'esm/index.js',
  output: {
    exports: 'named',
    file: 'es5.js',
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
    }),
    babel(babelrc())
  ]
};
