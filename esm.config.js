import cdn from "rollup-plugin-cdn";
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
    cdn(),
    resolve({
      module: true,
      jsnext: true,
      browser: true
    })
  ]
};
