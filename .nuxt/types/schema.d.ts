import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {
   "@nuxtjs/prismic": {
      endpoint: string,

      clientConfig: any,

      client: string,

      linkResolver: string,

      htmlSerializer: string,

      injectComponents: boolean,

      components: any,

      preview: string,

      toolbar: boolean,
   },
  }
}