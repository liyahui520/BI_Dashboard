<template>
  <div
    id="echartsex"
    class="chart"
    style="height:600px;width:600px;margin:auto;padding:100px auto;"
  ></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
      headData: [],
      dataList: []
    };
  },
  created() {
    var _this = this;
    _this.loadData();
  },
  methods: {
    loadData() {
      var _this = this;
      _this.$store.dispatch("bi/getBiGender").then(res => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.headData.push(element.Gender);
          _this.dataList.push({ value: element.PCount, name: element.Gender });
        }
        _this.$nextTick(function() {
          _this.initECharts();
        });
      });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartsex"));
      _this.chart.setOption({
        color: ["#67E0E3", "#ff9f7f", "#37A2DA"],
        title: {
          text: "性别比例",
          left: "center"
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: _this.headData
        },
        series: [
          {
            name: "性别比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data:_this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
</style>