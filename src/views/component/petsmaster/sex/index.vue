<template>
<div>
    <el-main>
        <div
    id="echartsex"
    class="chart"
    style="height:450px;width:450px;margin:auto;padding:100px auto;"
  ></div>
    </el-main>
</div>

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
        color: ["#524afd", "#04b3e8", "#fcbd62"],
        title: {
          text: "性别比例",
          left: "left"
        },
        toolbox: {
          show: true,
          feature: {
            // 控制右侧的下载转换等
            // saveAsImage: {
            //   excludeComponents: ["toolbox"],
            //   pixelRatio: 2
            // }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
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
            },
            animationDuration: 3000,
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
</style>