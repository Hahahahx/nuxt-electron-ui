<script setup lang="ts">
const files = useFileStore()
const alert = useAlert()

const concurrent = 2

useIntervalFn(async () => {
  if (files.files.filter(i => i.status === 'pending').length > 0) {
    files.uploading(concurrent).forEach((f) => {
      console.log(`文件${f.file.name}开始上传，查看上方上传列表。`)
      alert.info(`文件${f.file.name}开始上传，查看上方上传列表。`)
      files.updateFileStatus(f.id, 'uploading')

      Api.operations.upload(f.file, f.params, (percent) => {
        files.updateFilePercent(f.id, percent)
      }).then(() => {
        alert.success(`文件${f.file.name}上传成功`)
        files.updateFileStatus(f.id, 'success')
      }, () => {
        alert.success(`文件${f.file.name}上传失败`)
        files.updateFileStatus(f.id, 'error')
      }).catch((e: any) => {
        alert.success(`文件${f.file.name}上传失败:${e}`)
        files.updateFileStatus(f.id, 'error')
      })
    })
  }
}, 1000)
</script>

<template>
  <UDashboardLayout>
    <!-- 侧边栏 -->
    <LayoutSider :sider="sider" />

    <!-- 内容 -->
    <UDashboardPage>
      <UDashboardPanel grow>
        <!-- 头部 -->
        <LayoutHeader />
        <!-- <UDashboardNavbar>
        </UDashboardNavbar> -->

        <!-- 内容 -->
        <slot />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
