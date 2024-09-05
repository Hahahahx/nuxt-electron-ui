<script setup lang="ts">
const props = defineProps<{
  onSubmit: (data: Task) => Promise<void>
}>()

const rclone = useRcloneStore()

const schema = z.object({
  name: z.string().min(1, '名称不能为空'),
  fromFs: z.string().min(1, '源存储不能为空'),
  fromRemote: z.string().optional(),
  toFs: z.string().min(1, '目标存储不能为空'),
  toRemote: z.string().optional(),
})

const state = reactive({
  name: '',
  fromFs: '',
  fromRemote: '',
  toFs: '',
  toRemote: '',
})
const fromFsBasicPath = computed(() => {
  const fs = rclone.configs.find(i => i.name === state.fromFs)
  return rclone.getBasicPath(fs)
})

const toFsBasicPath = computed(() => {
  const fs = rclone.configs.find(i => i.name === state.toFs)
  return rclone.getBasicPath(fs)
})

const open = ref(false)

async function onSubmit() {
  open.value = false

  await props.onSubmit({
    name: state.name,
    fromFs: state.fromFs,
    fromRemote: fromFsBasicPath.value + state.fromRemote,
    toFs: state.toFs,
    toRemote: toFsBasicPath.value + state.toRemote,
  })
}
</script>

<template>
  <UTooltip text="添加定时任务">
    <UButton label="添加定时任务" class="font-bold" @click.prevent="open = true" />
  </UTooltip>

  <UDashboardModal
    v-model="open"
    title="添加定时任务"
    description=""
    icon="i-solar-alarm-add-bold-duotone"
    :ui="{
      icon: { base: 'text-blue-500 dark:text-blue-400' } as any,
    }"
  >
    <UForm id="create_form" class="space-y-4  w-full" :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="名称" required name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="源存储" required name="fromFs">
        <UButtonGroup orientation="horizontal" class="w-full">
          <USelectMenu v-model="state.fromFs" class="w-[200px]" :options="rclone.configs.map(i => i.name) ?? []" placeholder="选择存储">
            <template #empty>
              <Flex justify-content="center" align-items="center">
                <StateEmpty />
              </Flex>
            </template>
          </USelectMenu>
          <UInput class="w-fit " disabled :value=" fromFsBasicPath" />
          <UInput v-model="state.fromRemote" class="w-full" placeholder="路径" />
        </UButtonGroup>
      </UFormGroup>

      <UFormGroup label="目标存储" required name="toFs">
        <UButtonGroup orientation="horizontal" class="w-full">
          <USelectMenu v-model="state.toFs" class="w-[200px]" :options="rclone.configs.map(i => i.name) ?? []" placeholder="选择存储">
            <template #empty>
              <Flex justify-content="center" align-items="center">
                <StateEmpty />
              </Flex>
            </template>
          </USelectMenu>
          <UInput class="w-fit " disabled :value=" toFsBasicPath" />
          <UInput v-model="state.toRemote" class="w-full" placeholder="路径" />
        </UButtonGroup>
      </UFormGroup>
    </UForm>
    <template #footer>
      <Flex justify-content="end" class="gap-2 w-full">
        <UButton color="white" label="取消" @click="open = false" />
        <UButton label="提交" type="submit" form="create_form" />
      </Flex>
    </template>
  </UDashboardModal>
</template>
