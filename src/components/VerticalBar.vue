<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted ,watch} from "vue";
import * as echarts from "echarts";

let mChart = null;
const target = ref(null);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});

onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const options = {
    // x轴展示数据
    xAxis: {
      type: "category",
      data: props.data.servers.map((item) => item.name),
      axisLabel: { color: "#9eb1c8" },
    },
    // y轴展示数据
    yAxis: {
      show: false,
      type: "value",
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
    },
    // 图标绘制的位置
    grid: {
      top: 16,
      right: 10,
      bottom: 26,
      left: -20,
      containLabel: true,
    },
    // 核心配置
    series: [
      {
        type: "bar",
        data: props.data.servers.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          color: "#479ad3",
          barBorderRadius: 5,
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 5,
        },
        barWidth: 12,
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#fff",
          },
          formatter: "{c}%",
        },
      },
    ],
  };
  mChart.setOption(options);
};

watch(()=>props.data,renderChart)
</script>

<style lang="scss" scoped></style>
