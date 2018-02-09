import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ],
  external: [
    'bootstrap-daterangepicker',
    'moment',
    'jquery',
    'react',
    'prop-types'
  ]
};
