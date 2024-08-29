<script setup lang="ts">
defineProps<{
  dark: string
  light: string
}>()
</script>

<template>
  <div class="relative">
    <img class="w-full h-full transition-all duration-200 delay-100 scale-50 opacity-0 dark:scale-100 dark:opacity-100" :src="dark">
    <img class="absolute top-0 w-full h-full transition-all duration-200 delay-100 scale-100 opacity-100 dark:scale-50 dark:opacity-0" :src="light">
  </div>
</template>
