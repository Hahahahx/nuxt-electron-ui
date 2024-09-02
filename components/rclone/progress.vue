<script setup lang="ts">
const path = useCurrentPath()

const { data: sizeData, error } = useAsyncData(() => Api.operations.about({
  fs: `${path.value.fs}:`,
}), {
  default: () => ({
    used: 0,
    total: 0,
    free: 0,
  }),
})

const percent = computed(() => {
  if (error.value)
    return 0

  if (!sizeData.value)
    return 0

  if (sizeData.value.total === 0)
    return 0

  return (sizeData.value?.used / sizeData.value?.total) * 100
})
</script>

<template>
  <UPopover class="w-full" mode="hover">
    <div class="w-full h-[10px] cursor-pointer group relative">
      <UProgress :value="percent" class="absolute transition-all group-hover:h-[6px] h-[2px] rounded-none bg-gray-500/20" />
    </div>
    <template #panel>
      <div v-if="error" class="text-gray-500/60 text-center p-4">
        未能获取到数据
      </div>
      <div v-else class="flex flex-col gap-1 w-[200px] p-4">
        <div class="flex justify-between">
          <span>已使用</span>
          <span>{{ byteTrans.mertic(sizeData?.used) }}</span>
        </div>
        <div class="flex justify-between">
          <span>未使用</span>
          <span>{{ byteTrans.mertic(sizeData?.free) }}</span>
        </div>
        <div class="flex justify-between">
          <span>全部</span>
          <span>{{ byteTrans.mertic(sizeData?.total) }}</span>
        </div>
      </div>
    </template>
  </UPopover>
</template>
