import {onMounted, onUnmounted, ref} from "vue";

const MOBILE_WIDTH = 992 //移动端最大宽度，包含平板
const isMobile = ref<Boolean>(false)
const getClientWidth = () => {
  return document.documentElement.clientWidth || document.body.clientWidth
}
const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
let clientWidth = getClientWidth()

const fn = () => {
  clientWidth = getClientWidth()
  isMobile.value = clientWidth <= MOBILE_WIDTH || reg.test(navigator.userAgent)
}

export function useIsMobile() {
  onMounted(() => {
    window.addEventListener('resize', fn)
    isMobile.value = clientWidth <= MOBILE_WIDTH || reg.test(navigator.userAgent)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', fn)
  })

  return isMobile
}
