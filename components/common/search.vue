<script setup lang="ts">


const { toggleDashboardSearch } = useUIState()
const { metaSymbol } = useShortcuts()

</script>



<template>
  <UButton color="gray" icon="i-heroicons-magnifying-glass-16-solid" variant="solid" @click="toggleDashboardSearch()">
    <div class="w-[100px] text-left hidden md:block">
      {{ $t('search') }}
    </div>
    <template #trailing>
      <div class=" items-center gap-0.5 hidden md:flex">
        <UKbd>{{ metaSymbol }}</UKbd>
        <UKbd>K</UKbd>
      </div>
    </template>
  </UButton>
</template>
