<script setup lang="ts">
const props = defineProps<{
  onCreate: (data: ZodInfer<typeof schema>) => Promise<void>
}>()

const modal = useModal()

const schema = z.object({
  name: z.string({
    required_error: '文件夹名称字段不能为空',
  }),
})

const state = reactive({
  name: '新建文件夹',
})

async function onSubmit(values: ZodInfer<typeof schema>) {
  await props.onCreate(values)
  modal.close()
}
</script>

<template>
  <UDashboardModal
    title="新建文件夹"
    description="请填写需要创建文件夹的名称信息"
    icon="i-solar-add-folder-bold-duotone"
    :ui="{
      width: 'sm:max-w-md',
      icon: { base: 'text-blue-500 dark:text-blue-400' } as any,
    }"
  >
    <UForm class="space-y-4 " :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup label="名称" required name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <Flex justify-content="end" class="gap-2 w-full">
        <UButton type="submit" class="font-bold tracking-wide">
          创建
        </UButton>
      </Flex>
    </UForm>
  </UDashboardModal>
</template>
