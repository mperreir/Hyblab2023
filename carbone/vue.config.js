module.exports = {
  pages: {
    'home': {
      entry: './src/pages/Home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'home' ],
    },
    'map': {
      entry: './src/pages/Map/main.js',
      template: 'public/index.html',
      title: 'Map',
      chunks: [ 'chunk-vendors', 'chunk-common', 'map' ]
    },
    'credit': {
      entry: './src/pages/Credit/main.js',
      template: 'public/index.html',
      title: 'Credit',
      chunks: [ 'chunk-vendors', 'chunk-common', 'credit' ]
    },
    'solutions': {
      entry: './src/pages/Solutions/main.js',
      template: 'public/index.html',
      title: 'Solutions conrètes',
      chunks: [ 'chunk-vendors', 'chunk-common', 'solutions' ]
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.geojson$/,
          loader: 'json-loader'
        }
      ]
    }
  },
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/carbone/'
  //   : '/'
}