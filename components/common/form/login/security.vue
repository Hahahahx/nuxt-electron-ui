<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { output } from 'zod'


const model = defineModel({
  type: Boolean
})

const form = ref()
const emit = defineEmits<{
  (e: 'submit', res: {
    Token: string;
  }): void
}>()


const { initial } = defineProps<{
  initial: {
    Email?: string
    Phone?: string
    UserName?: string
  }
}>()

const schema = z.object({
  CodeType: z.string({
    required_error: '请选择认证方式'
  }),
  Code: z.string({
    required_error: '请填写验证码'
  }).length(4, '请填写4个字符的验证码')
})

type Schema = output<typeof schema>

const state = reactive({
  CodeType: undefined,
  Code: undefined,
})


const toast = useToastHandle()
// 验证码发送加载
const loading = ref(false)

async function handleSuccessAndSendMSG(res: (open: boolean) => void) {
  loading.value = true
  // 验证码验证成功，发送邮件
  try {

    const params = state.CodeType === 'email' ? {
      Email: initial.Email,
    } : {
      Phone: initial.Phone
    }

    await authApi.sendCode(params)
    res(true)
    toast.success('验证码发送成功')
  } catch (err: any) {
    toast.error(err.message)
  }
  loading.value = false
}

async function verify(res: (open: boolean) => void) {
  res(true)
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const params = state.CodeType === 'email' ? {
      Email: initial.Email,
      Code: event.data.Code,
    } : {
      Phone: initial.Phone,
      Code: event.data.Code,
    }

    const res = await authApi.loginByDevice(params)
    emit('submit', res)
  } catch (err: any) {
    toast.error(err.message)
  }
  model.value = false
  loading.value = false
}



const options = computed(() => {

  const list = []
  !!initial.Email &&
    list.push({
      id: 'email',
      name: '邮箱: ' + emailShield(initial.Email)
    })
  !!initial.Phone &&
    list.push({
      id: 'phone',
      name: '手机号: ' + phoneShield(initial.Phone)
    })
  !!initial.UserName &&
    list.push({
      id: 'totp',
      name: '安全验证器: ' + initial.UserName
    })
  return list
})

</script>

<template>
  <UDashboardModal v-model="model" title="安全校验" description="请选择一种方式进行安全校验" :ui="{ width: 'sm:max-w-md' }">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4 md:space-y-6" @submit="onSubmit">
      <UFormGroup name="CodeType">
        <USelectMenu
          v-model="state.CodeType"
          :options="options"
          placeholder="选择认证方式"
          value-attribute="id"
          option-attribute="name"
        />
      </UFormGroup>

      <UFormGroup name="Code">
        <UButtonGroup orientation="horizontal" class="w-full">
          <UInput v-model="state.Code" :maxlength="6" class="flex-1" placeholder="请输入验证码" />
          <VerifyButton
            v-if="state.CodeType !== 'totp'"
            :loading="loading"
            @verify="verify"
            @success="handleSuccessAndSendMSG"
          />
        </UButtonGroup>
      </UFormGroup>

      <div class="flex justify-end">
        <UButton type="submit" class="px-4">
          确认
        </UButton>
      </div>
    </UForm>
  </UDashboardModal>
</template>
