<!--用于写文章时的测试组件-->
<script setup>
import {onMounted, ref} from "vue";

const surfaceScale = ref(10)
const diffuseAndSpecularConstant = ref(1)
const specularExponent = ref(0)
const azimuth = ref(140)
const elevation = ref(20)
const x = ref(260)
const y = ref(2)
const z = ref(30)
const pointsAtX = ref(290)
const pointsAtY = ref(80)
const pointsAtZ = ref(0)
const limitingConeAngle = ref(0)
</script>

<template>
  <ClientOnly>
    <el-card class="card">
      <svg height="130" width="120">
        <defs>
          <radialGradient id="gradient">
            <stop offset="0" stop-color="red" stop-opacity="0"/>
            <stop offset=".5" stop-color="red" stop-opacity="1"/>
            <stop offset="1" stop-color="red" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="70" cy="50" fill="url(#gradient)" r="50"/>
        <text font-size="12" x="50" y="115">无光照</text>
      </svg>
      <svg height="340" width="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient">
            <stop offset="0" stop-color="red" stop-opacity="0"/>
            <stop offset=".5" stop-color="red" stop-opacity="1"/>
            <stop offset="1" stop-color="red" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <filter id="lightMe1">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <fePointLight :x="x" :y="y" :z="z" :limiting-cone-angle="limitingConeAngle"/>
          </feDiffuseLighting>
        </filter>

        <filter id="lightMe2">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <feDistantLight :azimuth="azimuth" :elevation="elevation" :limiting-cone-angle="limitingConeAngle"/>
          </feDiffuseLighting>
        </filter>

        <filter id="lightMe3">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <feSpotLight :pointsAtX="pointsAtX" :pointsAtY="pointsAtY" :pointsAtZ="pointsAtZ" :x="x"
                         :y="y" :z="z" limitingConeAngle="20" :limiting-cone-angle="limitingConeAngle"/>
          </feDiffuseLighting>
        </filter>

        <filter id="lightMe21">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <fePointLight :x="x" :y="y" :z="z" :limiting-cone-angle="limitingConeAngle"/>
          </feSpecularLighting>
        </filter>

        <filter id="lightMe22">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <feDistantLight :azimuth="azimuth" :elevation="elevation"  :limiting-cone-angle="limitingConeAngle"/>
          </feSpecularLighting>
        </filter>

        <filter id="lightMe23">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <feSpotLight :pointsAtX="pointsAtX" :pointsAtY="pointsAtY" :pointsAtZ="pointsAtZ" :x="x"
                         :y="y" :z="z" limitingConeAngle="20" :limiting-cone-angle="limitingConeAngle"/>
          </feSpecularLighting>
        </filter>
        <text font-weight="900" x="10" y="15">feDiffuseLighting 漫反射</text>
        <circle cx="70" cy="80" fill="url(#gradient)" filter="url(#lightMe1)"
                r="50"/>
        <text font-size="12" x="10" y="155">fePointLight 点光源</text>

        <circle cx="200" cy="80" fill="url(#gradient)" filter="url(#lightMe2)"
                r="50"/>
        <text font-size="12" x="140" y="155">feDistantLight 远光源</text>

        <circle cx="330" cy="80" fill="url(#gradient)" filter="url(#lightMe3)"
                r="50"/>
        <text font-size="12" x="270" y="155">feSpotLight 聚光灯</text>

        <text font-weight="900" x="10" y="180">feSpecularLighting 镜面反射</text>

        <circle cx="70" cy="250" fill="url(#gradient)" filter="url(#lightMe21)"
                r="50"/>

        <text font-size="12" x="10" y="325">fePointLight 点光源</text>

        <circle cx="200" cy="250" fill="url(#gradient)" filter="url(#lightMe22)"
                r="50"/>

        <text font-size="12" x="140" y="325">feDistantLight 远光源</text>

        <circle cx="330" cy="250" fill="url(#gradient)" filter="url(#lightMe23)"
                r="50"/>

        <text font-size="12" x="270" y="325">feSpotLight 聚光灯</text>
      </svg>

      <div style="display:flex;flex-wrap: wrap;gap:20px;width: 500px">
        <div>
          <p>surfaceScale</p>
          <el-slider v-model="surfaceScale" :max="100" :min="0" style="width: 200px"/>
        </div>

        <div>
          <p>diffuseConstant/specularConstant</p>
          <el-slider v-model="diffuseAndSpecularConstant" :max="2" :min="0" :step="0.01" style="width: 200px"/>
        </div>

        <div>
          <p>feSpecularLighting的specularExponent</p>
          <el-slider v-model="specularExponent" :max="10" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feDistantLight的azimuth</p>
          <el-slider v-model="azimuth" :max="180" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feDistantLight的elevation</p>
          <el-slider v-model="elevation" :max="180" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的x</p>
          <el-slider v-model="x" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的y</p>
          <el-slider v-model="y" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的z</p>
          <el-slider v-model="z" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的x</p>
          <el-slider v-model="pointsAtX" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的y</p>
          <el-slider v-model="pointsAtY" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的z</p>
          <el-slider v-model="pointsAtZ" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>limitingConeAngle</p>
          <el-slider v-model="limitingConeAngle" :max="90" :min="0" :step="0.01" style="width: 200px"/>
        </div>
      </div>
    </el-card>
  </ClientOnly>
</template>

<style lang="scss" scoped>

</style>
