<script setup lang="ts">
</script>

<template>
  <UDashboardLayout>
    <!-- 侧边栏 -->
    <LayoutSider :sider="sider" />

    <!-- 内容 -->
    <UDashboardPage>
      <UDashboardPanel grow>
        <!-- 头部 -->
        <LayoutHeader />
        <!-- <UDashboardNavbar>
        </UDashboardNavbar> -->

        <!-- 内容 -->
        <UPage class="overflow-y-auto pb-10">
          <div class=" sticky top-0 ">
            <div id="header" class="w-full backdrop-blur z-10" />
          </div>
          <slot />
        </UPage>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
