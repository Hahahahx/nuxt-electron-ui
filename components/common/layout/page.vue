<script setup lang="ts">
defineProps<{
  loading?: boolean
  error?: boolean | string | Error
  empty?: boolean
}>()
</script>

<template>
  <slot v-if="!!error" name="error">
    <StateError />
  </slot>
  <slot v-else-if="loading" name="loading">
    <StateLoading />
  </slot>
  <slot v-else-if="empty" name="empty">
    <StateEmpty />
  </slot>
  <slot v-else>
    content
  </slot>
</template>
