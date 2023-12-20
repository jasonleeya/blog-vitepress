<script setup lang="ts">
import {PropType, ref} from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<Work>,
    required: true
  }
})
let startX = 0
let endX = 0
let isShaking = false
const strength = ref(0)
const direction = ref('')

const handleMouseEnter = (e: MouseEvent | TouchEvent) => {
  if (isShaking) {
    return
  }
  if (e instanceof MouseEvent) {
    startX = e.x;
  } else {
    startX = e.touches[0].clientX
  }
  setTimeout(() => {
    startShake()
  }, 100)
}
const handleMouseMove = (e: MouseEvent | TouchEvent) => {
  if (isShaking) {
    return
  }

  if (e instanceof MouseEvent) {
    endX = e.x;
  } else {
    endX = e.touches[0].clientX
  }
}
const handleMouseLeave = (e: MouseEvent | TouchEvent) => {
  if (isShaking) {
    return
  }
  if (e instanceof MouseEvent) {
    endX = e.x;
  } else {
    endX = e.touches[0].clientX
  }
}
const startShake = () => {
  const s = Math.ceil(Math.abs((endX - startX) / 10))
  strength.value = s > 30 ? 30 : s
  direction.value = (endX - startX > 0) ? 'l' : 'r'
  isShaking = true

  setTimeout(() => {
    isShaking = false
    strength.value = 0
    direction.value = ''
    startX = 0
    endX = 0

  }, 2000 + 200 * strength.value)
}
</script>

<template>
  <div class="picture-card" :class="[`card-shake-${strength}-${direction}`]"
       @mouseenter="handleMouseEnter"
       @mousemove="handleMouseMove"
       @mouseleave="handleMouseLeave"
       @touchstart="handleMouseEnter"
       @touchmove="handleMouseMove"
       @touchend="handleMouseLeave">
    <img
        :src="data.img"
        :alt="data.title" :title="data.title">
    <div class="title">{{ data.title }}</div>
    <div class="date">{{ data.date }}</div>
  </div>
</template>

<style scoped lang="scss">

@function set-num($max,$index) {
  @if ($index == 0) {
    @return 0
  } @else {
    @if $index % 2 == 0 {
      @return $max - $index
    }
    @return -$max + $index
  }
}

@mixin keyframe($segments,$maxAngle,$delay,$direction) {
  $name: shake-segm#{$segments}-angle#{$maxAngle}-delay#{$delay}-direction#{$direction};
  animation: $name $delay ease-in-out;

  @keyframes #{$name}{
    @for $i from 0 through $segments {
      #{percentage(calc($i / $segments))} {
        transform: rotate3d(0, 0, 10, #{calc(set-num($segments,$i) / $segments * $maxAngle * $direction)}deg);
      }
    }
  }
}

@mixin generate-shake-classes($maxSegment) {
  @for $i from 3 through $maxSegment {
    .card-shake-#{$i}-l {
      $start-duration: 2000ms;
      $duration-interval: 200ms;
      @include keyframe($i, $i - 1, $start-duration + ($i - 3) * $duration-interval, 1);
    }
    .card-shake-#{$i}-r {
      $start-duration: 2000ms;
      $duration-interval: 200ms;
      @include keyframe($i, $i - 1, $start-duration + ($i - 3) * $duration-interval, -1);
    }
  }
}

@include generate-shake-classes(30);

.picture-card {
  border-radius: 5px;
  width: 200px;
  height: 240px;
  padding: 10px;
  box-sizing: border-box;
  font-family: cursive, serif;
  position: relative;
  transform-origin: 50% 10px;
  box-shadow: 0 7px 8px rgba(0, 0, 0, 0.4);
  background-size: cover;
  background: ghostwhite url("/images/picture-card-bg.jpg") center;
  background-blend-mode: multiply;
  cursor: pointer;

  img {
    width: 180px;
    height: 180px;
    border-radius: 5px;
    -webkit-user-drag: none;
    user-select: none;
  }

  .title {
    font-size: 16px;
    text-align: left;
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 0 2px;
  }

  .date {
    width: 100%;
    font-size: 12px;
    text-align: right;
    color: gray;
    line-height: 1em;
  }

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: -1px -1px 5px 0.5px rgba(0, 0, 0, 0.5) inset;
    filter: drop-shadow(0.3rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5));
    background: red;
  }
}
</style>
