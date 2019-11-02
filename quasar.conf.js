// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function(ctx) {
  return {
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/store/store.ts'
    },
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
    ],

    css: [
      'app.styl',
      'highlight.styl',
      'markd.styl',
      'functions.styl',
      'codemirror.styl',
      'transitions.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'en-us', // Quasar language

      all: false, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QToolbar',
        'QBar',
        'QSpace',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QBtn',
        'QDialog',
        'QPopupProxy'
      ],

      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        // 'Notify'
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push(
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
              formatter: require('eslint').CLIEngine.getFormatter('stylish')
            }
          }
        );
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: false // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: true
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest

      /* eslint-disable @typescript-eslint/camelcase */
      manifest: {
        name: 'Nwotable',
        short_name: 'Nwotable',
        description: 'A note app based on quasar, vue.js and markdown.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    }
  };
};
