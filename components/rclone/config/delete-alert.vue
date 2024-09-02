<script setup lang="ts">
const props = defineProps<{
  onSubmit: () => Promise<void>
}>()

const open = ref(false)

async function onDelete() {
  open.value = false
  await props.onSubmit()
}
</script>

<template>
  <UTooltip text="删除">
    <UButton variant="ghost" icon="solar:trash-bin-trash-bold-duotone" square color="rose" @click.prevent="open = true" />
  </UTooltip>
  <UDashboardModal
    v-model="open"
    title="删除配置信息"
    description="确定要删除该配置信息吗？"
    icon="i-heroicons-exclamation-circle"
    :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any,
    }"
  >
    <template #footer>
      <Flex justify-content="end" class="gap-2 w-full">
        <UButton color="white" label="取消" @click="open = false" />
        <UButton color="red" label="删除" @click="onDelete" />
      </Flex>
    </template>
  </UDashboardModal>
</template>
