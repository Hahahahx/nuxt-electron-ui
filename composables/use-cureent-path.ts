export function useCurrentPath() {
  const route = useRoute()

  const object = useObjectsStore()
  const rclone = useRcloneStore()

  const params = computed(() => {
    const path = (route.params.name as string[]).filter(i => i)
    rclone.setCurrentConfig(rclone.configs.find(i => i.name === path.at(0)))

    console.log('route.params.name: ', route.params.name)
    return {
      download: object.downloadPath, // 下载路径
      bucketName: path.at(0) ?? '',
      fs: path.at(0) ?? '',
      prefixs: path.slice(1),
      prefix: path.slice(1).join('/'),
    }
  })

  return params
}
