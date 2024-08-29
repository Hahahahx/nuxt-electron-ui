<script setup lang="ts">

const {
  value,
  width = '300px',
  height = '240px',
  calcPosType = 'dom',
  maxDot = 5,
  imageBase64,
  thumbBase64,
} = defineProps<{
  value?: boolean
  width?: string
  height?: string
  calcPosType?: string
  maxDot?: number
  imageBase64?: string
  thumbBase64?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success', value: { CaptchaCode: string }): void
  (e: 'refresh'): void
}>()


const { data, refresh } = useAsyncData(API.common.auth.capthcha)

const toast = useToastHandle()

const state = reactive({
  dots: ref<any[]>([]),
  imageBase64Code: imageBase64,
  thumbBase64Code: thumbBase64,
  style: computed(() => {
    return `width:${width}; height:${height};`
  }),
  /**
   * @Description: 处理关闭事件
   */
  handleCloseEvent() {
    emit('close')
    state.dots = []
    state.imageBase64Code = ''
    state.thumbBase64Code = ''
  },
  /**
   * @Description: 处理刷新事件
   */
  handleRefreshEvent() {
    state.dots = []
    refresh()
    emit('refresh')
  },
  /**
   * @Description: 处理确认事件
   */
  async handleConfirmEvent() {
    try {
      // 验证验证码
      const res = await API.common.auth.checkCaptcha({
        UUID: data.value?.UUID,
        Check: state.dots.map(i => [i.x, i.y].join(',')).join(','),
      })
      emit('success', { CaptchaCode: res?.Code ?? '' })
    } catch (err: any) {
      toast.error(err.message)
      state.handleRefreshEvent()
    }

  },
  /**
   * @Description: 处理dot
   * @param ev
   */
  handleClickPos(ev: any) {
    if (state.dots.length >= maxDot)
      return
    const e = ev || window.event
    e.preventDefault()
    const dom = e.currentTarget
    const { domX, domY } = state.getDomXY(dom)
    // ===============================================
    // @notice 如 getDomXY 不准确可尝试使用 calcLocationLeft 或 calcLocationTop
    // const domX = state.calcLocationLeft(dom)
    // const domY = state.calcLocationTop(dom)
    // ===============================================
    let mouseX = navigator.appName === 'Netscape'
      ? e.pageX
      : e.x + document.body.offsetTop
    let mouseY = navigator.appName === 'Netscape'
      ? e.pageY
      : e.y + document.body.offsetTop
    if (calcPosType === 'screen') {
      mouseX = navigator.appName === 'Netscape' ? e.clientX : e.x
      mouseY = navigator.appName === 'Netscape' ? e.clientY : e.y
    }
    // 计算点击的相对位置
    const xPos = mouseX - domX
    const yPos = mouseY - domY
    // 转整形
    const xp = Number.parseInt(xPos.toString())
    const yp = Number.parseInt(yPos.toString())

    // 减去点的一半
    state.dots.push({
      x: xp - 11,
      y: yp - 11,
      index: state.dots.length + 1,
    })

    return false
  },
  /**
   * @Description: 找到元素的屏幕位置
   * @param el
   */
  calcLocationLeft(el: any) {
    let tmp = el.offsetLeft
    let val = el.offsetParent
    while (val != null) {
      tmp += val.offsetLeft
      val = val.offsetParent
    }
    return tmp
  },
  /**
   * @Description: 找到元素的屏幕位置
   * @param el
   */
  calcLocationTop(el: any) {
    let tmp = el.offsetTop
    let val = el.offsetParent
    while (val != null) {
      tmp += val.offsetTop
      val = val.offsetParent
    }
    return tmp
  },
  /**
   * @Description: 找到元素的屏幕位置
   * @param dom
   */
  getDomXY(dom: any) {
    let x = 0
    let y = 0
    if (dom.getBoundingClientRect) {
      const box = dom.getBoundingClientRect()
      const D = document.documentElement
      x = box.left
        + Math.max(D.scrollLeft, document.body.scrollLeft)
        - D.clientLeft
      y = box.top
        + Math.max(D.scrollTop, document.body.scrollTop)
        - D.clientTop
    }
    else {
      while (dom !== document.body) {
        x += dom.offsetLeft
        y += dom.offsetTop
        dom = dom.offsetParent
      }
    }
    return {
      domX: x,
      domY: y,
    }
  },
})

effect(() => {
  if (data.value) {
    const res = (data?.value)
    // const res = JSON.parse(data?.value)
    state.imageBase64Code = res?.BackgroundImage
    state.thumbBase64Code = res?.CheckImage
  }
})

watch(() => value, () => {
  state.dots = []
  state.imageBase64Code = ''
  state.thumbBase64Code = ''
})
watch(() => imageBase64, (val) => {
  state.dots = []
  state.imageBase64Code = val
})
watch(() => thumbBase64, (val) => {
  state.dots = []
  state.thumbBase64Code = val
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-center">
        <span>
          请在下图
          <em>依次</em>
          点击：
        </span>
        <img v-if="state.thumbBase64Code" :src="state.thumbBase64Code" alt=" ">
      </div>
    </template>
    <div class="wg-cap-wrap__body">
      <img
        v-if="state.imageBase64Code"
        class="wg-cap-wrap__picture"
        :src="state.imageBase64Code"
        alt=" "
        @click="state.handleClickPos($event)"
      >

      <template v-for="(dot, key) in state.dots" :key="key">
        <div class="wg-cap-wrap__dot" :style="`top: ${dot.y}px; left:${dot.x}px;`">
          <span>{{ dot.index }}</span>
        </div>
      </template>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <div>
          <!-- <UButton icon="i-solar-close-circle-line-duotone" variant="ghost" color="gray" title="关闭" @click="state.handleCloseEvent" /> -->
          <UButton
            icon="i-solar-refresh-circle-line-duotone"
            variant="ghost"
            color="gray"
            title="刷新"
            @click="state.handleRefreshEvent"
          />
        </div>
        <div>
          <UButton @click="state.handleConfirmEvent">
            确认
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style>
.wg-cap-wrap__body {
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  background: #34383e;
  margin: auto;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
}

.wg-cap-wrap__body .wg-cap-wrap__dot {
  position: absolute;
  z-index: 10;
  width: 22px;
  height: 22px;
  color: #cedffe;
  background: #3e7cff;
  border: 2px solid #f7f9fb;
  line-height: 20px;
  text-align: center;
  -webkit-border-radius: 22px;
  -moz-border-radius: 22px;
  border-radius: 22px;
  cursor: default;
}
</style>
