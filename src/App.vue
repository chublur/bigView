<template>
  <div
    class="bg-[url('assets/images/bg.png')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
  >
    <!-- 左 -->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- ANCHOR - 横向柱状图 -->
      <HorizontalBar
        :data="data.regionData"
        class="h-1/3 box-border pb-4"
      ></HorizontalBar>
      <!-- ANCHOR - 雷达图 -->
      <RadarBar :data="data.riskData" class="h-1/3 box-border pb-4"></RadarBar>
      <!-- ANCHOR - 关系图 -->
      <Relation :data="data.relationData" class="h-1/3"></Relation>
    </div>
    <!-- 中 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <!-- ANCHOR - 数据总览 -->
      <TotalData :data="data.totalData" class="bg-opacity-50 bg-slate-800 p-3"></TotalData>
      <!-- ANCHOR - 地图可视化 -->
      <MapChart :data="data.mapData" class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1"></MapChart>
    </div>
    <!-- 右 -->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- ANCHOR - 竖向柱状图 -->
      <VerticalBar
        :data="data.verData"
        class="h-1/3 box-border pb-4"
      ></VerticalBar>
      <!-- ANCHOR - 环形图 -->
      <RingBar :data="data.abnormalData" class="h-1/3 box-border pb-4"></RingBar>
      <!-- ANCHOR - 文档云图 -->
      <WordCloud :data="data.wordCloudData" class="h-1/3"></WordCloud>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import HorizontalBar from "@/components/HorizontalBar.vue";
import VerticalBar from "@/components/VerticalBar.vue";
import MapChart from "@/components/MapChart.vue";
import Relation from "@/components/Relation.vue";
import RingBar from "@/components/RingBar.vue";
import TotalData from "@/components/TotalData.vue";
import WordCloud from "@/components/WordCloud.vue";
import RadarBar from "@/components/RadarBar.vue";
// import { getVisualization } from "@/api/index.js";

const data = ref([]);
// 本地mock数据
import mockData from "./utils/mockData";
let _mockData = reactive(mockData);

// const getData = async() => {
//   data.value = await getVisualization()
// };

function getData() {
  data.value = _mockData;
}
getData();
setInterval(() => {
  getData();
}, 3000);
</script>

<style lang="scss" scoped></style>
