<script setup lang="ts">
const { blur } = defineProps<{
  title: string
  subtitle?: string
  hiddenClose?: boolean
  blur?: boolean
}>()
const isExternalOpen = defineModel<boolean>()

const overlayBg = blur ? 'bg-slate-950/10  backdrop-blur-sm' : 'bg-slate-950/10 backdrop-blur-none'
</script>

<template>
  <UModal v-model="isExternalOpen" :ui="{ overlay: { background: overlayBg } }">
    <UCard :ui="{ ring: '', divide: subtitle ? 'divide-y' : 'divide-y-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <div class="flex justify-between">
              <h4 class="typography-h4">
                {{ title }}
              </h4>
            </div>
            <p v-if="subtitle" class="typography-muted">
              {{ subtitle }}
            </p>
          </div>
          <UButton v-if="!hiddenClose" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isExternalOpen = false" />
        </div>
      </template>
      <slot />

      <template #footer>
        <div class="flex items-center justify-end">
          <slot name="footer" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
