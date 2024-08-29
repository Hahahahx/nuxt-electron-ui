<script setup lang="ts">

const { data, error, pending } = useAsyncData(
  'user.storage', () => dashboardApi.storage({
    isAll: 1
  }), {
  default: () => ({
    Name: '',
    FileNum: 0,
    TotalSize: 0,
    QuotaSize: 0,
    UsagePercent: 0,
    DocumentTypeSize: 0,
    MusicTypeSize: 0,
    PictureTypeSize: 0,
    VedioTypeSize: 0,
    OtherTypeSize: 0,
  }),
})


const size = computed(() => {
  return [
    { name: '文档', value: data.value.DocumentTypeSize, icon: 'i-heroicons-document-text', color: 'indigo' },
    { name: '音频', value: data.value.MusicTypeSize, icon: 'i-heroicons-musical-note', color: 'green' },
    { name: '图片', value: data.value.PictureTypeSize, icon: 'i-heroicons-photo', color: 'red' },
    { name: '视频', value: data.value.VedioTypeSize, icon: 'i-heroicons-film', color: 'blue' },
    { name: '其他', value: data.value.OtherTypeSize, icon: 'i-heroicons-document', color: 'gray' },
  ]
})
</script>

<template>
  <UCard class="!bg-gray/5 ">
    <UMeterGroup :max="data.QuotaSize">
      <template #indicator>
        <div class="flex justify-between gap-1.5 text-sm">
          <p class="text-gray-500 dark:text-gray-400">
            {{ byteTrans.merticKB(data.TotalSize) }} 已使用
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ byteTrans.merticKB(data.QuotaSize) }} 配额空间
          </p>
        </div>
      </template>
      <UMeter
        v-for="item in size"
        :key="item.name"
        :value="item.value"
        :color="item.color"
        :label="item.name"
        :icon="item.icon"
      />
    </UMeterGroup>
  </UCard>
</template>
