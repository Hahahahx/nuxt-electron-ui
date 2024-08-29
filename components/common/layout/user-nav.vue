<script setup lang="ts">

const user = useUserStore()
const { t } = useI18n()

const items = [
  [{
    label: user.userInfo?.Email,
    slot: 'account',
  }],
  [{
    label: t('menu.setting'),
    icon: 'i-carbon-settings',
    to: '/user/settings',
  }],
  // [{
  //   label: t('menu.help'),
  //   icon: 'i-carbon-help',
  //   to: '/user/settings/help/getting-started',
  // }, {
  //   label: t('menu.version'),
  //   icon: 'i-carbon-account',
  //   // click: () => versionModal.open(),
  // }],
  [
    // {
    //   label: t('menu.system.user'),
    //   icon: 'i-carbon-user-multiple',
    // }, {
    //   label: t('menu.system.admin'),
    //   icon: 'i-carbon-user-profile',
    //   to: '/admin',
    // },
    // {
    //   label: t('menu.system.jwanfs'),
    //   icon: 'i-carbon-ibm-cloud-bare-metal-server',
    // },
    {
      label: t('menu.logout'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => {
        user.logout()
      },
      to: '/login'
    }],
]


</script>

<template>
  <UDropdown mode="hover" :items="items" class="w-full">
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full " :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #trailing>
          <UBadge v-if="user.userFrom" variant="soft" class="mt-[1px]">
            {{ user.userFrom }}
          </UBadge>
        </template>
        <template #leading>
          <UAvatar src="/header.png" :alt="user.userInfo?.NickName" size="2xs" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="w-full ">
        <div class="text-left pb-2">
          <p>
            登录于
          </p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ user.userInfo?.Email }}
          </p>

          <UBadge v-if="user.userFrom" class="mt-2" variant="soft">
            {{ user.userFrom }}
          </UBadge>
        </div>

        <div>
          <LayoutSiderStorage class="xl:hidden block" />
        </div>
      </div>
    </template>
  </UDropdown>
</template>
