<script setup lang="ts">
import Feedback from '~/components/common/modal/header/version/feedback.vue'
import Feature from '~/components/common/modal/header/version/feature.vue'

const featureModal = useModal(Feature)
const feedbackModal = useModal(Feedback)
</script>

<template>
  <CommonModal>
    <div class="h-[100px] min-w-[300px] flex flex-col items-center justify-center gap-4">
      <div class="flex justify-between">
        <h4 class="typography-h4">
          {{ $t("menu.version") }}
        </h4>
      </div>
      <p class="typography-muted">
        {{ $t("menu.version.desc") }}
      </p>

      <div class="flex gap-2">
        <UButton variant="link" @click="featureModal.open()">
          功能介绍
        </UButton>
        <UDivider orientation="vertical" />
        <UButton variant="link" @click="feedbackModal.open()">
          反馈
        </UButton>
      </div>
    </div>
  </CommonModal>

  <!-- <UserModalHeaderVersionFeedback v-model="isFeedbackOpen" />
  <UserModalHeaderVersionFeature v-model="isFeatureOpen" /> -->
</template>
