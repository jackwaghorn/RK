import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/jackwaghorn/Documents/Projects/rox-website-estate-2021/rox_v2/rox-v2/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}