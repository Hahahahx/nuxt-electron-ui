<script setup lang="ts">

withDefaults(defineProps<{
  src?: string
  fullScreen?: boolean
  rounded?: boolean
}>(), {
  src: '',
  fullScreen: false,
  rounded: true
})

</script>



<template>
  <div
    class="flex justify-center items-center overflow-hidden"
    :class="[fullScreen ? 'h-full w-full' : 'h-[100px] w-[200px]', rounded ? 'rounded-md' : '']"
  >
    <img :src="resourceApi.resolution(src,'st3')" alt="background" class=" h-full w-full object-cover">
    <!-- <img v-else src="/null.webp" alt="background" class=" object-cover h-full w-full dark:invert opacity-25"> -->
  </div>
</template>
