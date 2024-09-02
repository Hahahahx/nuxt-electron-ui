<script setup lang="ts">
defineProps<{
  config: RcloneConfig
  onDelete: () => Promise<void>
  onMount: (data: Mount.Add) => Promise<void>
}>()
</script>

<template>
  <NuxtLink :href="`/config/detail/${config.name}`" class="w-full transition-all duration-200 ease-in-out ">
    <Flex
      class="w-full bg-gray-100/80 dark:bg-gray-900 px-5 py-4 rounded-md border-[1px] border-gray-200/80 dark:border-gray-800/80"
      align-items="center"
      justify-content="between"
    >
      <Flex align-items="center">
        <img src="/images/system/logo.svg" class="w-12" alt="">
        <div class="ml-4">
          <h3 class="mb-1 font-bold text-md">
            {{ config.name }}
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-400">
            {{ config.config.type }}
          </p>
        </div>
      </Flex>
      <Flex align-items="center" class="gap-2">
        <RcloneMountCreateForm :fs="config.name" @submit="onMount" />

        <UTooltip text="浏览">
          <UButton variant="ghost" icon="solar:login-3-bold-duotone" @click.prevent="$router.push(`/file/${config.name}`)" />
        </UTooltip>
        <RcloneConfigDeleteAlert :on-submit="onDelete" />
      </Flex>
    </Flex>
  </NuxtLink>
</template>
