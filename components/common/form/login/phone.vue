<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { output } from 'zod'

const form = ref()
const emit = defineEmits<{
  (e: 'submit', value: {
    Token: string
    Remember: boolean
  }): void
}>()

const schema = z.object({
  Phone: z.string({
    required_error: '请填写手机'
  }).refine((str) => verify.phone(str), '请填写正确的手机号'),
  Code: z.string({
    required_error: '请填写验证码'
  }).length(4, '请填写4个字符的验证码'),
  Remember: z.boolean()
})

type Schema = output<typeof schema>

const state = reactive({
  Phone: undefined,
  Code: undefined,
  Remember: true,
})


const toast = useToastHandle()
// 验证码发送加载
const loading = ref(false)

async function handleSuccessAndSendMSG() {
  loading.value = true
  // 验证码验证成功，发送邮件
  try {
    await authApi.sendCode({
      Phone: state.Phone,
    })
    toast.success('验证码发送成功')
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
    const res = await authApi.loginByDevice({ ...event.data })
    emit('submit', { ...res, Remember: event.data.Remember })
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

    <UFormGroup name="Remember">
      <div class="flex items-center gap-2">
        <UCheckbox v-model="state.Remember" color="primary" label="记住登录" />
        <UPopover mode="hover" :popper="{ placement: 'right' }">
          <UIcon name="i-heroicons-information-circle-20-solid" color="red" />
          <template #panel>
            <div class="max-w-[200px] text-sm p-2">
              该操作代表您允许将数据缓存在该浏览器中，如果不是您的个人计算机，请取消勾选
            </div>
          </template>
        </UPopover>
      </div>
    </UFormGroup>

    <UButton type="submit" block size="lg" class="font-bold">
      登录
    </UButton>
  </UForm>
</template>
