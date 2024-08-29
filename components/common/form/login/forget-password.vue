<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { output } from 'zod'

const model = defineModel({
  type: Boolean
})

const {Token} = defineProps<{
  Token: string
}>()

const form = ref()

const schema = z.object({
  Password: z.string({
    required_error: '密码不能为空'
  }),
  Confirm: z.string({
    required_error: '确认密码不能为空'
  }),
}).refine(({ Confirm, Password }) => Confirm === Password, {
  message: '两次密码输入不一致',
  path: ['Confirm']
})

type Schema = output<typeof schema>

const state = reactive({
  Password: undefined,
  Confirm: undefined,
})

onMounted(()=>{
  console.log('inner')
  model.value=true
})
const toast = useToastHandle()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await authApi.forgetPasswordChange({
      Token,
      Password: event.data.Password,
    })
    toast.success('修改成功')
    model.value = false
  } catch (err: any) {
    toast.error(err.message)
  }
}



</script>

<template>
  <UDashboardModal v-model="model" title="修改密码" description="修改用户当前密码" :ui="{ width: 'sm:max-w-md' }">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4 md:space-y-6" @submit="onSubmit">
      <UFormGroup name="Password" size="lg">
        <UInput v-model="state.Password" type="Password" placeholder="请填写密码" />
      </UFormGroup>

      <UFormGroup name="Confirm" size="lg">
        <UInput v-model="state.Confirm" type="Password" placeholder="请再次确认密码" />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton type="submit" class="px-4">
          确认
        </UButton>
      </div>
    </UForm>
  </UDashboardModal>
</template>
