import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

import cdn from "rollup-plugin-cdn";
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
    cdn(),
    resolve({
      module: true
    }),
    babel(babelrc())
  ]
};
