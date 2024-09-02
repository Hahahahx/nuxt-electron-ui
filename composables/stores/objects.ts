import type { BucketItem } from 'minio'
import type { ObjectListParams } from '~/electron/preload'

export type ObjectDownloadItem = BucketItem & {
  bucketName: string
  cuurentSize: number
  percent: number
  status: 'downloading' | 'success' | 'error' | 'updated'
  realPath: string
  prefixs: string[]
}

export const useObjectsStore = defineStore('objects', {
  state: (): {
    downloadPath: string
    objects: BucketItem[]
    downloadObjects: ObjectDownloadItem[]
  } => ({
    downloadPath: '',
    objects: [],
    downloadObjects: [],
  }),
  actions: {
    async list(params: ObjectListParams) {
      const objects = await window.object.list(params)
      this.objects = objects ?? []
      return objects
    },
    async selectDownloadPath() {
      const path = await window.object.selectDownloadPath()
      if (path) {
        toast.success('已选择下载路径，并开启监听')
        window.bucket.watch({
          realPath: path,
        }, (changePath, stats) => {
          changePath = pathHandle.format(changePath)
          console.log(changePath, stats)
          if (stats.birthtimeMs !== stats.mtimeMs) {
            const file = this.downloadObjects.find(item => item.realPath === changePath)

            if (file) {
              toast.success(`检测到文件${changePath}更新，1分钟后自动同步`)
              setTimeout(async () => {
                try {
                  await window.object.upload({
                    bucketName: file.bucketName,
                    objectName: file.name!,
                    realPath: changePath,
                    prefix: file.prefix!,
                  })
                }
                catch (e: any) {
                  console.log(e)
                  toast.error(e.message)
                }
              }, 1000)
            }
          }
        })
      }
      this.downloadPath = path ?? ''
      return path
    },
    download(file: BucketItem) {
      const path = useCurrentPath()
      if (!path.value.download) {
        // TODO: 提示用户选择下载路径
        toast.error('请先到配置中，选择默认的数据下载路径')
        navigateTo('/setting')

        return
      }
      const realPath = pathHandle.format(`${path.value.download}/${path.value.bucketName}/${file.name!}`)

      this.downloadObjects.push({
        ...file,
        cuurentSize: 0,
        percent: 0,
        status: 'downloading',
        realPath,
        bucketName: path.value?.bucketName ?? '',
        prefixs: path.value?.prefixs ?? [],
      })

      window.object.download({
        bucketName: path.value.bucketName,
        objectName: file.name!,
        realPath,
      }, (size) => {
        console.log('size', size)

        const downloadItem = this.downloadObjects.find(item => item.name === file.name)
        if (downloadItem) {
          downloadItem.cuurentSize = size
          downloadItem.percent = (size / file.size!) * 100

          if (size === file.size) {
            downloadItem.status = 'success'
          }
        }
      })
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useObjectsStore, import.meta.hot))
