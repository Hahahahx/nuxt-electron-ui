<template>
  <header class="absolute top-0 z-10 w-screen">
    <div class="h-[70px] flex items-center justify-between px-10 backdrop-blur">
      <!-- 左侧内容 -->
      <div class="flex gap-4">
        <slot name="header-start" />
      </div>

      <!-- 中间内容 -->
      <slot name="header-center" />

      <!-- 右侧内容 -->
      <div class="flex items-center justify-end gap-3">
        <slot name="header-end" />
      </div>
    </div>
    <!-- <UDivider class="opacity-20" /> -->
  </header>
</template>
