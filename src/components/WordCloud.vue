<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
// 1.初始化echarts实例
let mChart = null;
const target = ref(null);
const props = defineProps({
  data: {
    type: Object,
    requeire: true,
  },
});
const randomRgb = ()=>{
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
// 2.构建option配置对象
const renderChart = () => {
  const options = {
    series:[
        {
            type:'wordCloud',
            sizeRange:[8,40],
            rotationRange:[0,0],
            girdSize:0,
            layoutAnimation:true,
            textStyle:{
                color:randomRgb
            },
            emphasis:{
                textStyle:{
                    fontWeight:'bold',
                    color:'#000'
                }
            },
            data:props.data.datas
        }
    ]
  };
  // 3..setoption
  mChart.setOption(options);
};

watch(() => props.data, renderChart);
</script>

<style lang="scss" scoped></style>
