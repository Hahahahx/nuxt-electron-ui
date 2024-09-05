export enum DH_STATES {
  IDLE = 'IDLE',
  SKIPPED = 'SKIPPED',
  STARTED = 'STARTED',
  DOWNLOADING = 'DOWNLOADING',
  RETRY = 'RETRY',
  PAUSED = 'PAUSED',
  RESUMED = 'RESUMED',
  STOPPED = 'STOPPED',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
}

export const useFileStore = defineStore('files', {
  state: (): {
    files: {
      // bucketName: string
      // prefix: string
      id: string
      percent: number
      file: File
      size: number
      name: string
      path: string
      params: {
        fs: string
        remote: string
      }
      status: 'pending' | 'success' | 'error' | 'uploading'
      insertTime: Date
      callback?: (status: 'pending' | 'success' | 'error' | 'uploading') => Promise<void> | void
    }[]

    downloads: {
      id: string
      percent: number
      size: number
      name: string
      path: string
      url: string
      params: {
        fs: string
        remote: string
      }
      status: DH_STATES // 'pending' | 'success' | 'error' | 'downloading' | 'pause'
      insertTime: Date
    }[]

  } => ({
    files: [],
    downloads: [],
  }),

  actions: {
    async downloadFile(url: string, file: Files.Item) {
      const alert = useAlert()
      if (this.downloads.some(f => f.url === url)) {
        alert.error('文件已在下载列表中')
        return
      }

      const electron = useElectron()
      const realPath = await electron.actions?.chooseDir()

      console.log(realPath)

      if (!realPath?.data?.length) {
        alert.error('请选择下载路径')
        return
      }

      const path = useCurrentPath()
      this.downloads.push({
        id: `${file.Name}-${new Date().getTime()}`, // 防止重复上传
        url,
        percent: 0,
        name: file.Name,
        size: file.Size,
        path: realPath.data[0],
        params: {
          fs: `${path.value.fs}:`,
          remote: path.value.prefix,
        },
        insertTime: new Date(),
        status: DH_STATES.IDLE,
      })

      await electron.actions?.download.start({
        url,
        path: realPath?.data[0],
        filename: file.Name,
      })
    },
    updateDowwloadStatus(url: string, status: DH_STATES) {
      const index = this.downloads.findIndex(f => f.url === url)
      console.log('修改文件状态', url, status)
      if (index !== -1) {
        this.downloads[index].status = status
        return this.downloads[index]
      }
    },
    updateDownloadPercent(url: string, percent: number) {
      const index = this.downloads.findIndex(f => f.url === url)
      if (index !== -1) {
        this.downloads[index].percent = percent
        return this.downloads[index]
      }
      return null
    },
    removeDownload(url: string) {
      const index = this.downloads.findIndex(f => f.url === url)
      if (index !== -1) {
        this.downloads.splice(index, 1)
      }
    },
    addFilePending(files: File[]) {
      const path = useCurrentPath()
      files.forEach((f) => {
        this.files.push({
          id: `${f.name}-${new Date().getTime()}`, // 防止重复上传
          file: f,
          percent: 0,
          name: f.name,
          size: f.size,
          path: f.path,
          params: {
            fs: `${path.value.fs}`,
            remote: path.value.prefix,
          },
          insertTime: new Date(),
          status: 'pending',
        })
      })
    },
    removeFile(id: string) {
      const index = this.files.findIndex(f => f.id === id)
      if (index !== -1) {
        this.files.splice(index, 1)
      }
    },
    updateFilePercent(id: string, percent: number) {
      const index = this.files.findIndex(f => f.id === id)
      if (index !== -1) {
        this.files[index].percent = percent
        return this.files[index]
      }
      return null
    },
    updateFileStatus(id: string, status: 'pending' | 'success' | 'error' | 'uploading') {
      const index = this.files.findIndex(f => f.id === id)
      console.log('修改文件状态', id, status)
      if (index !== -1) {
        this.files[index].status = status
        this.files[index].callback?.(status)
        return this.files[index]
      }
      return null
    },
    uploading(max: number) {
      const uploadingFiles = this.files.filter(f => f.status === 'uploading')
      const pendingFiles = this.files.filter(f => f.status === 'pending')

      if (uploadingFiles.length < max) {
        if (pendingFiles.length < max) {
          return pendingFiles
        }
        return pendingFiles.slice(0, max - uploadingFiles.length)
      }
      return []
    },

  },
  persist: {
    storage: persistedState.localStorage,
    // storage: persistedState.sessionStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
