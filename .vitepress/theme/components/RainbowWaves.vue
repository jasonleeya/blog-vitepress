<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="rainbow">
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  width: 100%;
  height: 100%;
  z-index: 9;
}
@keyframes wave {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.rainbow {
  --stripes: repeating-linear-gradient(
          100deg,
          #fff 0%,
          #fff 7%,
          transparent 10%,
          transparent 12%,
          #fff 16%
  );
  --stripesDark: repeating-linear-gradient(
          100deg,
          #000 0%,
          #000 7%,
          transparent 10%,
          transparent 12%,
          #000 16%
  );
  --rainbow: repeating-linear-gradient(
          100deg,
          #60a5fa 10%,
          #e879f9 15%,
          #60a5fa 20%,
          #5eead4 25%,
          #60a5fa 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-attachment: fixed;
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: blur(10px) invert(100%);

  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);

  pointer-events: none;
}

.rainbow::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  animation: wave 60s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
}

.dark .rainbow {
  background-image: var(--stripesDark), var(--rainbow);
  filter: blur(10px) opacity(50%) saturate(200%);
}

.dark .rainbow::after {
  background-image: var(--stripesDark), var(--rainbow);
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #fff;
  transition: background-color .5s;
}

.rainbow {
  position: absolute;
  inset: -10px;
  opacity: 50%;
}
</style>
