<template>
  <div class="saleClass">
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="月份">
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
          <el-button type="primary" @click.native="loadData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <el-table
        :data="tableData"
        row-class-name="row"
        cell-class-name="column"
        v-loading="loading"
        border
        stripe
        align="left"
        style="width: 99.9%;height:100%;overflow:hidden;"
      >
        <span v-for="(item1,index1) in headData" :key="index1">
          <el-table-column
            v-if="item1!='序号'"
            :prop="item1"
            :width="'180px'"
            sortable
            :label="item1"
          >
            <template slot-scope="scope">{{scope.row[item1]}}</template>
          </el-table-column>
          <el-table-column v-else :prop="item1" :width="'130px'" fixed="left" :label="item1">
            <template slot-scope="scope">{{scope.row[item1]}}</template>
          </el-table-column>
        </span>
      </el-table>
    </el-main>
    <!-- 分页区域 -->
    <el-footer>
      <Pagination
        :total="total"
        :page="params.currentPage"
        :limit="params.pageSize"
        :pageSizes="pageSizes"
        :background="true"
        @pagination="pagination"
      ></Pagination>
    </el-footer>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination/index";
export default {
  components: { Pagination },
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          end: "",
          start: "",
          type: 2
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      months: [],
      loading: false,
      tableData: [],
      headData: [],
      // 分页参数 Satrt
      total: 0,
      pageSizes: [10, 20, 50, 100]
    };
  },
  created() {
    var _this = this;
    _this.handCurrentDateTime();
  },
  methods: {
    handCurrentDateTime() {
      var _this = this;
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth()+1);
      currentDate.setMonth(currentDate.getMonth()-3);
      var startMonth=(currentDate.getMonth()+1)
      var newStartMonth = startMonth < 10 ? "0" + startMonth : startMonth;
      var newEndMonth = month < 10 ? "0" + month : month;
      var dateStartFormat = `${year}-${newStartMonth}-01`;
      var dateEndFormat = `${year}-${newEndMonth}-01`;
      _this.months.push(dateStartFormat);
      _this.months.push(dateEndFormat);
      _this.loadData();
    },
    loadData() {
      var _this = this;
      _this.loading = true;
      _this.tableData = [];
      _this.headData = [];
      _this.params.params.start=_this.months[0];
      _this.params.params.end=_this.months[1];
      _this.$store.dispatch("bi/getPMedicinesBuy", _this.params).then(res => {
        _this.loading = false;
        for (let t = 0; t < res.header.length; t++) {
          const element = res.header[t];
          if (element != "PageCount") _this.headData.push(element);
        }
        _this.tableData = res.tbody;
        if (_this.tableData.length > 0) {
          _this.total = parseInt(_this.tableData[0]["PageCount"]);
        }
      });
    },
    //格式化时间
    dateFormat: function(row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      //   return dateFormat(row.insertdate);
    },
    //分页点击事件
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      _this.loadData();
    }
  }
};
</script>