<script setup lang="ts">
const props = defineProps<{
  onSubmit: (data: any) => Promise<void>
}>()

const schema = z.object({
  name: z.string().min(1, '存储名称不能为空'),
  endpoint: z.string().min(1, 'Endpoint不能为空'),
  access_key_id: z.string().min(1, 'Access Key ID不能为空'),
  secret_access_key: z.string().min(1, 'Secret Access Key不能为空'),
  bucket: z.string().optional(),
})

const state = reactive({
  name: 'New_OSCA',
  endpoint: 'http://ocloud.ihep.ac.cn:6100',
  access_key_id: '',
  secret_access_key: '',
  bucket: '',
})

async function onSubmit(values: ZodInfer<typeof schema>) {
  await props.onSubmit({
    name: state.name,
    type: 's3',
    parameters: {
      provider: 'Other',
      // root_folder_path: '',
      // region: '',
      // session_token: '',
      // custom_host: '',
      // sign_url_expire: 4,
      // placeholder: '',
      force_path_style: true,
      // list_object_version: 'v1',
      // remove_bucket: false,
      // add_filename_to_disposition: false,
      endpoint: state.endpoint,
      access_key_id: state.access_key_id,
      secret_access_key: state.secret_access_key,
      bucket: state.bucket,
    },
  })
}
</script>

<template>
  <UForm class="space-y-4  w-full" :schema="schema" :state="state" @submit="onSubmit">
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
      OSCA联盟云，是由开发科学计算联盟所组成的提供ZB级多模态海量大数据安全可靠、快捷灵活的一站式存储服务，推动新一代广域网专用云服务的发展
    </div>
    <UFormGroup label="Endpoint" required name="endpoint">
      <UInput v-model="state.endpoint" />
    </UFormGroup>
    <UFormGroup label="AccessKey" required name="access_key_id">
      <UInput v-model="state.access_key_id" />
    </UFormGroup>
    <UFormGroup label="SecretKey" required name="secret_access_key">
      <UInput v-model="state.secret_access_key" />
    </UFormGroup>
    <UFormGroup label="桶名称" name="bucket">
      <UInput v-model="state.bucket" />
    </UFormGroup>
  </UForm>
</template>
