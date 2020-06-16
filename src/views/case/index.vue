<template>
  <div class="petsCat">
    <el-card>
      <el-main class="mainClass">
        <el-table
          :data="this.lableData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          align="left"
          style="height:100%;overflow:hidden;"
        >
          <span v-for="(item1,index1) in data" :key="index1">
            <el-table-column v-if="item1!='品种'" :prop="item1" :width="'110px'" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
            <el-table-column v-else :prop="item1" :width="'110px'" fixed="left" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
          </span>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
    catHeadData:[],
    catBodyData:[],
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
    _this.loading = true;
  },
  watch: {
    catHeadData: function(newValue, oldValue) {
      var _this = this;
      _this.loading = false;
      if (newValue.length > 0) {
        _this.loadPetsData();
      }
    }
  },
  methods: {
    /**
     * 获取目录信息
     */
    loadPetsData: function() {
      var _this = this;
      _this.data = _this.catHeadData;
      _this.lableData = _this.catBodyData;
      _this.dataList = [];
      for (let t = 0; t < _this.lableData.length; t++) {
        const pinInfo = _this.lableData[t];
        if (parseFloat(pinInfo["总数"]) > 0) {
          _this.dataList.push({
            value: pinInfo["总数"],
            name: pinInfo["品种"]
          });
        }
      }
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