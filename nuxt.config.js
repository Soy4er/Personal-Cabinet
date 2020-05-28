import bodyParser from 'body-parser'
import session from 'express-session'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Personal Cabinet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Test task for the development of a personal cabinet' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  buildModules: [
    '@nuxtjs/style-resources',
  ],

  modules: [
    '@nuxtjs/toast',
  ],

  styleResources: {
    scss: [
      '@/assets/scss/styles.scss',
    ]
  },

  css: [
    '@/assets/scss/styles.scss'
  ],

  plugins: [
    '@/plugins/vue-localstorage',
    '@/plugins/vue-fontawesome',
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

  /*
  ** Add server middleware
  */
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600000 }
    }),
    '~/api'
  ],

  toast: {
    position: 'top-right',
    duration: 10000,
  }
}

