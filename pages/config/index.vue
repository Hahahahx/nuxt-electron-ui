<script setup lang="ts">
const alert = useAlert()
const rclone = useRcloneStore()
const { loading } = useRequest(rclone.listConfig, {
  // onError(error) {
  // alert.error(error)
  // },
})
const search = ref('')

const list = computed(() => {
  if (search.value) {
    return rclone.configs.filter(item => item.name.includes(search.value))
  }
  return rclone.configs
})

const onDelete = alert.catch(async (params: RcloneConfig) => {
  await rclone.removeConfig(params)
})
</script>

<template>
  <LayoutPage :loading="loading" :empty="rclone.configs.length === 0">
    <template #empty>
      <Flex direction="col" justify-content="center" align-items="center" class="h-full gap-4">
        <img src="/images/system/logo.svg" alt="" class="w-24">
        <Flex direction="col" justify-content="center" align-items="center" class="gap-1">
          <h2 className="text-xl font-bold text-app-text">
            尚未添加配置信息
          </h2>
          <div className="w-full px-60 flex justify-center">
            <p className="text-app-text opacity-60 text-center">
              您需要先连接到一个存储中，才能使用服务。
            </p>
          </div>
        </Flex>
        <UButton class="font-bold" @click="$router.push('/config/create')">
          添加存储配置
        </UButton>
      </Flex>
    </template>
    <Flex direction="col" class="gap-4 pt-2 h-full">
      <Flex justify-content="between" class="w-full px-4">
        <Search v-model="search" />
        <UButton class="font-bold" @click="$router.push('/config/create')">
          添加存储配置
        </UButton>
      </Flex>
      <UDivider />
      <Flex direction="col" justify-content="start" align-items="start" class="w-full h-full overflow-y-auto gap-4 px-4">
        <RcloneConfigListItem v-for="bucket in list" :key="bucket.name" :config="bucket" :on-delete="() => onDelete(bucket)" />
      </Flex>
    </Flex>
  </LayoutPage>
</template>
