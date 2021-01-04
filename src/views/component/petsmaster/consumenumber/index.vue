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
              :label="item.name+'('+item.cellphone+')'"
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
      <div id="echartsconsumenumber" class="chart" :style="styleClass"></div>
    </el-main>
    <div class="remark" v-if="showHead">
      注：
      <br />1、消费频次：默认显示所有客户的消费频次统计
    </div>
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
      default:'height:600px;width:1300px;margin:auto;'
    }
  },
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
      options: [],
      feature:{
        saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
      }
    };
  },
  created() {
    var _this = this;
    _this.handleDate();
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
    handleDate(){
      var _this=this;
      _this.months=[];
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;//0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      dateObj.end = year + '-' + month + '-' + day; 
      var nowMonthDay = new Date(year, month, 0).getDate();    //当前月的总天数
      if(month - 1 <= 0){ //如果是1月，年数往前推一年<br>　　　　 
          dateObj.start = (year - 1) + '-' + 12 + '-' + day;
      }else{
          var lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();  
          if(lastMonthDay < day){    //1个月前所在月的总天数小于现在的天日期
              if(day < nowMonthDay){        //当前天日期小于当前月总天数
                  dateObj.start = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day));
              }else{
                  dateObj.start = year + '-' + (month - 1) + '-' + lastMonthDay;
              }
          }else{
              dateObj.start = year + '-' + (month - 1) + '-' + day;
          }
      }
      _this.months.push(dateObj.start);
      _this.months.push(dateObj.end);
      _this.loadNumData();
    },
    searchData(){
      var _this=this;
      _this.loadNumData();
    },
    loadNumData() {
      var _this = this;
      _this.headData = [];
      _this.dataList = [];
      console.log("消费频次请求的参数为",{
          start: _this.months[0],
          end: _this.months[1],
          pcuid: _this.pcuid == "" ? -1 : _this.pcuid
        })
      _this.$store
        .dispatch("bi/getCpaymentNum", {
          start: _this.months[0],
          end: _this.months[1],
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
          console.log("请求的错误数据为",err)
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
        color: ["#524afd"],
        title: {
          text: "消费频次",
          left:_this.showHead? "center":"left"
        },
        toolbox: {
          show: true,
          feature:(_this.showHead?_this.feature:{}),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var result = `消费次数：${params[0].value}<br/>账单金额：${params[0].data.totalAmount}<br/>实付金额：${params[0].data.actlyPayed}`;
            return result;
          },
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
            barWidth: "20%",
            label: {
              rich: {
                name: {
                  // textBorderColor: "#fff"
                }
              },
              normal: {
                show: true,
                position: "top",
                color: "#666666"
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
.remark {
  color: red;
  font-size: 14px;
}
</style>