<template>
  <ClientOnly>
    <teleport to="#header-left">
      <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div class="flex items-center gap-4 cursor-pointer" @click="$router.push('/config')">
          <UButton icon="solar:alt-arrow-left-line-duotone" variant="ghost">
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              配置管理
            </h1>
          </UButton>
          <UBadge variant="outline" class="ml-auto sm:ml-0">
            配置详情
          </UBadge>
        </div>
      </div>
    </teleport>
  </ClientOnly>
</template>
