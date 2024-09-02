export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在服务器端跳过中间件
  if (import.meta.server)
    return
  if (import.meta.client) {
    const rclone = useRcloneStore()

    console.log('to:', to)
    console.log('from:', from)

    if (to.path === '/') {
      return navigateTo({
        path: '/config',
      })
    }

    if (from.path.includes('/file') && to.path === '/file') {
      return abortNavigation()
    }

    if (!from.path.includes('/file') && to.path === ('/file')) {
      console.log('rclone:', rclone.currentConfig?.name)
      if (rclone.currentConfig?.name) {
        return navigateTo({
          path: `/file/${rclone.currentConfig.name}`,
        })
      }
    }
  }
})
