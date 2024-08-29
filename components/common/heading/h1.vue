<script setup lang="ts">


defineProps<{
  label?:string
}>()

</script>


<template>
  <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
    <span class="truncate">
      <slot>
        {{ label }}
      </slot>
    </span>
  </h1>
</template>
