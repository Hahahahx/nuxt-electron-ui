export const Api = {
  options: () => request.post<Server.Option>('/options/get'),
  core: {
    version: () => request.post<Server.Core.Version>('/core/version'),
    stats: () => request.post<Server.Core.Stats>('/core/stats'),
    bwlimit: () => request.post<Server.Core.Bwlimit>('/core/bwlimit'),
  },
  operations: {
    about: (params: {
      fs: string
    }) => request.post<Files.Usage>('/operations/about', params),
    list: (params: {
      fs: string
      remote: string
    }) => request.post<Files.List>('/operations/list', params),
    mkdir: (params: {
      fs: string
      remote: string
    }) => request.post('/operations/mkdir', params),
    upload: (file: File, query: {
      fs: string
      remote: string
    }, fn: (progress: number) => void) => {
      return request.upload({ url: '/operations/uploadfile', file, query, onUploadProgress: fn })
    },
    download: (params: {
      url: string
    }) => {
      return `${storage.GetItem('addr') + params.url}`
    },
  },
  mount: {
    list: () => request.post<Mount.List>('/mount/listmounts'),
    add: (params: Mount.Add) => request.post('/mount/mount', params),
    remove: (params: Mount.Delete) => request.post('/mount/unmount', params),
  },
  config: {
    dump: () => request.post<Config.Dump>('/config/dump'),
    get: (params: { name: string }) => request.post<Config.Item>('/config/get', params),
    list: () => request.post<Config.List>('/config/listremotes'),
    remove: (params: { name: string }) => request.post('/config/delete', params),
    add: (params: Config.Add) => request.post('/config/create', params),
  },
}
