<script setup lang="ts">
function handleBtnEvent() {

}

function handleConfirmEvent() {

}

const data = ref({
  maxDot: 5,
  imageBase64: '',
  thumbBase64: '',
})
</script>

<template>
  <UPopover>
    <div class="w-full">
      <!-- 初始状态 -->
      <UButton
        icon="i-solar-shield-keyhole-bold-duotone text-blue-500"
        variant="ghost"
        color="cyan"
        label="请进行人机验证"
        :trailing="false"
        size="lg"
        block
        @click="handleBtnEvent"
      />
    </div>
    <template #panel>
      <Captcha
        width="300px"
        height="240px"
        :max-dot="data.maxDot"
        :image-base64="data.imageBase64"
        :thumb-base64="data.thumbBase64"
        @confirm="handleConfirmEvent"
      />
    </template>
  </UPopover>
</template>
