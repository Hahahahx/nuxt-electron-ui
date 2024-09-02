<script setup lang="ts">
// 定义外部数据，以及操作方法
const { files: filesList } = defineProps<{
  files: FileList | File[] | null
}>()

const files = ref<File[]>([])
const modal = useModal()

effect(() => {
  files.value = Array.from(filesList ?? [])
})

function removeFile(file: File) {
  // 删除文件
  files.value = files.value.filter(f => f !== file)
}

const dropZoneRef = ref<HTMLDivElement>()

const { open, onChange } = useFileDialog()
onChange((fs) => {
  console.log(fs)
  files.value = [...files.value, ...Array.from(fs ?? []).filter(i => files.value.every(f => f.name !== i.name))]
})

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: (fs) => {
    files.value = [...files.value, ...Array.from(fs ?? []).filter(i => files.value.every(f => f.name !== i.name))]
  },
})

const fileStore = useFileStore()

function onUpload() {
  fileStore.addFilePending(files.value)
  files.value = []
  modal.close()
}
</script>

<template>
  <UDashboardModal
    title="上传文件"
    description="选择需要上传的文件"
    icon="i-solar-file-send-bold-duotone"
    :ui="{
      width: 'sm:max-w-md',
      icon: { base: 'text-blue-500 dark:text-blue-400' } as any,
    }"
  >
    <!-- ~/components/users/UsersForm.vue -->

    <div ref="dropZoneRef" class="relative px-6">
      <div v-if="!!files.length" class="space-y-2 min-h-[300px] overflow-auto">
        <UTooltip
          v-for="(item, i) in files"
          :key="i"
          :popper="{ arrow: true }"
          side="bottom" text="点击删除该文件"
          class="w-full"
        >
          <UButton
            size="sm"
            variant="ghost"
            class="p-1 hover:bg-rose-500 w-full pl-2"
            @click="removeFile(item)"
          >
            <span class="truncate w-full text-left typography-muted text-foreground">
              {{ item.name }}
            </span>
            <SizeBadge :size="item.size ?? 0" unit="B" />
          </UButton>
        </UTooltip>
      </div>
      <div v-else class=" bg-gray-500/10 rounded w-full h-[300px] flex items-center justify-center cursor-pointer" :onclick="open">
        <UIcon name="heroicons:plus" class="w-16 h-16 opacity-80" />
      </div>
      <div
        v-if="isOverDropZone"
        class="p-20 bg-gray-500/5 border-1 rounded h-full w-full z-[1000] absolute top-0 left-0 "
      >
        <div class="bg-gray-500/10 gap-4 h-full rounded flex-col flex border-1 justify-center items-center">
          <UIcon name="i-solar-inbox-out-outline" class=" w-14 h-14" />
          <span class="typography-h4">
            添加文件到当前队列
          </span>
        </div>
      </div>
    </div>
    <template #footer>
      <Flex justify-content="end" class="gap-2 w-full">
        <UButton class="mx-2" variant="soft" @click="open">
          添加文件
        </UButton>
        <UButton @click="onUpload">
          确认上传
        </UButton>
      </Flex>
    </template>
  </UDashboardModal>
</template>
