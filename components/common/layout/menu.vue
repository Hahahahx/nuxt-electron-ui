<script setup lang="ts">
import Help from '~/components/common/modal/header/help.vue'
import Info from '~/components/common/modal/header/info.vue'
import Version from '~/components/common/modal/header/version/version.vue'

const { t } = useI18n()

const infoModal = useModal(Info)
const helpModal = useModal(Help)
const versionModal = useModal(Version)

const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: t('menu.setting'),
    icon: 'i-carbon-settings',
    click: () => infoModal.open(), // isInfoModal.value = true,
  }],
  [{
    label: t('menu.help'),
    icon: 'i-carbon-help',
    click: () => helpModal.open(),
  }, {
    label: t('menu.version'),
    icon: 'i-carbon-account',
    click: () => versionModal.open(),
  }],
  [{
    label: t('menu.system.user'),
    icon: 'i-carbon-user-multiple',
  }, {
    label: t('menu.system.admin'),
    icon: 'i-carbon-user-profile',
    to: '/admin',
  }, {
    label: t('menu.system.jwanfs'),
    icon: 'i-carbon-ibm-cloud-bare-metal-server',
  }, {
    label: t('menu.logout'),
    icon: 'i-heroicons-arrow-left-on-rectangle',
    to: '/login',
  }],
]
</script>

<template>
  <UDropdown
    :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon :name="item.icon" class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
    </template>
  </UDropdown>
</template>
