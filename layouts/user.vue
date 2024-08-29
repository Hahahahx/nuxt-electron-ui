<script setup lang="ts">
// import type { ParsedContent } from '@nuxt/content/dist/runtime/types'


const route = useRoute()
const appConfig = useAppConfig()
const { userSider: sider } = useConfig()
// const { isHelpSlideoverOpen } = useDashboard()

// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
// const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })
// provide('navigation', navigation)

const groups = [
  ...sider.map(group => ({
    key: group.group,
    label: group.group,
    commands: group.list,
  })),
]

const { isFilesSiderOpen } = useDashboard()
const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))

const { uploading } = useFileStore()

</script>

<template>
  <UDashboardLayout>
    <!-- 侧边栏 -->
    <LayoutSider :sider="sider" />

    <!-- 内容 -->
    <UDashboardPage>
      <UDashboardPanel grow>
        <!-- 头部 -->
        <UDashboardNavbar>
          <template #title>
            <!-- <UContentSearchButton class="md:flex hidden w-52" :label="$t('search')" /> -->
            <!-- <UDashboardSearchButton class="w-[300px]" /> -->
          </template>
          <template #right>
            <!-- <UDocsSearchButton class="rounded-md" size="sm" /> -->
            <!-- <UContentSearchButton class="flex md:hidden" variant="link" :label="$t('search')" /> -->

            <UTooltip text="上传文件列表" :shortcuts="['F']">
              <UButton color="gray" variant="ghost" square @click="isFilesSiderOpen = true">
                <UChip v-if="uploading.length" color="red" inset>
                  <UIcon name="i-line-md-uploading-loop" class="w-5 h-5" />
                </UChip>
                <UIcon v-else name="i-solar-archive-up-minimlistic-bold-duotone" class="w-5 h-5" />
              </UButton>
            </UTooltip>
            <UColorModeButton />
            <LayoutUserNav />
          </template>
        </UDashboardNavbar>

        <!-- 内容 -->
        <UPage class="overflow-y-auto pb-10">
          <div class=" sticky top-0 ">
            <div id="header" class="w-full backdrop-blur z-10" />
          </div>
          <slot />
        </UPage>
      </UDashboardPanel>
    </UDashboardPage>

    <UploadSider />
  </UDashboardLayout>
</template>
