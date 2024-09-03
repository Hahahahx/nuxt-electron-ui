export interface Task {
  name: string
  fromFs: string
  fromRemote: string
  toFs: string
  toRemote: string
  interval: number
}

export const useConfigsStore = defineStore('configs', {
  state: (): {
    task: Task[]
  } => ({
    task: [],
  }),
  actions: {
    async listTask() {
      const electron = useElectron()
      const res = await electron.schedule?.list()
      this.task = res
      return res
    },
    async addTask(task: Task) {
      const electron = useElectron()
      const res = await electron.schedule?.add(task)
      this.task.push(task)
      return res
    },
    async removeTask(task: Task) {
      const electron = useElectron()
      const res = await electron.schedule?.remove(task)
      this.task = this.task.filter(item => item.name !== task.name)
      return res
    },

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
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigsStore, import.meta.hot))
