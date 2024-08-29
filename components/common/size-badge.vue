<script setup lang="ts">
const { size, unit = 'KB' } = defineProps<{
  size: number
  unit?: 'B' | 'KB' | 'MB' | 'GB' | 'TB'
}>()

const colors = {
  Null: 'slate',
  B: 'lime',
  KB: 'emerald',
  MB: 'sky',
  GB: 'indigo',
  TB: 'purple',
  PB: 'pink',
  EB: 'rose',
  ZB: 'orange',
  YB: 'yellow',
}

type Unit = keyof typeof colors

const unitFunc = {
  B: mertic,
  KB: merticKB,
  MB: merticMB,
  GB: merticGB,
  TB: merticTB,
}


const obj = computed(() => {
  return unitFunc[unit]<{
    color: string
    value: string
  }>(Number(size), (num, unit: Unit) => {
    return {
      color: colors[unit],
      value: num.toFixed(0) + unit,
    }
  })
})
</script>

<template>
  <UBadge :color="obj.color" variant="solid" class="shadow-sm shadow-inner opacity-90">
    {{ obj.value }}
  </UBadge>
</template>
