<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { output } from 'zod'

const form = ref()
const emit = defineEmits<{
  (e: 'submit', value: {
    Type: 'mail' | 'phone'
    Key: string
    Code: string
  }): void
}>()

const schema = z.object({
  Email: z.string({
    required_error: '请填写邮箱'
  }).email('邮箱格式有误'),
  Code: z.string({
    required_error: '请填写验证码'
  }).length(4, '请填写4个字符的验证码'),
})

type Schema = output<typeof schema>

const state = reactive({
  Email: undefined,
  Code: undefined,
  Key: '',
})


const toast = useToastHandle()
// 验证码发送加载
const loading = ref(false)

async function handleSuccessAndSendMSG() {
  loading.value = true
  // 验证码验证成功，发送邮件
  try {
    const res = await authApi.forgetPassword('mail', {
      Send: state.Email!,
    })
    state.Key = res.Key
    toast.success('验证码已发送至您的邮箱，请注意查收')
  } catch (err: any) {
    toast.error(err.message)
  }
  loading.value = false
}

async function verifyEmail(res: (open: boolean) => void) {
  try {
    // 验证邮箱
    await form.value.validate('Email')
    res(true)
  } catch (err: any) {
    if (!err.message.includes('Email')) {
      res(true)
    }
  }
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    emit('submit', {
      Type: 'mail',
      Key: state.Key,
      Code: event.data.Code,
    })
  } catch (err: any) {
    toast.error(err.message)
  }
}


</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4 md:space-y-6" @submit="onSubmit">
    <UFormGroup name="Email" size="lg">
      <UInput v-model="state.Email" placeholder="请输入邮箱" />
    </UFormGroup>

    <UFormGroup name="Code" size="lg">
      <UButtonGroup size="lg" orientation="horizontal" class="w-full">
        <UInput v-model="state.Code" :maxlength="6" class="flex-1" placeholder="请输入验证码" />
        <CaptchaVerifyButton :loading="loading" @verify="verifyEmail" @success="handleSuccessAndSendMSG" />
      </UButtonGroup>
    </UFormGroup>

    <div class="flex justify-end">
      <UButton type="submit" class="px-4">
        确认
      </UButton>
    </div>
  </UForm>
</template>
