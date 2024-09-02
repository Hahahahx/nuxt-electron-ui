<script setup lang="ts">
const config = useConfigsStore()

const alert = useAlert()

const { loading, error, refetch } = useRequest(config.runRclone, {
  onError(error) {
    console.log('init-----------------------', error)
    alert.error(error)
  },
  onSuccess(params) {
    console.log('init-----------------------', params)
    // window.platform.download.init({
    //   token: params!.token,
    // })
  },
})
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <LayoutPage :loading="loading" :error="error">
      <template #error>
        <StateError
          headline="ERROR"
          title="Rclone请求异常"
          description="不好意思，我们在运行中出现了一些问题，请确保没有禁用该程序"
          :error="error"
          action-text="重 试"
          :action-handle="refetch"
        />
      </template>
      <NuxtPage />
    </LayoutPage>
    <UModals />
    <UNotifications />
  </NuxtLayout>
</template>
