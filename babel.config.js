const presets = [
  [
    '@vue/app',
    {
      polyfills: [
        'es6.promise',
        'es6.symbol',
        'es6.array.iterator',
        'es6.object.assign',
        'es7.promise.finally'
      ]
    }
  ],
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: [
          'last 1 version',
          '> 1%',
          'maintained node versions',
          'not dead'
        ]
      },
      useBuiltIns: 'usage', // 垫片使用
      corejs: 2
    }
  ]
]
const plugins = [

]

module.exports = {
  presets,
  plugins
}
