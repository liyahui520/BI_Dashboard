<template>
<div>
    <el-main>
      <div id="echartsage" class="chart" style="height:450px;width:450px;margin:auto;padding:200px auto;"></div>
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
  created(){
    var _this=this;
    _this.loadAgeData();
  },
  // mounted() {
  //   var _this = this;
  //   _this.initECharts();
  // },
  methods: {
    //加载年龄数据
    loadAgeData(){
      var _this=this;
      _this.$store.dispatch("bi/getBirthDatePercent").then(res => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.headData.push(element.Pname);
          _this.dataList.push({ value: element.PCount, name: element.Pname,percentNum:element.PercentNum });
        }
        _this.$nextTick(function() {
          _this.initECharts();
        });
      });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartsage"));
      _this.chart.setOption({
        color: ["#04b3e8"],
        title: {
          text: "年龄分布",
          left: "left"
        },
        toolbox: {
          show: true,
          feature: {
            // 控制右侧转换下载等
            // saveAsImage: {
            //   show: true,
            //   excludeComponents: ["toolbox"],
            //   pixelRatio: 2
            // },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function(params){
            return params[0].name+"<br/>数量："+params[0].value+"<br/>"+"占比："+params[0].data["percentNum"]+"<br/>";
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
            data: _this.headData,
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
                color:"#666666"
              }
            },
            data: _this.dataList,
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