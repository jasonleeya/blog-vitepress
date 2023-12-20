<script setup lang="ts">
import {ref} from "vue";
import PictureCard from "@components/PictureCard.vue";
import {useIsMobile} from "@/hooks/useIsMobile.mjs";

const workList = ref<Work[]>([
  {
    id: 1,
    title: "作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 2,
    title: "作品作品作品作品作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 3,
    title: "作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc0ODZ8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 4,
    title: "作品作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1Mjl8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 5,
    title: "作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1583506140156-6e343f045b81?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1OTV8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 26,
    title: "作品作品作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1493130952181-47e36589f64d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc2NTJ8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 7,
    title: "作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1514519334989-3d5c8b1a9f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTk0NzR8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 8,
    title: "作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1589517628174-5698bcf47311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTk4MTd8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 9,
    title: "作品作品作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1509803874385-db7c23652552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMzMDAwMDh8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 10,
    title: "作品作品作品作品作品作品作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1563846465145-c733e29ee0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMzMDA5MDV8&ixlib=rb-4.0.3&q=100&w=500",
  },
  {
    id: 11,
    title: "作品作品",
    date: "2023/12/18",
    img: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&q=100&w=jpg&crop=entropy&cs=srgb&w=500",
  },
])
workList.value = [...workList.value, ...workList.value]

const isMobile = useIsMobile()
const countPerRow = Math.ceil(workList.value.length / 2)
const cardsBoxWidth = ref(countPerRow * 200 + (countPerRow + 1) * 80)
</script>

<template>
  <el-scrollbar :height="`calc(100vh - var(--vp-nav-height))`" v-if="!isMobile">
    <div class="cards">
      <picture-card :data="item" v-for="(item,index) in workList"
                    :key="index"></picture-card>
    </div>
  </el-scrollbar>
  <el-scrollbar v-else>
    <div class="cards-mobile" :style="{width:cardsBoxWidth+'px'}">
      <picture-card :data="item" v-for="(item,index) in workList" :key="index"></picture-card>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
@import "../styles/mixins.scss";

.cards, .cards-mobile {
  background-image: url("/images/wall.png");
  background-size: 500px;
  background-position: 0 0;
  background-repeat: repeat;
  background-blend-mode: hard-light;
  display: grid;
  align-items: center;
  justify-items: center;
}

.cards {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 240px;
  gap: 80px;
  padding: 80px 10%;
}

.cards-mobile {
  height: calc(100vh - var(--vp-nav-height));
  //width: 8000px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  overflow-y: hidden;
  padding: 40px 80px;
  column-gap: 80px;
  grid-auto-flow: column;
}
</style>
