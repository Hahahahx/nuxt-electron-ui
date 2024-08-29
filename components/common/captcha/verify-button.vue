<script setup lang="ts">

defineProps<{
  loading?: boolean
}>()

const open = ref(false)

const emit = defineEmits<{
  (e: 'verify', value: (res: boolean) => void): void
  (e: 'success', value: (res: boolean) => void): void
}>()

const { counter, reset, pause, resume } = useInterval(1000, { controls: true, immediate: false })

const count = computed(() => {
  const res = 60 - counter.value
  if (res === 0) {
    pause()
    reset()
    return ''
  }
  if (res === 60) {
    return ''
  }
  return `（${res}）`
})

const verify = () => {
  emit('verify', (res) => {
    if (res) {
      success()
    }
  })
}

const success = () => {
  open.value = false
  emit('success', (res) => {
    if (res) {
      resume()
    }
  })
}

</script>

<template>
  <!-- <UPopover v-model:open="open" class="h-full" :popper="{ placement: 'top-end' }"> -->
  <UButton color="gray" :disabled="counter > 0" :loading="loading" @click.prevent="verify">
    发送验证码{{ count }}
  </UButton>
  <!-- <template #panel>
      <Captcha width="300px" height="240px" :max-dot="5" @success="success" />
    </template>
</UPopover> -->
</template>
