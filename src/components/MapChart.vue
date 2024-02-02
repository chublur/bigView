<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import * as echarts from "echarts";
import mapJson from "../assets/json/china.json";

// 1.初始化echarts实例
let mChart = null;
const target = ref(null);
const props = defineProps({
  data: {
    type: Object,
    requeire: true,
  },
});
onMounted(() => {
  // 注册地图
  echarts.registerMap("china", mapJson);
  mChart = echarts.init(target.value);
  renderChart();
});
// 2.构建option配置对象
const renderChart = () => {
  const options = {
    // 时间线
    timeline: {
      data: props.data.voltageLevel,
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      right: "10%",
      left: "10%",
      bottom: "0%",
      width: "80%",
      label: {
        normal: {
          textStyle: {
            color: "#ddd",
          },
        },
        emphasis: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      symbolSize: 10,
      lineStyle: {
        color: "#eee200",
      },
      checkpointStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: "#666",
          borderColor: "#eee200",
        },
        emphasis: {
          color: "#aaa",
          borderColor: "#eee200",
        },
      },
    },
    // 柱形图
    baseOption: {
      grid: {
        right: "2%",
        top: "15%",
        bttom: "10%",
        width: "20%",
      },
      // 地图配置
      geo: {
        show: true,
        map: "china",
        roam: true,
        zoom: 1,
        center: [113.83531246, 34.0267395887],
        label: {
          show: false,
          textStyle: {
            color: "transparent",
          },
          emphasis: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(147,235,248,1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                //地图渐变色
                {
                  offset: 0,
                  color: "rgba(147,235,248,0)",
                },
                {
                  offset: 1,
                  color: "rgba(147,235,248,.2)",
                },
              ],
            },
          },
          emphasis: {
            areaColor: "#389BB7",
            borderColor: 0,
          },
        },
      },
    },
    options: [],
  };

  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroundColor: "#142037",
      title: [
        {
          text: "2020-2024 年度数据统计",
          left: "0%",
          top: "0%",
          textStyle: {
            color: "#ccc",
            conSize: 30,
          },
        },
        {
          id: "statustic",
          text: item + "年度数据统计情况",
          right: "0%",
          top: "4%",
          textStyle: {
            color: "#fff",
            fontSize: 20,
          },
        },
      ],
      xAxis: {
        type: "value",
        scale: true,
        position: "top",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: "#aaa",
          },
        },
      },
      yAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#ddd",
          },
        },
        data: props.data.categoryData[item].map((item) => item.name),
      },
      series: [
        {
          type: "bar",
          z: 1.5,
          itemStyle: {
            normal: {
              color: props.data.colors[index],
            },
          },
          data: props.data.categoryData[item].map((item) => item.value),
        },
      ],
    });
  });
  // 3..setoption
  mChart.setOption(options);
};

watch(() => props.data, renderChart);
</script>

<style lang="scss" scoped></style>
