export default defineNuxtConfig({
    // build: {
    //     transpile: ['swiper']
    // },
    css: ['~/assets/style/style.css'],
    modules: ['@nuxtjs/prismic', 'nuxt-swiper'],
    swiper: {
        prefix: 'Swiper',
        styleLang: 'css',
        modules: ['navigation', 'pagination'],

    },
    prismic: { endpoint: 'roxanakenjeeva' },
    plugins: [{ src: "@/plugins/snipcart", ssr: false, mode: "client" }],
})