<template>
  <div id="echartssource" class="chart" style="height:600px;width:800px;margin:auto;"></div>
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
    _this.loadSourceData();
  },
  //   mounted() {
  //     var _this = this;
  //     _this.initECharts();
  //   },
  methods: {
    //加载年龄数据
    loadSourceData() {
      var _this = this;
      _this.$store.dispatch("bi/getCustomerSource").then(res => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.headData.push(element.Pname);
          _this.dataList.push({
            value: element.PCount,
            name: element.Pname,
            percentNum: element.PercentNum
          });
        }
        // console.log("请求客户来源数据结果为", res);
        _this.$nextTick(function() {
          _this.initECharts();
        });
      });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartssource"));
      _this.chart.setOption({
        title: {
          text: "客户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
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
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          boundaryGap: [0, 0.05]
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          },
          data: _this.headData
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              formatter: function(params) {
                return params.value + "（" + params.data.percentNum + "）";
              }
            },
            data: _this.dataList
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>