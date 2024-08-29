<script setup lang="ts">
defineProps<{
  sider: Sider
}>()
</script>

<template>
  <UDashboardPanel
    class="dark bg-gray-900 dark:bg-gray-950/10"
    :width="300"
    :resizable="{ min: 200, max: 350 }"
    collapsible
  >
    <UDashboardSidebar>
      <template #header>
        <UDashboardNavbar class="!border-transparent h-32 z-0" :ui="{ left: 'flex-1' }">
          <template #left>
            <NuxtLink to="/dashboard" class="w-full flex justify-center">
              <Logo dark="assets/images/logo_dark.svg" light="assets/images/logo_light.svg" class="size-20 invert dark:filter-none" />
            </NuxtLink>
          </template>
        </UDashboardNavbar>

        <UDivider />
      </template>

      <div>
        <div v-for="item in sider" :key="item.group" class="mb-8">
          <div class="pb-4 text-sm font-bold text-gray-500 opacity-40 dark:text-gray-100">
            {{ item.group }}
          </div>

          <!-- <UDashboardSidebarLinks :links="item.list" /> -->
          <div v-for="(link, index) in item.list" :key="index">
            <ULink :to="link.to" class="block w-full">
              <UButton
                :icon="link.icon"
                block
                :color="$route.fullPath.includes(link.to) ? 'primary' : 'gray'"
                size="lg"
                class="my-1 justify-start opacity-95"
                :variant="$route.fullPath.includes(link.to) ? 'soft' : 'ghost'"
                :label="link.label"
                :trailing="false"
              />
            </ULink>
            <div>
              <slot :name="link.key" />
            </div>
          </div>
        </div>
      </div>

      <!-- <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        />

        <UDashboardSidebarLinks :links="footerLinks" /> -->

      <div class="flex-1" />

      <template #footer>
        <div class="w-full md:space-y-4">
          <LayoutSiderStorage class="hidden xl:block" />
          <UDivider class="sticky bottom-0" />
          <!-- ~/components/UserDropdown.vue -->
          <!-- <LayoutSiderUser /> -->
        </div>
      </template>
    </UDashboardSidebar>
  </UDashboardPanel>
</template>
