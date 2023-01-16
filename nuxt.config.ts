// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    imports: {
        dirs: ['stores'],
    },

    css: ['~/assets/style/bootstrap.min.css'],
    modules: ['@nuxtjs/prismic',['@pinia/nuxt', {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },]],
    prismic: { endpoint: 'roxanakenjeeva' },
    plugins: [{ src: "@/plugins/snipcart", ssr: false, mode: "client" }]
})
