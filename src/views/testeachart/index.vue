<template>
  <div class="app-container">
    <el-card>
      <!-- 表单区域 -->
      <el-header>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('pmedicines.DrugsName')">
            <!-- <el-input
              v-model="params.params.drugsName"
              :placeholder="$t('pmedicines.DrugsNameDesc')"
            ></el-input>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="GetTableData">{{$t('query')}}</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- table区域 -->
      <el-main>
        <el-table
          :data="this.lableData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          stripe
          align="center"
          style="width: 99.9%;height:100%;overflow:hidden;"
        >
          <span v-for="(item1,index1) in data" :key="index1">
            <el-table-column v-if="item1!='name'" :prop="item1" :width="'110px'" :label="item1">
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
import { dateFormat } from "@/utils/index";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      data: [],
      lableData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      drugType: 1047,
      input: "",
      // 分页参数 Satrt
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      tableData: [],
      categoryId: -1
    };
  },
  created() {
    /**
     * 初始化目录
     */
    this.GetTreeData();
  },
  methods: {
    // 表格头部样式
    headerClass() {
      return "table-header-class";
    },

    // element列表文字居中
    cellStyle() {
      return "text-align:center;line-height: 8px;";
    },
    /**
     * 获取目录信息
     */
    GetTreeData: function() {
      var _this = this;
      _this.$store.dispatch("bi/gettest").then(res => {
        console.log("头部数据为", res.header);
        console.log("内容数据为", res.tbody);

        _this.handData(res.header, res.tbody);

        _this.data = res.header;
        _this.lableData = res.tbody;
      });
      var data = "";
    },
    handData(heardData, bodyData) {
      var _this = this;
      var newhead = heardData;
      var biaotilist = [];
      var nameIndex = newhead.indexOf("name");
      if (nameIndex > -1) newhead.splice(nameIndex, 1);
      var headlist = newhead;
      //总数据集合
      var contentlist = [];

      for (let index = 0; index < bodyData.length; index++) {
        const element = bodyData[index];
        biaotilist.push(element["name"]);
      }
      const contentInfo = {};
      contentInfo.name = biaotilist[0];
      contentInfo.type = "bar";
      contentInfo.barWidth= 5;

    //   contentInfo.stack = headInfo;
      contentInfo.areaStyle = {};
      contentInfo.data = [];
      const elementTwo = bodyData[0];
      for (let index = 0; index < headlist.length; index++) {
        const headInfoInfo = headlist[index];
        console.log("头部对象为", headInfoInfo);
        contentInfo.data.push(parseFloat(elementTwo[headInfoInfo]));
      }
      contentlist.push(contentInfo);
      console.log("标题list", biaotilist);
      console.log("头部集合为", headlist);
      console.log("总数据集合为", contentlist);
    },
    /**
     * 格式化时间
     */
    dateFormat: function(row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
    }
  }
};
</script> 
<style>
.buRight {
  float: right;
  margin-bottom: 5px;
  margin-right: 2px;
  margin-left: 2px;
}
</style>