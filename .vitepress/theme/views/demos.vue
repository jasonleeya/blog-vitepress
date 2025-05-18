<!--个人作品页面-->
<template>
  <iframe id="iframe" src="https://demos.lsj97.com" @load="emit('load')"></iframe>
</template>

<script lang="ts" setup>
const emit = defineEmits(['load'])
</script>

<style lang="scss" scoped>
#iframe {
  width: 100%!important;
  height: calc(100vh - var(--vp-nav-height))!important;
  border: none;
}
</style>
