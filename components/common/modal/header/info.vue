<script setup lang="tsx">
const menus = [
  {
    name: '邮箱',
    value: '1124124@qq.com',
    icon: 'i-carbon-email',
  },
]
</script>

<template>
  <CommonModal :title="$t('menu.setting')" :subtitle="$t('menu.setting.desc')" prevent-close blur>
    <div>
      <InlineComponent :tset="1" />
      <div class="flex flex-col items-center justify-center gap-2">
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="2xl" alt="Avatar" />
        <div class="flex items-center">
          <p class="font-bold typography-lead">
            admin
          </p>
          <UButton icon="i-heroicons-pencil-square" size="sm" variant="soft" />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="grid grid-cols-2 w-full gap-2">
        <UCard v-for="item in menus" :key="item.name" class="col-span-1">
          <UIcon :name="item.icon" class="float-right h-8 w-8" />
          <p class="font-bold typography-large">
            {{ item.name }}
          </p>
          <p class="typography-muted">
            {{ item.value }}
          </p>
        </UCard>
        <UCard class="col-span-1">
          <div class="i-solar-mailbox-bold-duotone float-right h-8 w-8" />
          <p class="font-bold typography-large">
            邮箱
          </p>
          <p class="typography-muted">
            123456789@qq.com
          </p>
          <small class="font-bold opacity-50 typography-small">
            修改
          </small>
        </UCard>
        <UCard class="col-span-1">
          <div class="i-solar-smartphone-2-bold-duotone float-right h-8 w-8" />
          <p class="font-bold typography-large">
            手机
          </p>
          <p class="typography-muted">
            123456789@qq.com
          </p>
          <small class="font-bold opacity-50 typography-small">
            修改
          </small>
        </UCard>
        <UCard class="col-span-1">
          <div class="i-solar-mailbox-bold-duotone float-right h-8 w-8" />
          <p class="font-bold typography-large">
            双因素认证
          </p>
          <p class="typography-muted">
            已开启
          </p>
          <UToggle on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" size="sm" />
        </UCard>
        <UCard class="col-span-1">
          <div class="i-solar-mailbox-bold-duotone float-right h-8 w-8" />
          <p class="font-bold typography-large">
            高能所统一认证
          </p>
          <p class="typography-muted">
            已绑定
          </p>
          <UToggle on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" size="sm" />
        </UCard>
      </div>
    </template>
  </CommonModal>
</template>
