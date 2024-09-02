<script setup lang="ts">
const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const isOpen = ref(false)
const virtualElement = ref({ getBoundingClientRect: () => ({}) })

const menus = ref<{
  label: string
  icon: string
  click: () => void
}[][]>([])

provide('openMenu', (open: boolean, menu: {
  label: string
  icon: string
  click: () => void
}[][]) => {
  isOpen.value = false
  if (open) {
    setTimeout(() => {
      isOpen.value = open
      menus.value = menu
      const top = unref(y) - unref(windowY)
      const left = unref(x)

      virtualElement.value.getBoundingClientRect = () => ({
        width: 0,
        height: 0,
        top,
        left,
      })
    })
  }
})
</script>

<template>
  <slot />
  <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
    <UVerticalNavigation :links="menus" />
  </UContextMenu>
</template>
