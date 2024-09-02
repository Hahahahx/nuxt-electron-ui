<script setup lang="ts">
const { modelValue } = defineModels<{
  modelValue: string
}>()
</script>

<template>
  <UInput
    v-model="modelValue"
    icon="i-heroicons-magnifying-glass-20-solid"
    :trailing="false"
    placeholder="搜索..."
    :ui="{
      base: 'w-[200px] focus:w-[250px] transition-all duration-100 ease-in-out',
    }"
  />
</template>
