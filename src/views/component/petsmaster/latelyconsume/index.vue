<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="月份">
          <el-date-picker
            v-model="value1"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <el-table
        :data="lableData"
        row-class-name="row"
        cell-class-name="column"
        v-loading="loading"
        border
        stripe
        align="center"
        style="width: 99.9%;height:100%;overflow:hidden;"
      >
        <span v-for="(item1,index1) in data" :key="index1">
          <el-table-column
            v-if="item1!='姓名'"
            :prop="item1"
            :width="'130px'"
            sortable
            :label="item1"
          >
            <template slot-scope="scope">{{scope.row[item1]}}</template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item1"
            :width="'130px'"
            fixed="left"
            sortable
            :label="item1"
          >
            <template slot-scope="scope">{{scope.row[item1]}}</template>
          </el-table-column>
        </span>
      </el-table>
    </el-main>
    <!-- 分页区域 -->
    <el-footer>
      <Pagination :total="total" :page="page" :limit="limit" :pageSizes="pageSizes" :background="true"></Pagination>
    </el-footer>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination/index";
export default {
  components: { Pagination },
  data() {
    return {
      data: [],
      lableData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 分页参数 Satrt
      total: 200,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      value1: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    searchData() {
      var _this = this;
      if (_this.value1.length <= 0) {
        _this.$message({
          showClose: true,
          message: "请选择日期时间段",
          type: "warning"
        });
        return;
      }
      var endDate = _this.value1[1];
      var newend = new Date(endDate);
      newend.setMonth(newend.getMonth() + 1 + 1);
      var month = newend.getMonth() == 0 ? 12 : newend.getMonth();
      month = month < 10 ? "0" + month : month;
      var getDate = newend.getDate();
      getDate = getDate < 10 ? "0" + getDate : getDate;
      var endDateTwo = `${newend.getFullYear()}-${month}-${getDate}`;
      _this.loadLater(_this.value1[0], endDateTwo);
    },
    // 表格头部样式
    headerClass() {
      return "table-header-class";
    },

    // element列表文字居中
    cellStyle() {
      return "text-align:center;line-height: 8px;";
    },
    loadLater: function(start, end) {
      var _this = this;
      _this.loading = true;
      _this.$store
        .dispatch("bi/getPcustomersCpayments", {
          end: end,
          start: start
        })
        .then(res => {
          _this.loading = false;
          console.log("res.header的数据为", res.header);
          _this.data = res.header;
          _this.lableData = res.tbody;
        });
      _this.loading = false;
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
<style scoped>
</style>