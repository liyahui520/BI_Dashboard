<template>

  <div class="app-container">
    <el-card>
      <div>
        <!-- 表单区域 -->
        <el-header>
          <el-form :inline="true" class="demo-form-inline">

            <el-form-item label="供应商名称" >
              <el-input v-model="params.params.providername" ></el-input>
            </el-form-item>
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
              <el-button type="primary" @click.native="loadLater">{{$t('query')}}</el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <!-- table区域 -->
        <el-main>
          <el-table :data="lableData" row-class-name="row" v-loading="loading" border stripe :header-cell-style="{background:'#FAFAFA',color:'#606266'}">
            <span v-for="(item1,index1) in data" :key="index1">
              <el-table-column v-if="item1=='序号'" fixed="left" :prop="item1" sortable :label="item1">
                <template slot-scope="scope">{{scope.row[item1]}}</template>
              </el-table-column>
              <el-table-column v-else :prop="item1" sortable :label="item1">
                <template slot-scope="scope">{{scope.row[item1]}}</template>
              </el-table-column>
            </span>
            <el-table-column sortable label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-search" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
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

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <ProviderDeatil :months="detailMonths" :providerid="providerid" :data="detaildata" :lableData="detaillableData" :total="detailtotal" :pageSizes="detailpageSizes" :loading="detailloading" :params="detailparams" :loadDetailInfo="loadDetail"></ProviderDeatil>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>
import Pagination from "@/components/Pagination/index";
import { dateTimeFormat } from "@/utils/index";
import ProviderDeatil from "./providerdetail";
export default {
  components: { Pagination,ProviderDeatil },
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
      params:{
        PageSum: 0,
        currentPage:1,
        pageSize:10,
        pageSum:0,
        params: {
          providername:'',
          start:'',
          end:'',
          orgid:0
        },
      },
      months: [],
      providerid:0,
      dialogVisible:false,
      detailMonths:[],
      detaildata:[],
      detaillableData:[],
      detailtotal:0,
      detailpageSizes:[10, 20, 50, 100],
      detailloading:false,
      detailparams:{
        PageSum: 0,
        currentPage:1,
        pageSize:10,
        pageSum:0,
        params: {
          providername:'',
          start:'',
          end:'',
          orgid:0
        },
      },
    };
  },
  watch: {
  },
  created() {
    var _this = this;
    _this.handCurrentDateTime();
  },
  filters:{
    //格式化时间
    dateFormat: function(row) {
      return dateTimeFormat(row);
    },
  },
  methods: {
    //处理关闭弹出框
    handleClose(){
      var _this=this;
      _this.dialogVisible=!_this.dialogVisible;
    },
    //处理点击详情信息
    handleEdit(index,obj){
      var _this=this;
      _this.providerid=obj.供应商ID;
      _this.detailMonths=[];
      _this.detailMonths.push(_this.months[0]);
      _this.detailMonths.push(_this.months[1]);
      _this.loadDetail(null);
    },
    //处理当前时间值
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
      _this.detailMonths.push(dateStartFormat);
      _this.detailMonths.push(dateEndFormat);
      _this.loadLater();
    },
    //加载主表格内容
    loadLater: function() {
      var _this = this;
      _this.loading = true;
       _this.params.params.start=_this.months[0];
      _this.params.params.end=_this.months[1];
      _this.$store.dispatch("bi/getProviderSummary", _this.params).then(res => {
        _this.loading = false;
        _this.data = res.header;
        _this.lableData = res.tbody;
        _this.total = res.PageSum;
      }).catch(err => {
          if(err.hasOwnProperty("msg")){
            _this.$message({
            message: err.msg,
            type: "error"
          });
          }
          else{
            _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          }
          
          _this.loading = false;
        });
    },
    //加载详情列表信息
    loadDetail(params){
      console.log("这个父组件的方法",params)
      var _this = this;
      if(params==null){
      _this.detailloading = true;
      _this.detailparams.params.providerid=parseInt(_this.providerid);
      _this.detailparams.params.start=_this.detailMonths[0];
      _this.detailparams.params.end=_this.detailMonths[1];
      _this.$store.dispatch("bi/getProviderDetailSummary", _this.detailparams).then(res => {
        _this.dialogVisible=!_this.dialogVisible;
        _this.detailloading = false;
        _this.detaildata = res.header;
        _this.detaillableData = res.tbody;
        _this.detailtotal = res.PageSum;
      }).catch(err => {
        
          if(err.hasOwnProperty("msg")){
            _this.$message({
            message: err.msg,
            type: "error"
          });
          }
          else{
            _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          }
          _this.dialogVisible=!_this.dialogVisible;
          _this.detailloading = false;
        });
      }
      else{
        console.log("此处是父组件的方法判断是否被子组件进行调用了",params)
        _this.detailloading = true;
        params.providerid=parseInt(_this.providerid);
        params.start=_this.detailMonths[0];
        params.end=_this.detailMonths[1];
        _this.$store.dispatch("bi/getProviderDetailSummary", params).then(res => {
        _this.detailloading = false;
        _this.detaildata = res.header;
        _this.detaillableData = res.tbody;
        _this.detailtotal = res.PageSum;
      }).catch(err => {
          if(err.hasOwnProperty("msg")){
            _this.$message({
            message: err.msg,
            type: "error"
          });
          }
          else{
            _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          }
          
          _this.detailloading = false;
        });
      }
      
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
.remark{
  color: red;
  font-size: 14px;
}
</style>