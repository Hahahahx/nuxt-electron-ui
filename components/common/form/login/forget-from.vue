<script setup lang="ts">
import ForgetPassword from './forget-password.vue'

import type { FormSubmitEvent } from '#ui/types'
import type { output } from 'zod'

const model = defineModel({
  type: Boolean
})

const emit = defineEmits<{
  (e: 'submit', value: {
    Token: string
  }): void
}>()


const items = [{
  key: 'Email',
  slot: 'Email',
  label: '邮箱',
}, {
  key: 'Phone',
  slot: 'Phone',
  label: '手机',
}]


const toast = useToastHandle()

const Token = ref('')

async function onSubmit(event: {
  Key: string
  Code: string
  Type: 'mail' | 'phone'
}) {
  try {
    const res = await authApi.forgetPasswordCheck(event.Type, event)
    toast.success('验证通过，请修改您的密码')
    Token.value = res.Token
  } catch (err: any) {
    toast.error(err.message)
  }
}




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


async function onSubmitPassword(event: FormSubmitEvent<Schema>) {
  try {
    await authApi.forgetPasswordChange({
      Token: Token.value,
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
  <UDashboardModal
    v-model="model"
    title="忘记密码"
    description="填写您的账号与所绑定的邮箱，
我们将为您发送验证码的邮件，以便于您重置密码。"
    :ui="{ width: 'sm:max-w-md' }"
  >
    <UForm
      v-if="Token"
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4 md:space-y-6"
      @submit="onSubmitPassword"
    >
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
    <UTabs v-else :items="items" class="w-full">
      <template #Email>
        <FormLoginForgetFromEmail class="pt-4" @submit="onSubmit" />
      </template>
      <template #Phone>
        <FormLoginForgetFromPhone class="pt-4" @submit="onSubmit" />
      </template>
    </UTabs>
  </UDashboardModal>
</template>
