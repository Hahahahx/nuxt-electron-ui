<script lang="tsx" setup>
const { as = 'h1', title } = defineProps<{
  icon?: string
  breadcrumb?: any[]
  title?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  description?: string
  link?: string
}>()

const space = {
  h1: 'space-y-3',
  h2: 'space-y-2',
  h3: 'space-y-1',
  h4: 'space-y-0',
}

function Title() {
  switch (as) {
    case 'h1':
      return (
        <h1 class="typography-h1">
          {title }
        </h1>
      )
    case 'h2':
      return (
        <h2 class="typography-h2">
          {title }
        </h2>
      )
    case 'h3':
      return (
        <h3 class="typography-h3">
          {title }
        </h3>
      )
    case 'h4':
      return (
        <h4 class="typography-h4">
          {title }
        </h4>
      )
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-5 my-6">
    <div class="flex items-center gap-4">
      <slot name="icon">
        {{ icon }}
      </slot>
      <div :class="space[as]">
        <slot name="headline">
          <UBreadcrumb :links="breadcrumb" />
        </slot>
        <slot name="title">
          <Title />
        </slot>
        <slot name="description">
          <p class="-z-1 typography-muted">
            {{ description }}
          </p>
        </slot>
      </div>
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
</template>
