<script setup lang="ts">
const router = useRouter()
const alert = useAlert()

const onSubmit = alert.catch(async (values: any) => {
  await Api.config.add(values)
  alert.success('创建成功')
  router.push('/config')
})

const items = [{
  slot: 'local',
  label: '本地存储',
}, {
  slot: 'osca',
  label: 'OSCA对象存储',
}, {
  slot: 's3',
  label: 'S3对象存储',
}]

const selected = ref(1)
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
            创建配置
          </UBadge>
        </div>
      </div>
    </teleport>
  </ClientOnly>

  <div class="px-6 pt-6 overflow-y-auto">
    <div id="config-create-form-header" class="pb-10" />
    <UDivider />

    <UTabs v-model="selected" :items="items" orientation="vertical" :ui="{ wrapper: 'flex items-start gap-4 py-10', list: { width: 'w-48' } }">
      <template #local>
        <RcloneConfigCreateLocalForm v-if="selected === 0" id="config-create-form" @submit="onSubmit" />
      </template>
      <template #osca>
        <RcloneConfigCreateOscaForm v-if="selected === 1" id="config-create-form" @submit="onSubmit" />
      </template>
      <template #s3>
        <RcloneConfigCreateS3Form v-if="selected === 2" id="config-create-form" @submit="onSubmit" />
      </template>
    </UTabs>

    <!-- <Tabs default-value="account" class="flex gap-6 px-6 bg-gray-500/5 py-10">
      <TabsList class="flex-col h-full">
        <TabsTrigger value="account" class="w-full">
          本地存储
        </TabsTrigger>
        <TabsTrigger value="password" class="w-full">
          OSCA对象存储
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" class="flex-1">
        <RcloneConfigCreateLocalForm id="config-create-form" @submit="onSubmit" />
      </TabsContent>
      <TabsContent value="password" class="flex-1">
        <RcloneConfigCreateS3Form id="config-create-form" @submit="onSubmit" />
      </TabsContent>
    </Tabs> -->
    <UDivider />
    <div class="flex justify-end px-6 pt-8 mb-20">
      <UButton type="submit" form="config-create-form">
        提交
      </UButton>
    </div>
  </div>
</template>
