<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <h1>宠物宠主统计</h1>
      <line-chart :chart-data="lineChartData" />
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

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

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
      lineChartData: lineChartData.newVisitis,
      params: {},
    };
  },
  created(){
    this.handleDate();
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
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
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
