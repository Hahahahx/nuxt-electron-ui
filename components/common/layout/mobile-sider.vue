<script setup lang="ts">
defineProps<{
  sider: any[]
}>()
</script>

<template>
  <CommonModal blur placement="right" class="dark">
    <template #title>
      <div class="flex items-center justify-between">
        <CommonLogo dark />
      </div>
    </template>

    <div class="h-[calc(100vh-200px)] w-[300px] overflow-auto">
      <CommonLayoutSider static :sider="sider" class="w-full" />
    </div>
  </CommonModal>
</template>
