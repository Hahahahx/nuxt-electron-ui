<script setup lang="ts">
const { actions } = useElectron()
</script>

<template>
  <header class="flex h-[60px] flex-shrink-0 items-center gap-1 px-4 drag">
    <!-- <h1 class="text-xl font-semibold">
      {{ page.title }}
    </h1> -->

    <div id="header-left" />
    <div class="ml-auto gap-1.5 text-sm" />
    <Flex justify-content="end" align-items="center" class="drag gap-3">
      <ThemeToggle />
      <UDivider orientation="vertical" class="mx-2 h-[20px] w-[1px]" />
      <Flex justify-content="end" align-items="center" class="gap-1">
        <UButton
          square variant="ghost" icon="i-mdi-minus" class="overflow-hidden " @click="actions?.min()"
        />
        <UButton
          square variant="ghost" icon="i-mdi-crop-square" class="overflow-hidden " @click="actions?.max"
        />
        <UButton
          square variant="ghost" icon="i-mdi-window-close" class="overflow-hidden " @click="actions?.close()"
        />
      </Flex>
    </Flex>
  </header>
</template>
