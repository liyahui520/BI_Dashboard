<template>
  <div>
    <!-- 表单区域 -->
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="最近">
          <el-select
            v-model="params.params.month"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个月"></el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="loadLater">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <el-table :data="lableData" row-class-name="row" v-loading="loading" border stripe>
        <span v-for="(item1,index1) in data" :key="index1">
          <el-table-column
            v-if="item1=='序号'"
            :prop="item1"
            :width="'100px'"
            fixed="left"
            align="center"
            :label="item1"
          >
            <template slot-scope="scope">{{scope.row[item1]}}</template>
          </el-table-column>
          <el-table-column
            v-else-if="item1=='最近消费时间'"
            :prop="item1"
            :width="'180px'"
            sortable
            :label="item1"
          >
            <template slot-scope="scope">{{scope.row[item1]|dateFormat}}</template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item1"
            :width="'130px'"
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
      data: [],
      lableData: [],
      // 分页参数 Satrt
      total: 0,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          month: 3
        }
      },
      options: [
        {
          value: "3",
          label: "3"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "9",
          label: "9"
        },
        {
          value: "12",
          label: "12"
        }
      ]
    };
  },
  created() {
    var _this = this;
    _this.loadLater();
  },
  methods: {
    loadLater: function() {
      var _this = this;
      _this.loading = true;
      _this.$store.dispatch("bi/getRunCpayments", _this.params).then(res => {
        _this.loading = false;
        _this.data = [];
        _this.lableData = res.tbody;
        for (let t = 0; t < res.header.length; t++) {
          const element = res.header[t];
          if (element != "PageCount") _this.data.push(element);
        }
        if (_this.lableData.length > 0) {
          _this.total = parseInt(_this.lableData[0]["PageCount"]);
        }
      });
    },
    /**
     * 格式化时间
     */
    dateFormat: function(row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
    },
    //分页点击事件
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      _this.loadLater();
    }
  }
};
</script>
<style scoped>
</style>