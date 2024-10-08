export function useCurrentPath() {
  const route = useRoute()

  const rclone = useRcloneStore()

  const params = computed(() => {
    console.log('route.params.name: ', route.params.name)
    console.log('isArray: ', Array.isArray(route.params.name))

    if (!Array.isArray(route.params.name)) {
      return {
        bucketName: route.params.name as string,
        fs: route.params.name as string,
        fsBase: route.params.name as string,
        prefixs: [],
        prefix: '',
      }
    }

    const path = (route.params.name as string[]).filter(i => i)
    const current = rclone.configs.find(i => i.name === path.at(0))
    rclone.setCurrentConfig(current)

    let fs = ''
    if (current?.config.type === 'local')
      fs = `${path.at(0)}:${current?.config.root_folder_path}`
    else
      // @ts-ignore
      fs = `${path.at(0)}:${current?.config?.bucket ?? ''}`

    console.log('route.params.name: ', route.params.name)
    return {
      bucketName: path.at(0) ?? '',
      fs,
      fsBase: path.at(0) ?? '',
      prefixs: path.slice(1),
      prefix: path.slice(1).join('/'),
    }
  })

  return params
}
