<template>
  <div class="app-container">
    <el-card>
      <!-- table区域 -->
      <el-main>
        <!-- <el-table
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
        </el-table> -->

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
      this.$store.dispatch("bi/gettest").then(res => {
        this.data = res.header;
        this.lableData = res.tbody;
      });
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