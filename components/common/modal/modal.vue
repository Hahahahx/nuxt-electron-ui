<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

import { breakpointsTailwind } from '@vueuse/core'

const { blur, placement = 'center', preventClose, hideOverlay } = defineProps<{
  title?: string
  subtitle?: string
  hiddenClose?: boolean
  blur?: boolean
  placement?: 'bottom' | 'center' | 'top' | 'right' | 'left'
  preventClose?: boolean
  fullScreen?: boolean
  blank?: boolean
  hideOverlay?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
const breakpoints = useBreakpoints(breakpointsTailwind)
const placementRef = computed(() => {
  if (placement !== 'center')
    return placement

  if (breakpoints.smaller('sm').value)
    return 'bottom'
  else
    return 'center'
})

function getInitialValues() {
  const opts = {
    teleportTo: 'body',
    modelValue: false,
    displayDirective: 'if' as 'if' | 'show' | 'visible',
    hideOverlay: !!hideOverlay,
    overlayTransition: 'vfm-fade',
    contentTransition: 'vfm-fade',
    clickToClose: !preventClose,
    escToClose: true,
    background: 'non-interactive' as 'non-interactive' | 'interactive',
    lockScroll: true,
    reserveScrollBarGap: true,
    swipeToClose: 'none' as 'right' | 'left' | 'none' | 'down' | 'up',
  }
  return opts
}

const options = ref(getInitialValues())

effect(() => {
  switch (placementRef.value) {
    case 'bottom':
      options.value.swipeToClose = 'down'
      options.value.contentTransition = 'vfm-slide-down'
      break
    case 'top':
      options.value.swipeToClose = 'up'
      options.value.contentTransition = 'vfm-slide-up'
      break
    case 'right':
      options.value.swipeToClose = 'right'
      options.value.contentTransition = 'vfm-slide-right'
      break
    case 'left':
      options.value.swipeToClose = 'left'
      options.value.contentTransition = 'vfm-slide-left'
      break
    default:
      options.value.swipeToClose = 'none'
      options.value.contentTransition = 'vfm-fade'
      break
  }
})

const contentClass = {
  center: 'absolute top-1/2 left-1/2 -translate-1/2 max-h-screen',
  bottom: 'absolute bottom-0 w-screen',
  top: 'absolute top-0 w-screen',
  right: 'absolute right-0 h-screen',
  left: 'absolute left-0 h-screen',
}

const cardClass = {
  center: '',
  bottom: 'w-screen max-h-[90vh] overflow-y-auto rounded-b-none',
  top: ' w-screen rounded-t-none max-h-[90vh] overflow-y-auto ',
  right: ' h-screen rounded-r-none  max-w-[90vh] overflow-w-auto ',
  left: 'h-screen rounded-l-none max-w-[90vh] overflow-w-auto ',
}
</script>

<template>
  <VueFinalModal
    class="overflow-y-auto"
    :content-class="[contentClass[placementRef]]"
    :overlay-class="['bg-black/20 fixed bottom-0 h-screen', blur && 'backdrop-blur-sm ']"
    :teleport-to="options.teleportTo"
    :display-directive="options.displayDirective"
    :hide-overlay="options.hideOverlay"
    :overlay-transition="options.overlayTransition"
    :content-transition="options.contentTransition"
    :click-to-close="options.clickToClose"
    :esc-to-close="options.escToClose"
    :background="options.background"
    :lock-scroll="options.lockScroll"
    :reserve-scroll-bar-gap="options.reserveScrollBarGap"
    :swipe-to-close="options.swipeToClose"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div :class="[cardClass[placementRef], fullScreen ? 'w-screen h-screen ' : 'md:py-5']">
      <UCard class="h-full w-full" :ui="{ ring: '', divide: subtitle ? 'divide-y' : 'divide-y-0' }">
        <template v-if="!blank" #header>
          <slot name="header">
            <div class="du flex items-center justify-between">
              <div>
                <slot name="title">
                  <div class="flex justify-between">
                    <h4 class="typography-h4">
                      {{ title }}
                    </h4>
                  </div>
                  <p v-if="subtitle" class="typography-muted">
                    {{ subtitle }}
                  </p>
                </slot>
              </div>
              <UButton v-if="!hiddenClose" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @pointerup="emit('update:modelValue', false)" />
            </div>
          </slot>
        </template>
        <div>
          <slot />
        </div>

        <template v-if="!blank" #footer>
          <div class="flex items-center justify-end">
            <slot name="footer" />
          </div>
        </template>
      </UCard>
    </div>
  </VueFinalModal>
</template>
