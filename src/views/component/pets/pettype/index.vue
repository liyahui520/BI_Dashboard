<template>
  <div>
    <!-- 表单区域 -->
    <el-header v-if="showHead">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="统计周期">
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
          <el-button type="primary" @click.native="loadAgeData">{{
            $t("query")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div id="echartspettype" class="chart" :style="styleClass"></div>
    </el-main>
  </div>
  
</template>
<script>
import echarts from "echarts";
export default {
  props:{
    showHead:{
      type:Boolean,
      default:false
    },
    styleClass:{
      type:String,
      default:'height: 600px; width: 800px; margin: auto;'
    }
  },
  data() {
    return {
      chart: null,
      headData: [],
      dataList: [],
      params: {},
      count:0,
      feature:{
        saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2,
            },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
      },
      months: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      options: [],
    };
  },
  created() {
    var _this = this;
    _this.loadAgeData();
  },
  methods: {
    loadAgeData() {
      var _this = this;
      _this.handleDate();
      _this.headData=[];
      _this.dataList=[];
      _this.count=0;
      var params={
        start:_this.months[0],
        end:_this.months[1]
      };
      _this.$store.dispatch("bi/getPPetsKindOF", params).then((res) => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.headData.push(element.Lable);
          _this.dataList.push({
            value: element.Value,
            name: element.Lable,
            percentNum: element.KindOF,
          });
          _this.count+=element.Value;
        }
        _this.$nextTick(function () {
          _this.initECharts();
        });
      });
    },
    handleDate() {
      var _this=this;
      _this.months=[];
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1; //0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      dateObj.end = year + "-" + month + "-" + day;
      var nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
      if (month - 1 <= 0) {
        //如果是1月，年数往前推一年<br>
        dateObj.start = year - 1 + "-" + 12 + "-" + day;
      } else {
        var lastMonthDay = new Date(year, parseInt(month) - 1, 0).getDate();
        if (lastMonthDay < day) {
          //1个月前所在月的总天数小于现在的天日期
          if (day < nowMonthDay) {
            //当前天日期小于当前月总天数
            dateObj.start =
              year +
              "-" +
              (month - 1) +
              "-" +
              (lastMonthDay - (nowMonthDay - day));
          } else {
            dateObj.start = year + "-" + (month - 1) + "-" + lastMonthDay;
          }
        } else {
          dateObj.start = year + "-" + (month - 1) + "-" + day;
        }
      }
      _this.months.push(dateObj.start);
      _this.months.push(dateObj.end);
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartspettype"));
      _this.chart.setOption({
        color: ["#d446d4"],
        title: {
          text: "宠物种类",
          left:_this.showHead? "center":"left",
        },
        toolbox: {
          show: true,
          feature: _this.showHead?_this.feature:{},
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            return (
              params[0].name +
              "<br/>数量：" +
              params[0].value +
              "<br/>" +
              "占比："+((params[0].value/_this.count)*100).toFixed(2)+"%<br/>"
            );
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: _this.headData,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "60%",
            label: {
              rich: {
                name: {
                  textBorderColor: "#fff",
                },
              },
              normal: {
                show: true,
                position: "top",
                color: "#666666",
              },
            },
            data: _this.dataList,
            animationDuration: 3000,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>