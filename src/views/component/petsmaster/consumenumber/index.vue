<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="月份">
          <el-date-picker
            v-model="months"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      start:'',
      end:''
    };
  },
  created(){
    var _this=this;
    // _this.handDefultDate();
  },
  mounted() {
    var _this = this;
    // _this.searchData();
  },
  methods: {
    handDefultDate(){
      var _this=this;
      var currentDate=new Date();
      var year=currentDate.getFullYear();
      var month=currentDate.getMonth();
      var day=currentDate.getDate();
      var start=`${year}-${((month+1)<10?'0'+(month+1):(month+1))}-01`;
      currentDate.setMonth(month+1);
      var endMonth=currentDate.getMonth();
      var end=`${year}-${(endMonth<10?'0'+endMonth:endMonth)}-01`;
      var endTwo=`${year}-${((endMonth+1)<10?'0'+(endMonth+1):(endMonth+1))}-01`;
      console.log("开始日期为",start);
      console.log("结束日期为",end);
      _this.start=start;
      _this.end=endTwo;
      _this.months.push(start)
      _this.months.push(end)
      console.log("实际传输的值为",_this.start,_this.end)
    },
    searchData() {
      var _this = this;
      var endDate = _this.months[1];
      var newend = new Date(endDate);
      newend.setMonth(newend.getMonth() + 1 + 1);
      var month = newend.getMonth() == 0 ? 12 : newend.getMonth();
      month = month < 10 ? "0" + month : month;
      var getDate = newend.getDate();
      getDate = getDate < 10 ? "0" + getDate : getDate;
      var endDateTwo = `${newend.getFullYear()}-${month}-${getDate}`;
      _this.start=_this.months[0];
      _this.end=endDateTwo
      _this.loadNumData();
    },
    loadNumData() {
      var _this = this;
      console.log("接口调用之前传输的数据为",{
          start: _this.start,
          end: _this.end
        });
      _this.$store
        .dispatch("bi/getCpaymentNum", {
          start: _this.start,
          end: _this.end
        })
        .then(res => {
          console.log("请求消费频次的数据为",res)


        });
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