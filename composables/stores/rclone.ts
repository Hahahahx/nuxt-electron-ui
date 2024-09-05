export interface RcloneConfig {
  name: string
  config: Config.Item
}

export const useRcloneStore = defineStore('rclone-data', {
  state: (): {
    mounts: Mount.Item[]
    configs: RcloneConfig[]
    currentConfig?: RcloneConfig
  } => ({
    mounts: [],
    configs: [],
    currentConfig: undefined,
  }),
  actions: {
    getBasicPath(config?: RcloneConfig) {
      if (!config) {
        return ''
      }

      return config.config.type === 'local' ? config.config.root_folder_path : config.config.bucket
    },
    async listConfig() {
      const configs = await Api.config.dump()

      if (Object.prototype.toString.call(configs) !== '[object Object]') {
        return []
      }

      const list: RcloneConfig[] = []
      Object.keys(configs).forEach((key) => {
        list.push({
          name: key,
          config: configs[key],
        })
      })

      this.configs = list

      return list
    },

    async removeConfig(config: RcloneConfig) {
      await Api.config.remove({
        name: config.name,
      })
      await this.listConfig()
      if (this.currentConfig?.name === config.name) {
        this.currentConfig = undefined
      }
    },
    async listMount() {
      const mounts = await Api.mount.list()
      this.mounts = mounts?.mountPoints ?? []
      return this.mounts
    },
    async setCurrentConfig(config?: RcloneConfig) {
      this.currentConfig = config
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRcloneStore, import.meta.hot))
