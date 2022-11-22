// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default defineNuxtConfig({

    svg: {
        vueSvgLoader: {
            // vue-svg-loader options
        },
        svgSpriteLoader: {
            // svg-sprite-loader options
        },
        fileLoader: {
            // file-loader options
        },

    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
             ],
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
            meta: [
                { name: 'robots', content: 'noindex' }
            ],
        }
    },

    css: [

        '@/assets/css/normalize.css',
        '@/assets/css/style.css',
        '@/assets/css/responsive.css'
    ],
   



    axios: {
        baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
    },
    buildModules: ["@nuxtjs/svg"],

    runtimeConfig: {
        public: {
            api: process.env.NUXT_API_URL,
            backend: process.env.NUXT_APP_LARAVEL_URL,
        }
    },
    ssr: true,


})
