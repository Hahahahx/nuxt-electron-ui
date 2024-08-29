<script setup lang="ts">

import { useImage } from '@vueuse/core'


const props = defineProps<{
  src?: string
}>()


const { isLoading } = useImage({ src: props.src })
</script>




<template>
  <AspectRatio :ratio="16 / 9">
    <UIcon v-if="isLoading" name="i-mdi-loading " class="text-4xl animate-spin" />
    <img
      v-else
      :src="src"
      alt="Image"
      class="rounded-md object-cover h-full w-full"
    >
  </AspectRatio>
</template>
