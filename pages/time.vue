<script setup lang="tsx">
const alert = useAlert()
const configs = useConfigsStore()
const { loading, refetch, error } = useRequest(configs.listTask, {
  onError(error) {
    alert.error(error)
  },
})
const search = ref('')

const pageIndex = ref(1)
const pageSize = ref(10)

const list = computed(() => {
  if (search.value) {
    return configs.task.filter(item => item.name.includes(search.value))
  }
  return configs.task
})

const columns: {
  key: keyof Task | 'action'
  label: string
}[] = [
  {
    key: 'name',
    label: '名称',
  },
  {
    key: 'fromFs',
    label: '存储源',
  },
  {
    key: 'toFs',
    label: '目标存储',
  },
  {
    key: 'action',
    label: '',
  },
]

// 列表操作菜单
function menus(row: Task) {
  return [
    [{
      label: '移除',
      icon: 'i-heroicons-trash-20-solid',
      click: alert.catch(async () => {
        await configs.removeTask(row)
      }),
    }],
  ]
}

async function onCreate(task: Task) {
  await configs.addTask(task)
}
</script>

<template>
  <LayoutPage :loading="false" :empty="configs.task.length === 0">
    <template #empty>
      <Flex direction="col" justify-content="center" align-items="center" class="h-full gap-4">
        <img src="/images/system/logo.svg" alt="" class="w-24">
        <Flex direction="col" justify-content="center" align-items="center" class="gap-1">
          <h2 className="text-xl font-bold text-app-text">
            尚未添加定时任务
          </h2>
          <div className="w-full px-60 flex justify-center">
            <p className="text-app-text opacity-60 text-center">
              定时任务用于将用户的存储同步到指定的存储中，请先添加存储配置，再添加定时任务
            </p>
          </div>
        </Flex>
        <RcloneScheduleCreate :on-submit="onCreate" />
      </Flex>
    </template>
    <Flex direction="col" class="gap-4 pt-2 h-full">
      <Flex justify-content="between" class="w-full px-4">
        <Search v-model="search" />

        <RcloneScheduleCreate :on-submit="onCreate" />
      </Flex>
      <TableBase
        $page-index="pageIndex"
        $page-size="pageSize"
        disable-query
        :loading="loading"
        :error="error"
        :list="list ?? []"
        :page-total="configs.task.length"
        :columns="columns"
        :menus="menus"
        :refresh="refetch"
      >
        <template #fromFs-data="{ row }">
          {{ row.fromFs }}
          <UBadge variant="soft">
            {{ row.fromRemote }}
          </UBadge>
        </template>

        <template #toFs-data="{ row }">
          {{ row.toFs }}
          <UBadge variant="soft">
            {{ row.toRemote }}
          </UBadge>
        </template>
      </TableBase>
    </Flex>
  </LayoutPage>
</template>
