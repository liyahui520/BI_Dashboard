<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chartData="chartData" :headData="headData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <age />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <sex />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <customertype
            :styleClass="'height:450px;width:450px;margin:auto;padding:100px auto;'"
            :showHead="false"
            :start="params.start"
            :end="params.end"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
         <sourceCom :showHead="false" :styleClass="'height:450px;width:450px;margin:auto;'"  />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <consumenumber :showHead="false" :styleClass="'height:450px;width:450px;margin:auto;'"  />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
         <pettype :showHead="false" :styleClass="'height:450px;width:450px;margin:auto;padding:100px auto;'"  />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import spread from "../../component/petsmaster/spread/index";
import age from "../../component/petsmaster/age/index";
import sex from "../../component/petsmaster/sex/index";
import customertype from "../../component/petsmaster/customertype/index";
import sourceCom from '../../component/petsmaster/source/index';
import consumenumber from '../../component/petsmaster/consumenumber/index';
import pettype from '../../component/pets/pettype/index';

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    spread,
    LineChart,
    age,
    sex,
    customertype,
    sourceCom,
    consumenumber,
    pettype
  },
  data() {
    return {
      chartData:{
        newData:[],
        oldData:[]
      },
      params: {},
      headData:[],
    };
  },
  created(){
    this.handleDate();
    this.loadLineData();
  },
  methods: {
    handleDate() {
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
      this.params = dateObj;
      
    },
    loadLineData(){
      var _this = this;
      _this.headData = [];
      _this.chartData={
        newData:[],
        oldData:[]
      };
      _this.$store.dispatch("bi/getReportNewAndOld").then(res => {
        _this.loading = false;
        
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          _this.headData.push(element.DayTime);
          _this.chartData.newData.push(element.NewCount)
          _this.chartData.oldData.push(element.OldCount)
        }
      }).catch(err => {
          _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          _this.loading = false;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px 30px 0px 30px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
