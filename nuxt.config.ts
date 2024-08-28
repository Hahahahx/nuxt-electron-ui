// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: false,
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@vueuse/nuxt',
    '@nuxt/image',
    '@formkit/auto-animate',
  ],
  ui: {
    global: true,
    // icons: ['heroicons', 'simple-icons', 'solar', 'carbon', 'vscode-icons', 'line-md'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },

  pinia: {
    storesDirs: ['composables/stores'],
  },
  imports: {
    dirs: ['api', 'utils', 'utils/**/*'],
    presets: [
      {
        from: 'zod',
        imports: ['z'],
      },
    ],
  },
  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-08-14',

})
