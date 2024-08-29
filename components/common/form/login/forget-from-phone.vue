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
  Phone: z.string({
    required_error: '请填写手机'
  }).refine((str) => verify.phone(str), '请填写正确的手机号'),
  Code: z.string({
    required_error: '请填写验证码'
  }).length(4, '请填写4个字符的验证码'),
})

type Schema = output<typeof schema>

const state = reactive({
  Phone: undefined,
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
    const res = await authApi.forgetPassword('phone', {
      Send: state.Phone!,
    })
    state.Key = res.Key
    toast.success('验证码已发送至您的邮箱，请注意查收')
  } catch (err: any) {
    toast.error(err.message)
  }
  loading.value = false
}

async function verifyPhone(res: (open: boolean) => void) {
  try {
    // 验证手机
    await form.value.validate('Phone')
    res(true)
  } catch (err: any) {
    if (!err.message.includes('Phone')) {
      res(true)
    }
  }
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    emit('submit', {
      Type: 'phone',
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
    <UFormGroup name="Phone" size="lg">
      <UInput v-model="state.Phone" placeholder="请输入手机" />
    </UFormGroup>

    <UFormGroup name="Code" size="lg">
      <UButtonGroup size="lg" orientation="horizontal" class="w-full">
        <UInput v-model="state.Code" :maxlength="6" class="flex-1" placeholder="请输入验证码" />
        <CaptchaVerifyButton :loading="loading" @verify="verifyPhone" @success="handleSuccessAndSendMSG" />
      </UButtonGroup>
    </UFormGroup>

    <div class="flex justify-end">
      <UButton type="submit" class="px-4">
        确认
      </UButton>
    </div>
  </UForm>
</template>
