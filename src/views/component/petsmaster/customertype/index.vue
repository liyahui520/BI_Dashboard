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
          <el-button type="primary" @click.native="loadData">{{
            $t("query")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div id="customertype" class="chart" :style="styleClass"></div>
    </el-main>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    styleClass: {
      type: String,
      default: "height:450px;width:400px;margin:auto;padding:100px auto;",
    },
    start: {
      type: String,
      default: "",
    },
    end: {
      type: String,
      default: "",
    },
    showHead: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      headData: [],
      dataList: [],
      months: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      options: [],
      feature:{
        saveAsImage: {
              excludeComponents: ["toolbox"],
              pixelRatio: 2,
            },
      }
    };
  },
  created() {
    var _this = this;
    if (
      (!_this.hasOwnProperty("start") || !_this.hasOwnProperty("end")) &&
      (_this.isNullOrEmpty(_this.end) || _this.isNullOrEmpty(_this.start))
    ) {
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
    } else {
      _this.months.push(_this.start);
      _this.months.push(_this.end);
    }
    _this.loadData();
  },
  methods: {
    isNullOrEmpty(value) {
      return value == null || value == undefined || value == "";
    },
    loadData() {
      var _this = this;
      _this.headData = [];
      _this.dataList = [];
      var params = {
        start: _this.months[0],
        end: _this.months[1],
      };
      _this.$store.dispatch("bi/getCustomerType", params).then((res) => {
        for (let t = 0; t < res.length; t++) {
          const element = res[t];
          _this.headData.push(element.Lable);
          _this.dataList.push({ value: element.Value, name: element.Lable });
        }
        _this.$nextTick(function () {
          _this.initECharts();
        });
      });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("customertype"));
      _this.chart.setOption({
        color: ["#ff2d2d", "#fcbd62", "#37A2DA"],
        title: {
          text: "新老顾客",
          left:_this.showHead? "center":"left",
        },
        toolbox: {
          show: true,
          feature: (_this.showHead?_this.feature:{}),
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: _this.showHead?"left":"right",
          data: _this.headData,
        },
        series: [
          {
            name: "新老顾客",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: _this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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