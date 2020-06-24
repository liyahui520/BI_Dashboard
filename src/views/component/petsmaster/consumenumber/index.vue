<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
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
        <el-form-item label="客户姓名">
          <el-select
            v-model="pcuid"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="姓名或手机号"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="searchData"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.native="searchData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div id="echartsconsumenumber" class="chart" style="height:600px;width:1300px;margin:auto;"></div>
    </el-main>
    <div class="remark">
      注：
      <br/>1、消费频次：默认显示所有客户的消费频次统计
    </div>
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
      start: "",
      end: "",
      headData: [],
      dataList: [],
      loading: false,
      pcuid: "",
      options: []
    };
  },
  created() {
    var _this = this;
    _this.handDefultDate();
  },
  methods: {
    //远程方法
    remoteMethod(query) {
      var _this = this;
      if (query !== "") {
        _this.$store
          .dispatch("user/getUserList", query)
          .then(res => {
            _this.options = res;
          })
          .catch(err => {
            _this.$message({
              message: "客户数据加载失败，请稍后重试",
              type: "error"
            });
          });
      } else {
        this.options = [];
      }
    },
    handDefultDate() {
      var _this = this;
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth();
      var day = currentDate.getDate();
      var start = `${year}-${
        month + 1 < 10 ? "0" + (month + 1) : month + 1
      }-01`;
      currentDate.setMonth(month + 1);
      var endMonth = currentDate.getMonth();
      var end = `${year}-${endMonth < 10 ? "0" + endMonth : endMonth}-01`;
      var endTwo = `${year}-${
        endMonth + 1 < 10 ? "0" + (endMonth + 1) : endMonth + 1
      }-01`;
      _this.start = start;
      _this.end = endTwo;
      _this.months.push(start);
      _this.months.push(end);
      _this.searchData();
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
      _this.start = _this.months[0];
      _this.end = endDateTwo;
      _this.loadNumData();
    },
    loadNumData() {
      var _this = this;
      _this.headData = [];
      _this.dataList = [];
      _this.$store
        .dispatch("bi/getCpaymentNum", {
          start: _this.start,
          end: _this.end,
          pcuid: _this.pcuid == "" ? -1 : _this.pcuid
        })
        .then(res => {
          for (let t = 0; t < res.length; t++) {
            const element = res[t];
            _this.headData.push(element.DateTime);
            _this.dataList.push({
              value: element.Count, //总单数
              name: element.DateTime,
              actlyPayed: element.ActlyPayed,
              totalAmount: element.TotalAmount
            });
          }
          _this.$nextTick(function() {
            _this.initECharts();
          });
        })
        .catch(err => {
          _this.$message({
            message: "消费频次数据加载失败，请稍后重试",
            type: "error"
          });
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
          formatter: function(params) {
            var result = `消费次数：${params[0].value}<br/>账单金额：${params[0].data.totalAmount}<br/>实付金额：${params[0].data.actlyPayed}`;
            return result;
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
            data: _this.dataList
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.remark{
  color: red;
  font-size: 14px;
}
</style>