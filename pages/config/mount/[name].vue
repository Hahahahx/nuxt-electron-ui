<script setup lang="tsx">
const path = useCurrentPath()
const alert = useAlert()
const rclone = useRcloneStore()
const electron = useElectron()
const { loading, refetch, error } = useRequest(rclone.listMount, {
  onError(error) {
    alert.error(error)
  },
})
const search = ref('')

const pageIndex = ref(1)
const pageSize = ref(10)

const list = computed(() => {
  const arr = rclone.mounts.filter(item => item.Fs.includes(path.value.fsBase))
  if (search.value) {
    return arr.filter(item => item.Fs.includes(search.value))
  }
  return arr
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

const onMount = alert.catch(async (params: Mount.Add) => {
  await Api.mount.add(params)
  electron.actions?.openFile({
    paths: [params.mountPoint],
  })

  await refetch()
})
</script>

<template>
  <ClientOnly>
    <teleport to="#header-left">
      <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div class="flex items-center gap-4 cursor-pointer" @click="$router.push('/config')">
          <UButton icon="solar:alt-arrow-left-line-duotone" variant="ghost">
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              文件管理
            </h1>
          </UButton>
          <UBadge variant="outline" class="ml-auto sm:ml-0">
            挂载存储
          </UBadge>
        </div>
      </div>
    </teleport>
  </ClientOnly>

  <LayoutPage :empty="list.length === 0">
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
        <RcloneMountCreateForm :on-submit="onMount" :fs="path.fsBase" />
      </Flex>
    </template>
    <Flex direction="col" class="gap-4 pt-2 h-full">
      <Flex justify-content="between" class="w-full px-4">
        <Search v-model="search" />
        <RcloneMountCreateForm :on-submit="onMount" :fs="path.fsBase" />
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
      >
        <template #MountedOn-data="{ row }">
          {{ format.dateTimeS(row.MountedOn) }}
        </template>
      </TableBase>
    </Flex>
  </LayoutPage>
</template>
