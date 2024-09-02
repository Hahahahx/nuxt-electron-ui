<script setup lang="ts">
const rclone = useRcloneStore()

function onChange(v: string) {
  navigateTo(`/file/${v}`)
}
</script>

<template>
  <LayoutPage>
    <Flex direction="col" justify-content="center" align-items="center" class="h-full gap-4">
      <img src="/images/system/logo.svg" alt="" class="w-24">
      <Flex direction="col" justify-content="center" align-items="center" class="gap-1">
        <h2 className="text-xl font-bold text-app-text">
          尚未选择文件存储配置
        </h2>
        <div className="w-full px-60 flex justify-center">
          <p className="text-app-text opacity-60 text-center">
            您需要先连接到一个兼容的存储，才能使用服务。
          </p>
        </div>
      </Flex>
      <Flex>
        <USelectMenu class="w-[200px]" :options="rclone.configs.map(i => i.name) ?? []" placeholder="选择存储" @change="onChange">
          <template #empty>
            <Flex justify-content="center" align-items="center">
              <StateEmpty />
            </Flex>
          </template>
        </USelectMenu>
      </Flex>
    </Flex>
  </LayoutPage>
</template>
