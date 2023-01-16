import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/jackwaghorn/Documents/Projects/rox-website-estate-2021/rox-v3.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}