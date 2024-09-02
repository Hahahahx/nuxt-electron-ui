<script setup lang="ts">
const props = defineProps<{
  menu: {
    label: string
    icon: string
    click: () => void
    labelClass?: string
    iconClass?: string
    disabled?: boolean
  }[][]
  disablePrevent?: boolean
}>()

const open = inject<(
open: boolean,
menu: {
  label: string
  icon: string
  click: () => void
}[][]
) => void>('openMenu')

function onContextMenu(e: MouseEvent) {
  if (!props.disablePrevent) {
    e.preventDefault()
    e.stopPropagation()
  }

  open?.(true, props.menu.map((group) => {
    return group.map(item => ({
      ...item,
      click: () => {
        item.click()
        open?.(false, [])
      },
    }))
  }))
}
</script>

<template>
  <div @contextmenu="onContextMenu">
    <slot />
  </div>
</template>
