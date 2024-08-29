<script setup lang="ts">
withDefaults(defineProps< {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
}>(), {
  direction: 'row',
  justifyContent: 'start',
  alignItems: 'start',
})
</script>

<template>
  <div :class="`flex flex-${direction} justify-${justifyContent} items-${alignItems}`">
    <slot />
  </div>
</template>
