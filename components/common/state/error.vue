<script setup lang="ts">
const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  actionText?: string
  actionHandle?: () => void
}>(), {
  headline: 'ERROR',
  title: '无法找到该页面',
  description: '不好意思，我们无法在网站中找到该页面，您可能正在访问的是错误的链接，您可以通过返回按钮回到首页。',
  actionText: '返回首页',
})
const router = useRouter()

function onClick() {
  props.actionHandle ? props.actionHandle() : router.replace('/')
}
</script>

<template>
  <div class="flex items-center justify-center h-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6 lg:py-16">
    <div class="max-w-screen-sm mx-auto text-center">
      <h1 class="mb-4 font-extrabold tracking-tight text-primary-600 dark:text-primary-500 text-7xl lg:text-9xl">
        {{ headline }}
      </h1>
      <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
        {{ title }}
      </p>
      <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
      <Button class="font-bold" @click="onClick">
        {{ actionText }}
      </Button>
    </div>
  </div>
</template>
