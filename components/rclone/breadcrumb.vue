<script lang="ts" setup>
const rclone = useRcloneStore()

const path = useCurrentPath()

const items = computed(() => {
  return [
    { to: `/file/${path.value.bucketName}`, label: path.value.bucketName, icon: 'ph:house-line-duotone' },
    ...path.value.prefixs.map((prefix, index) => {
      return { to: `/file/${path.value.bucketName}/${path.value.prefixs.slice(0, index + 1).join('/')}`, label: prefix }
    }),
  ]
})

const configs = computed(() => {
  console.log(rclone.configs)

  return [rclone.configs.map(i => ({
    label: i.name,
    to: `/file/${i.name}`,
  }))]
})
</script>

<template>
  <UBreadcrumb
    divider="/"
    :links="items"
  >
    <template #default="{ link, index }">
      <UDropdown v-if="index === 0" mode="hover" :items="configs" :popper="{ placement: 'bottom-start' }">
        <UButton class="font-bold" color="white" variant="ghost" :label="link.label" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <span v-else>{{ link.label }}</span>
    </template>
  </UBreadcrumb>
</template>
