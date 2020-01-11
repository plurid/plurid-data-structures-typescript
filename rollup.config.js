import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';



export default {
    input: 'source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: false,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: false,
        },
    ],
    plugins: [
        typescript({
            check: false,
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
    ],
}
