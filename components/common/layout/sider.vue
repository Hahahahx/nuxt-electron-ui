<script setup lang="ts">
defineProps<{
  sider: Sider
}>()
</script>

<template>
  <UDashboardPanel
    class=" bg-gray-100 dark:bg-gray-950/50"
    :width="300"
    collapsible
  >
    <UDashboardSidebar>
      <template #header>
        <UDashboardNavbar class="!border-transparent h-32 z-0" :ui="{ left: 'flex-1' }">
          <template #left>
            <NuxtLink to="/dashboard" class="w-full flex justify-center">
              <Logo dark="/images/logo/osca.svg" light="/images/logo/osca.svg" class="size-28 invert dark:filter-none" />
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
                :class="{
                  'bg-primary-500/10': $route.fullPath.includes(link.to),
                }"
                class="my-1 justify-start dark:opacity-95"
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
        <div class="w-full md:space-y-4 mb-4">
          <UDivider class="sticky bottom-0" />

          <div class="text-center text-xs text-gray-500 opacity-60  dark:text-gray-100">
            {{ website.copyright }} {{ website.name }}

          <!-- ~/components/UserDropdown.vue -->
          <!-- <LayoutSiderUser /> -->
          </div>
        </div>
      </template>
    </UDashboardSidebar>
  </UDashboardPanel>
</template>
