import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
  ],
  external: ['bootstrap-daterangepicker', 'moment', 'jquery', 'react'],
};
