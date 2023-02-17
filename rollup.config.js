import nodeResolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import sourcemaps from 'rollup-plugin-sourcemaps';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.MODE === 'production' || false;
const input = './index.js';
const outputFile = isProduction ? 'dist/index.min.js' : './dist/index.js';
const format = 'es';
const plugins = [
  nodeResolve(),
  copy({
    targets: [
      // { src: 'index.html', dest: 'dist' },
      // { src: ['gltf'], dest: 'dist' },
      { src: ['index.html', 'gltf'], dest: 'dist' },
    ]
  })
];

const config = () => {
  if (isProduction) {
    return {
      input,
      output: {
        file: outputFile,
        format,
        plugins: [terser()],
      },
      plugins: [...plugins],
    };
  } else {
    return {
      input,
      output: {
        sourcemap: true,
        file: outputFile,
        format,
      },
      plugins: [...plugins, sourcemaps()],
    };
  }
};

export default config();