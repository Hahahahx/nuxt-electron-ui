<script setup lang="ts">
const props = defineProps<{
  fs?: string
  onSubmit: (data: Mount.Add) => Promise<void>
}>()

const schema = z.object({
  fs: z.string().min(1, '配置不能为空'),
  mountPoint: z.string().min(1, '挂载点不能为空'),
})

const state = reactive({
  fs: props.fs ? `${props.fs}:` : '',
  mountPoint: '',
})

const open = ref(false)
const electron = useElectron()

const data = ref<string[]>([])
const loading = ref(false)

effect(() => {
  loading.value = true
  electron.actions?.getDrives().then((res) => {
    // alert.info('data', JSON.stringify(res))
    data.value = res?.data?.unused.reverse() ?? []
    // alert.info('data', JSON.stringify(data.value))
  }).finally(() => {
    loading.value = false
  })
})

async function onSubmit() {
  open.value = false
  await props.onSubmit({
    mountOpt: {},
    mountType: '',
    vfsOpt: {
      CacheMode: 2,
    },
    ...state,
    mountPoint: `${state.mountPoint}:`,
  })
}
</script>

<template>
  <UTooltip text="挂载">
    <UButton class="font-bold" @click.prevent="open = true">
      添加挂载点
    </UButton>
  </UTooltip>

  <UDashboardModal
    v-model="open"
    title="挂载"
    description="将存储挂载到指定分区中"
    icon="solar:database-bold-duotone"
    :ui="{
      icon: { base: 'text-blue-500 dark:text-blue-400' } as any,
    }"
  >
    <UForm id="create_mount_form" class="space-y-4  w-full" :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="挂载配置" required name="fs">
        <UInput v-model="state.fs" disabled />
      </UFormGroup>

      <UFormGroup label="挂载虚拟盘" required name="mountPoint">
        <USelect v-model="state.mountPoint" :loading="loading" :options="data" placeholder="请选择虚拟盘" />
      </UFormGroup>

      <!-- <UFormGroup label="挂载点" required name="mountPoint">
        <UInput v-model="state.mountPoint" placeholder="X:" />
      </UFormGroup> -->
    </UForm>
    <template #footer>
      <Flex justify-content="end" class="gap-2 w-full">
        <UButton color="white" label="取消" @click="open = false" />
        <UButton label="提交" type="submit" form="create_mount_form" />
      </Flex>
    </template>
  </UDashboardModal>
</template>
