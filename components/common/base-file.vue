<script setup lang="ts">
defineProps<{
  filename: string
  loading?: boolean
}>()
</script>

<template>
  <div class="size-12 relative text-slate-400 dark:text-slate-700 ">
    <svg viewBox="0 0 48 48" width="48" height="48" class="w-full h-full" style="max-width: 100%;"><defs><clipPath id="pageRadius6"><rect x="4" y="0" rx="4" ry="4" width="40" height="48" /></clipPath><clipPath id="foldCrop"><rect width="40" height="12" transform="rotate(-45 0 12)" /></clipPath><linearGradient id="pageGradient6" x1="100%" y1="0%" y2="100%"><stop stop-color="white" stop-opacity="0.05" offset="0%" /><stop stop-color="currentColor" stop-opacity="0" offset="66.67%" /></linearGradient></defs><g id="file" clip-path="url(#pageRadius6)"><path d="M4 0 h 28 L 44 12 v 36 H 4 Z" fill="currentColor" opacity=".65" /><path d="M4 0 h 28 L 44 12 v 36 H 4 Z" fill="url(#pageGradient6)" /></g><g transform="translate(32 12) rotate(-90)"><rect width="40" height="48" opacity="0.8" fill="currentColor" rx="4" ry="4" clip-path="url(#foldCrop)" /></g></svg>
    <div class="absolute left-2 bottom-[5%]  flex items-center justify-center">
      <img
        width="100"
        height="100"
        :src="getFileIcon(filename.toLowerCase()).iconPath"
        alt=""
        class="size-12"
        :class="{
          'opacity-30': loading,
        }"
      >
      <UIcon v-if="loading" name="mingcute:loading-fill" class="animate-spin size-12  absolute text-white" />
    </div>
  </div>
</template>
