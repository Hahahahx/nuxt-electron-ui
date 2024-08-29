<script setup lang="ts">

defineProps<{
  title?: string
  badge?: string|number
}>()

</script>


<template>
  <UDashboardToolbar class=" border-0 my-1 mt-2">
    <template #left>
      <HeadingH1>
        {{ title }}
      </HeadingH1>
      <UBadge variant="soft">
        {{ badge }}
      </UBadge>
    </template>

    <template #right>
      <slot
        name="right"
      />
    </template>
  </UDashboardToolbar>
</template>
