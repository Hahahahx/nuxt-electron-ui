
<script setup lang="ts">


withDefaults(defineProps<{
  src?: string
  rounded?: boolean
  shadow?: boolean
}>(), {
  src: '',
  rounded: true,
  shadow: false
})


</script>



<template>
  <div class="h-[90px] flex justify-center items-center w-[90px] overflow-hidden" :class="[rounded ? 'rounded-md' : '',shadow ? 'shadow-inner' : '',]">
    <img :src="resourceApi.resolution(src,'st1')" alt="Image" class=" object-cover w-full h-full">
    <!-- <img v-else src="/null.webp" alt="Image" class="  object-cover w-full h-full dark:invert opacity-55 dark:opacity-20"> -->
  </div>
</template>
