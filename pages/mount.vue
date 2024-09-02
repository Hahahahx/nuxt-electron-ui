<script setup lang="tsx">
const alert = useAlert()
const rclone = useRcloneStore()
const { loading, refetch, error } = useRequest(rclone.listMount, {
  onError(error) {
    alert.error(error)
  },
})
const search = ref('')

const pageIndex = ref(1)
const pageSize = ref(10)

const list = computed(() => {
  if (search.value) {
    return rclone.mounts.filter(item => item.Fs.includes(search.value))
  }
  return rclone.mounts
})

const columns: {
  key: keyof Mount.Item | 'action'
  label: string
}[] = [
  {
    key: 'MountPoint',
    label: '挂载位置',
  },
  {
    key: 'Fs',
    label: '存储配置',
  },
  {
    key: 'MountedOn',
    label: '挂载时间',
  },
  {
    key: 'action',
    label: '',
  },
]

// 列表操作菜单
function menus(row: Mount.Item) {
  return [
    [{
      label: '卸载',
      icon: 'i-heroicons-trash-20-solid',
      click: async () => {
        await Api.mount.remove({
          mountPoint: row.MountPoint,
        })
        await refetch()
      },
    }],
  ]
}
</script>

<template>
  <LayoutPage :loading="loading" :empty="rclone.mounts.length === 0">
    <template #empty>
      <Flex direction="col" justify-content="center" align-items="center" class="h-full gap-4">
        <img src="/images/system/logo.svg" alt="" class="w-24">
        <Flex direction="col" justify-content="center" align-items="center" class="gap-1">
          <h2 className="text-xl font-bold text-app-text">
            尚未添加挂载配置
          </h2>
          <div className="w-full px-60 flex justify-center">
            <p className="text-app-text opacity-60 text-center">
              挂载配置用于将存储配置挂载到本地，方便您在本地操作存储中的文件。
              请先到配置中选择对应的挂载配置，然后点击添加按钮进行挂载。
            </p>
          </div>
        </Flex>
        <UButton class="font-bold" @click="$router.push('/config')">
          添加挂载点
        </UButton>
      </Flex>
    </template>
    <Flex direction="col" class="gap-4 pt-2 h-full">
      <Flex justify-content="between" class="w-full px-4">
        <Search v-model="search" />
        <UButton class="font-bold" @click="$router.push('/config')">
          添加挂载点
        </UButton>
      </Flex>
      <TableBase
        $page-index="pageIndex"
        $page-size="pageSize"
        disable-query
        :error="error"
        :loading="loading"
        :list="list ?? []"
        :page-total="rclone.mounts.length"
        :columns="columns"
        :menus="menus"
        :refresh="refetch as any"
      />
    </Flex>
  </LayoutPage>
</template>
