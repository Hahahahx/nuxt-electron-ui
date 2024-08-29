<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import Security from './security.vue'
import ForgetFrom from './forget-from.vue'
import ForgetPassword from './forget-password.vue'

const emit = defineEmits<{
  (e: 'submit', value: {
    Token: string
    Remember: boolean
  }): void
}>()


const schema = z.object({
  UserName: z.string({
    required_error: '账号不能为空'
  }),
  Password: z.string({
    required_error: '密码不能为空'
  }),
  Code: z.string({
    required_error: '验证码不能为空'
  }),
  Remember: z.boolean()
})

const { data, refresh } = useAsyncData(authApi.captcha)

type Schema = z.output<typeof schema>

const state = reactive({
  UserName: undefined,
  Password: undefined,
  Code: undefined,
  Remember: true,
})

const toast = useToastHandle()

const modal = useModal()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const res = await authApi.login({ ...event.data, UUID: data.value?.uuid ?? '' })
    // 登录成功
    if (res.Token) {
      emit('submit', { ...res, Remember: event.data.Remember })
    } else {
      // 需要安全验证
      modal.open(Security, {
        initial: res,
        onSubmit(result) {
          emit('submit', { ...result, Remember: event.data.Remember })
        }
      })
    }
  } catch (err: any) {
    toast.error(err.message)
  }
  refresh()
}


const onForgetPassword = () => {
  // 忘记密码
  modal.open(ForgetFrom )
}



</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 md:space-y-6" @submit="onSubmit">
    <UFormGroup name="UserName" size="lg">
      <UInput v-model="state.UserName" class="" placeholder="请填写账号" />
    </UFormGroup>

    <UFormGroup name="Password" size="lg">
      <UInput v-model="state.Password" type="Password" placeholder="请填写密码" />
      <p class="text-right text-sm text-muted-foreground">
        <UButton variant="link" @click="onForgetPassword">
          忘记密码？
        </UButton>
      </p>
    </UFormGroup>

    <UFormGroup name="Code" size="lg">
      <div class="flex gap-4">
        <UInput v-model="state.Code" class="flex-1" :max-length="6" placeholder="请填写验证码" />
        <NuxtImg class="rounded overflow-hidden" :src="`data:image/png;base64,${data?.imgByte}`" @click="refresh" />
      </div>
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
