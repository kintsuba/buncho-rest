export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  telemetry: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    title: '可愛い文鳥の動画を見て癒されたい！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '文鳥は飼いたいけど環境的に飼えないので、せめて動画で可愛い姿を見て癒されたい私のために作ったサイトです。',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '可愛い文鳥の動画を見て癒されたい！',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://buncho.rest/' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '可愛い文鳥の動画を見て癒されたい！',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '文鳥は飼いたいけど環境的に飼えないので、せめて動画で可愛い姿を見て癒されたい私のために作ったサイトです。',
      },
      { hid: 'og:image', property: 'og:image', content: '/icon.png' },
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-windicss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  privateRuntimeConfig: {
    twitterApiKey: process.env.TWITTER_API_KEY,
    twitterApiSecret: process.env.TWITTER_API_SECRET,
    twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
    twitterAccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
}
