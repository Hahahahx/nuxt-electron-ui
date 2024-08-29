

<script setup lang="ts">
defineProps<{
  error:any
}>()

const emit = defineEmits<{
  (e:'retry'):Promise<any>
}>()


const { isPending, start, stop } = useTimeoutFn(async () => {
    await emit('retry')
}, 3000,{
  immediate:false
})


</script>

<template>
  <div class=" flex flex-col items-center justify-center gap-2 rounded bg-gray-600/5 py-5">
    <UIcon name="i-heroicons-exclamation-triangle-16-solid" class=" h-10 w-10 text-rose-500 dark:text-rose-700 " />
    <p class="max-w-[500px] text-center font-semibold typography-muted">
      {{ error }}
    </p>
    <UButton variant="soft" :loading="isPending" @click="start()">
      <span class="tracking-[5px]">{{ $t('try-again') }}</span>
    </UButton>
  </div>
</template>
