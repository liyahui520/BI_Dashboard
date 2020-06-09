<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-radio v-model="monthOrDay" label="1" border size="medium">月份</el-radio>
          <el-radio v-model="monthOrDay" label="2" border size="medium">日期</el-radio>
        </el-form-item>
        <el-form-item label="月份" v-show="monthOrDay=='1'">
          <el-date-picker
            v-model="months"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="日期" v-show="monthOrDay=='2'">
          <el-date-picker
            v-model="days"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.native="searchData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <div id="echartsconsumenumber" class="chart" style="height:600px;width:1300px;margin:auto;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
      months: [],
      days: [],
      monthOrDay: "1"
    };
  },
  mounted() {
    var _this = this;
    _this.initECharts();
  },
  methods: {
    searchData() {
      var _this = this;
      var type = "1";
      if (_this.monthOrDay == "1" && _this.months[0] == _this.months[1]) {
        _this.$message({
          showClose: true,
          message: "开始月份不能等于结束月份",
          type: "warning"
        });
        return;
      } else if (_this.monthOrDay == "2") {
        type = _this.days[0] != _this.days[1] ? "2" : "3";
      }
      console.log("status", type);
      console.log("values1", _this.months);
      console.log("values2", _this.days);
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(
        document.getElementById("echartsconsumenumber")
      );
      _this.chart.setOption({
        color: ["#67E0E3"],
        title: {
          text: "消费频次",
          left: "center"
        },
        toolbox: {
          show: true,
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
          // formatter:'{b}<br />{a0}: {c0}<br />占比: {a}%'
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              params[0].seriesName +
              ":" +
              params[0].value +
              "<br/>" +
              "占比:" +
              params[0].data +
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
            data: ["70后", "80后", "90后", "00后"],
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
            name: "年龄分布",
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
            data: [10, 52, 200, 334]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>