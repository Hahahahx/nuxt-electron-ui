<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'success'): void
}>()
const selected = ref(false)

const onSuccess = () => {
  emit('success')
  emit('update:modelValue', false)
}
</script>

<template>
  <ModalBase title="服务条款" prevent-close @update:model-value="val => emit('update:modelValue', val)">
    <ContentDoc path="/privacy" class="prose-primary my-2 rounded bg-gray/10 p-6 prose dark:prose-invert" />
    <UCheckbox v-model="selected" name="notifications" label="我同意并接受以上条款服务内容" />

    <template #footer>
      <UTooltip :popper="{ placement: 'top' }" :text="selected ? '进入系统' : '请先确认您已经同意了条款服务内容'">
        <UButton size="lg" class="px-10" :disabled="!selected" @click="onSuccess">
          确认
        </UButton>
      </UTooltip>
    </template>
  </ModalBase>
</template>
