<script setup lang="ts">
const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  actionText?: string
  error?: string
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
  <div class="flex items-start justify-center h-full overflow-y-auto w-full px-4 py-8 mx-auto lg:px-6 lg:py-16">
    <div class="max-w-screen-sm mx-auto text-center">
      <h1 class="mb-4 font-extrabold tracking-tight text-primary-600 dark:text-primary-500 text-5xl lg:text-9xl">
        {{ headline }}
      </h1>
      <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
        {{ title }}
      </p>
      <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
      <p v-if="error" class="mb-4 text font-light text-gray-500/90 dark:text-gray-400 rounded p-5 bg-gray-200 dark:bg-gray-800">
        {{ error }}
      </p>
      <UButton size="lg" class="font-bold" @click="onClick">
        {{ actionText }}
      </UButton>
    </div>
  </div>
</template>
