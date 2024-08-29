<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { UForm } from '#build/components'


const route = useRoute()
const emit = defineEmits<{
  (e: 'submit'): void
}>()
// const verifyName = verify.test(
//   // @ts-ignore
//   new RegExp(/^[a-z]{1}(?=.*[a-z])[a-z\d\-]{4,18}[a-z\d]{1}$/)
// )

const schema = z.object({
  // UserName: z.string({
  //   required_error: '账号不能为空'
  // })
  //   .refine(verifyName, '名称应该以6-20位的小写字母组成，允许其中包含数字、连接符（-）')
  //   .refine(str => str !== 'root' && str !== 'jwanfs', '不允许起名关键字root、jwanfs'),
  Email: z.string({
    required_error: '请填写邮箱'
  }).email('邮箱格式有误'),
  Code: z.string({
    required_error: '验证码不能为空'
  }),
})
const { data, refresh } = useAsyncData(authApi.captcha)

type Schema = z.output<typeof schema>

const state = reactive({
  UserName: 'random',
  Email: undefined,
  Code: undefined,
})

const loading = ref(false)
const toast = useToastHandle()


async function handleSuccessAndSendMSG() {
  loading.value = true
  // 验证码验证成功，发送邮件
  try {
    await authApi.sendCode({
      Email: state.Email,
    })
    toast.success('验证码发送成功')
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
    loading.value = true
    const res = await authApi.register({ ...state, RandomPass: true, Uuid: data.value?.uuid ?? '', SSOToken: route.query.SSOToken as string })
    loading.value = false
    window.location.href = window.location.origin + '/login?token=' + res.Token
    emit('submit')
  } catch (err: any) {

    loading.value = false
    toast.error(err.message)
  }
  await refresh()
}


// const { data: auditors, pending } = useAsyncData(authApi.auditors, {
//   default: () => [],
// })


const form = ref()


</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4 md:space-y-6" @submit="onSubmit">
    <!-- <UFormGroup name="UserName" size="lg">
      <UInput v-model="state.UserName" class="" placeholder="请填写账号" />
    </UFormGroup> -->

    <UFormGroup name="Email" size="lg">
      <UInput v-model="state.Email" placeholder="请输入邮箱" />
    </UFormGroup>

    <!--
    <UFormGroup name="SysUserId" size="lg">
      <USelect
        v-model="state.SysUserId"
        :loading="pending"
        :options="auditors"
        placeholder="请选择审核人"
        option-attribute="UserName"
        value-attribute="Id"
      />
    </UFormGroup>
   -->


    <UFormGroup name="Code" size="lg">
      <UButtonGroup size="lg" orientation="horizontal" class="w-full">
        <UInput v-model="state.Code" :maxlength="6" class="flex-1" placeholder="请输入验证码" />
        <CaptchaVerifyButton :loading="loading" @verify="verifyEmail" @success="handleSuccessAndSendMSG" />
      </UButtonGroup>
    </UFormGroup>
    <!-- <UFormGroup name="Code" size="lg">
      <div class="flex gap-4">
        <UInput v-model="state.Code" class="flex-1" :max-length="6" placeholder="请填写验证码" />
        <NuxtImg class="rounded overflow-hidden" :src="`data:image/png;base64,${data?.imgByte}`" @click="refresh" />
      </div>
    </UFormGroup> -->

    <UButton type="submit" block size="lg" class="font-bold" :loading="loading">
      提交
    </UButton>
  </UForm>
</template>
