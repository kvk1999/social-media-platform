import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js', // Your entry file
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
    },
    plugins: [resolve()],
};
