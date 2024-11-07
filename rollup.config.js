import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import hashbang from 'rollup-plugin-hashbang'

const entries = ['src/index.js']

const plugins = [
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ]
  }),
  json(),
  hashbang.default(),
  commonjs()
]

export default [
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.js', '.mjs'),
        format: 'esm'
      },
      {
        file: input.replace('src/', 'dist/').replace('.js', '.cjs'),
        format: 'cjs'
      }
    ],
    external: [],
    plugins
  }))
]
