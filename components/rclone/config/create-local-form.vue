<script setup lang="ts">
const props = defineProps<{
  onSubmit: (data: any) => Promise<void>
}>()

const electron = useElectron()

const schema = z.object({
  name: z.string().min(1, '存储名称不能为空'),
  root_folder_path: z.string().min(1, '路径不能为空'),
})

const state = reactive({
  name: 'New_Local',
  root_folder_path: '',
})

async function onSubmit() {
  await props.onSubmit({
    name: state.name,
    type: 'local',
    parameters: {
      // root_folder_path: 'D:',
      root_folder_path: state.root_folder_path,
      thumbnail: false,
      thumb_cache_folder: '',
      show_hidden: true,
      mkdir_perm: '777',
      recycle_bin_path: 'delete permanently',
    },
  })
}

async function selectPath() {
  const data = await electron.actions?.chooseDir()

  if (data?.data?.[0])
    state.root_folder_path = data.data[0]
}
</script>

<template>
  <UForm class="space-y-4  w-full" :state="state" :schema="schema" @submit="onSubmit">
    <ClientOnly>
      <teleport to="#config-create-form-header">
        <UCard
          :ui="{
            background: 'bg-gray-100 dark:bg-gray-950/50',
          }"
        >
          <template #header>
            <div>
              <h3 class="text-xl font-bold leading-6">
                存储名称
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                配置的名称，用于区分不同的配置
              </p>
            </div>
          </template>
          <UFormGroup required name="name">
            <UInput v-model="state.name" />
          </UFormGroup>
        </UCard>
      </teleport>
    </ClientOnly>
    <div class="pb-6 typography-muted">
      本地存储指的是用户自己的电脑或设备上的存储空间。
    </div>
    <UFormGroup label="路径" required name="root_folder_path">
      <UButton color="white" :label="state.root_folder_path || '选择路径'" :class="{ '!text-gray-400': !state.root_folder_path }" class="w-full" @click="selectPath" />
    </UFormGroup>
  </UForm>
</template>
