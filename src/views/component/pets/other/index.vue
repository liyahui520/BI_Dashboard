<template>
  <div class="petsCat">
    <el-main class="mainClass">
      <!-- <div> -->
        <el-table
          :data="this.lableData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          align="left"
          style="height:100%;overflow:hidden;"
          :header-cell-style="{background:'#FAFAFA',color:'#606266'}"
        >
          <span v-for="(item1,index1) in data" :key="index1">
            <el-table-column v-if="item1!='品种'" :prop="item1" sortable  :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
            <el-table-column v-else :prop="item1" fixed="left" sortable :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
          </span>
        </el-table>
      <!-- </div> -->

      <!-- <div v-if="isHasData" class="echartClass">
        <div
          id="echartother"
          class="chart"
          style="height:600px;width:600px;margin:auto;padding:100px auto;"
        ></div>
      </div> -->
    </el-main>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      data: [],
      lableData: [],
      loading: false,
      chart: null,
      headData: [],
      dataList: [],
      isHasData: false
    };
  },
  created() {
    var _this = this;
    _this.loadPetsData();
  },
  methods: {
    //获取目录信息
    loadPetsData: function() {
      var _this = this;
      _this.data = [];
      _this.lableData = [];
      _this.dataList = [];
      _this.loading = true;
      _this.$store.dispatch("bi/getPetFrom", { type: 3 }).then(res => {
        _this.loading = false;
        _this.lableData = res.tbody;
        _this.data = res.header;
        // for (let t = 0; t < _this.lableData.length; t++) {
        //   const pinInfo = _this.lableData[t];
        //   if (parseFloat(pinInfo["总数"]) > 0) {
        //     _this.dataList.push({
        //       value: pinInfo["总数"],
        //       name: pinInfo["品种"]
        //     });
        //   }
        // }
        // if (_this.dataList.length > 0) {
        //   _this.isHasData = true;
        //   _this.$nextTick(function() {
        //     _this.initECharts();
        //   });
        // }
      }).catch(err => {
          _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          _this.loading = false;
        });
    },
    initECharts() {
      var _this = this;
      _this.chart = echarts.init(document.getElementById("echartother"));
      _this.chart.setOption({
        color: ["#67E0E3", "#ff9f7f", "#37A2DA"],
        title: {
          text: "品种比例",
          left: "center"
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            var info = JSON.parse(params.data.cusValue);
            var titleList = _this.data;
            var result = "";
            for (let c = 0; c < titleList.length; c++) {
              const element = titleList[c];
              var number = info[element];
              result += `${element}：${number}<br />`;
            }
            return result;
          }
        },
        series: [
          {
            name: "品种比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: _this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script> 
<style lang="scss" scoped>
.petsCat {
  .el-main {
    display: flex;
    justify-content: space-around;
    .tableClass {
      width: 41%;
    }
    .tableClassTwo {
      width: 100%;
    }
    .echartClass {
      width: 50%;
    }
  }
}
</style>