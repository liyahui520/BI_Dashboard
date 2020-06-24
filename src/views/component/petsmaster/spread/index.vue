<template>
  <div class="content app-container">
    <el-card style="width:49%">
      <div id="echartsage" class="chart" style="height:600px;width:100%;margin:auto;"></div>
    </el-card>
    <el-card style="width:49%">
      <div id="echartsex" class="chart" style="height:600px;width:100%;margin:auto;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      agechart: null,
      ageheadData: [],
      agedataList: [],
      sexchart: null,
      sexheadData: [],
      sexdataList: []
    };
  },
  created() {
    var _this = this;
    _this.loadAgeData();
    _this.loadSexData();
  },
  methods: {
    //加载年龄数据
    loadAgeData() {
      var _this = this;
      _this.$store.dispatch("bi/getBirthDatePercent").then(res => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.ageheadData.push(element.Pname);
          _this.agedataList.push({
            value: element.PCount,
            name: element.Pname,
            percentNum: element.PercentNum
          });
        }
        _this.$nextTick(function() {
          _this.initAgeECharts();
        });
      }).catch(err => {
          _this.$message({
            message: "年龄分布数据加载失败，请稍后重试",
            type: "error"
          });
        });
    },
    loadSexData() {
      var _this = this;
      _this.$store.dispatch("bi/getBiGender").then(res => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.sexheadData.push(element.Gender);
          _this.sexdataList.push({
            value: element.PCount,
            name: element.Gender
          });
        }
        _this.$nextTick(function() {
          _this.initSexECharts();
        });
      }).catch(err => {
          _this.$message({
            message: "性别比例数据加载失败，请稍后重试",
            type: "error"
          });
        });
    },
    initAgeECharts() {
      var _this = this;
      _this.agechart = echarts.init(document.getElementById("echartsage"));
      _this.agechart.setOption({
        color: ["#67E0E3"],
        title: {
          text: "年龄分布",
          left: "center"
        },
        toolbox: {
          show: true,
          right: "100",
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>数量：" +
              params[0].value +
              "<br/>" +
              "占比：" +
              params[0].data["percentNum"] +
              "<br/>"
            );
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _this.ageheadData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "60%",
            label: {
              rich: {
                name: {
                  textBorderColor: "#fff"
                }
              },
              normal: {
                show: true,
                position: "top",
                color: "#666666"
              }
            },
            data: _this.agedataList
          }
        ]
      });
    },
    initSexECharts() {
      var _this = this;
      _this.sexchart = echarts.init(document.getElementById("echartsex"));
      _this.sexchart.setOption({
        color: ["#67E0E3", "#ff9f7f", "#37A2DA"],
        title: {
          text: "性别比例",
          left: "center"
        },
        toolbox: {
          show: true,
          right: "100",
          feature: {
            saveAsImage: {
              excludeComponents: ["toolbox"],
              pixelRatio: 2
              //   padding: [10, 100, 0, 0]
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
          data: _this.sexheadData,
          padding: [10, 30, 0, 100]
        },
        series: [
          {
            name: "性别比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: _this.sexdataList,
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
.content {
  display: flex;
  justify-content: space-around;
}
</style>