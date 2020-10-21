<template>

  <div class="app-container">
    <el-card>
      <div>
        <!-- table区域 -->
        <el-main>
          <el-table :data="lableData" row-class-name="row" v-loading="loading" border stripe :header-cell-style="{background:'#FAFAFA',color:'#606266'}">
            <span v-for="(item1,index1) in data" :key="index1">
              <el-table-column v-if="item1=='序号'" fixed="left" :prop="item1" :label="item1">
                <template slot-scope="scope">{{scope.row[item1]}}</template>
              </el-table-column>
              <el-table-column v-else :prop="item1" :label="item1">
                <template slot-scope="scope">{{scope.row[item1]}}</template>
              </el-table-column>
            </span>
            <!-- <el-table-column sortable label="操作">
                <template slot-scope="scope">
                    
                    <el-button size="mini" type="primary" icon="el-icon-search" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    
                </template>
            </el-table-column> -->
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
    </el-card>
  </div>

</template>
<script>
import Pagination from "@/components/Pagination/index";
import { dateTimeFormat } from "@/utils/index";
export default {
  components: { Pagination },
  props:{
      months:{
          required: true,
          type: Array
      },
      providerid:{
          type:String
      },
      data:{
          type:Array
      },
      lableData:{
          type:Array
      },
      total:{
          type:Number
      },
      pageSizes:{
          type:Array,
          default: [10, 20, 50, 100]
      },
      loading:{
          type:Boolean,
          default: false
      },
      params:{
          type:Object
      },
      loadDetailInfo: {
        type: Function,
        default: null
      }
  },
  watch: {

  },
  created() {
    var _this = this;
    console.log("详情请求之前的参数为",_this.params,_this.months,_this.total)
  },
  filters:{
    //格式化时间
    dateFormat: function(row) {
      return dateTimeFormat(row);
    },
  },
  methods: {
    //分页点击事件
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      console.log("此处是子组件调用父组件的方法，传入参数为",_this.params)
      if (this.loadDetailInfo) {
          this.loadDetailInfo(_this.params);
       }
    }
  }
};
</script>
<style scoped>
.remark{
  color: red;
  font-size: 14px;
}
</style>