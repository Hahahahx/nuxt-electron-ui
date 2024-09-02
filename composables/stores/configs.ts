export const useConfigsStore = defineStore('configs', {
  state: (): any => ({
  }),
  actions: {
    async runRclone() {
      const rclone = useRcloneStore()

      if (storage.GetItem('token') && storage.GetItem('addr')) {
        return {
          data: {
            token: storage.GetItem('token'),
            addr: storage.GetItem('addr'),
          },
        }
      }

      const electron = useElectron()

      const res = await electron.rclone?.run({
        username: 'root',
        password: 'root',
      })

      console.log(res)

      if (!res || !res!.data?.token) {
        throw new Error('rclone run error')
      }

      storage.SetItem('token', res!.data!.token)
      storage.SetItem('addr', res!.data!.addr)

      await rclone.listConfig()

      return res
    },

  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigsStore, import.meta.hot))
