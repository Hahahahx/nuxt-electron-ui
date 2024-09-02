<script setup lang="ts">
const props = defineProps<{
  onSubmit: (data: any) => Promise<void>
}>()

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
      root_folder_path: 'D:',
      // root_folder_path: values.root_folder_path,
      thumbnail: false,
      thumb_cache_folder: '',
      show_hidden: true,
      mkdir_perm: '777',
      recycle_bin_path: 'delete permanently',
    },
  })
}
</script>

<template>
  <UForm class="space-y-4  w-full" :state="state" :schema="schema" @submit="onSubmit">
    <ClientOnly>
      <teleport to="#config-create-form-header">
        <UCard class=" border-0">
          <CardHeader>
            <CardTitle>存储名称</CardTitle>
            <CardDescription>
              配置的名称，用于区分不同的配置
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UFormGroup required name="name">
              <UInput v-model="state.name" />
            </UFormGroup>
          </CardContent>
        </UCard>
      </teleport>
    </ClientOnly>
    <div class="pb-6 typography-muted">
      本地存储指的是用户自己的电脑或设备上的存储空间。
    </div>
    <UFormGroup label="路径" required name="root_folder_path">
      <UInput v-model="state.root_folder_path" />
    </UFormGroup>
  </UForm>
</template>
