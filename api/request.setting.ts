import queryString from 'qs'

export const baseURL = {
  v1: '',
}

async function post<T>(method: 'POST' | 'PATCH' | 'PUT', url: string, data?: any, opts: { [k: string]: any } = { headers: {} }) {
  const headers = opts.headers ?? {}

  console.log('request url:', storage.GetItem('addr') + url)
  console.log('request data:', data)
  console.log('request Authorization:', storage.GetItem('token') ?? '')

  const res = await $fetch<T>(storage.GetItem('addr') + url, {
    method,
    body: data,
    ...opts,
    headers: {
      Authorization: storage.GetItem('token') ?? '',
      ...headers,
    },
  })

  return res
}

async function get<T>(method: 'DELETE' | 'GET', url: string, data?: any) {
  const res = await $fetch<T>(storage.GetItem('addr') + url, {
    method,
    query: data,
    headers: {
      Authorization: storage.GetItem('token') ?? '',
    },
  })
  return res
}

export const request = {
  post: <T>(url: string, data?: any) => post<T>('POST', url, data),
  patch: <T>(url: string, data?: any) => post<T>('PATCH', url, data),
  put: <T>(url: string, data?: any) => post<T>('PUT', url, data),
  get: <T>(url: string, data?: any) => get<T>('GET', url, data),
  delete: <T>(url: string, data?: any) => get<T>('DELETE', url, data),
  upload: <T>(params: {
    url: string
    file: File
    query?: any
    onUploadProgress?: (precent: number) => void
  }) => {
    const formData = new FormData()
    formData.append('file', params.file)
    const reader = params.file.stream().getReader()
    const totalSize = params.file.size
    let uploadedSize = 0

    // $fetch 上传会报错
    const res = fetch(`${storage.GetItem('addr') + params.url}?${queryString.stringify(params.query, { encode: false })}`, {
      method: 'post',
      // query: params.query,
      body: formData,
      headers: {
        Authorization: storage.GetItem('token') ?? '',
      },
      // upload: (progressEvent) => {
      //   const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)

      //   if (params.onUploadProgress) {
      //     params.onUploadProgress(progress, progressEvent)
      //   }
      //   console.log(`上传进度: ${progress}%`)
      // },
    })
      .then((response) => {
        if (response.ok)
          return response.json() as T
        else
          throw new Error(`${response.status} : ${response.statusText}`)
      })

    // @ts-expect-error
    reader.read().then(function processChunk({ done, value }) {
      if (done) {
        return
      }

      uploadedSize += value.length
      const progress = (uploadedSize / totalSize) * 100
      params.onUploadProgress?.(progress)
      return reader.read().then(processChunk)
    })

    return res
  },
}
