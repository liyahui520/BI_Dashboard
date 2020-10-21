<template>
  <div class="diagtrea">
    <el-card>
      <!-- 表单区域 -->
      <el-header>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="日期">
            <el-date-picker
              v-model="months"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        <!-- 产品类型 -->
         <el-form-item label="产品类型">
        <el-select v-model="params.params.drugtype" value-key="value" @change="currentSel" placeholder="请选择类型">
            <el-option
               v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </el-form-item>
         <el-form-item label="目录">
         <el-select v-model="mineStatus" placeholder="请选择目录" multiple collapse-tags @change="selectChange">
          <el-option  :value="mineStatusValue" style="height: auto">
            <Tree ref="tree" :treeData="data" @handleCheckChange="handleCheckChange" :newarrNew="newarrNew"></Tree> 
            </el-option>
          </el-select>
         </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="submit">{{$t('query')}}</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-alert
    :title="messageParams"
    type="warning">
  </el-alert>
      <el-main class="mainClass">
        <el-table
          :data="caseBodyData"
          row-class-name="row"
          cell-class-name="column"
          v-loading="loading"
          border
          stripe
          align="left"
          style="width: 99.9%;height:100%;overflow:hidden;"
          :header-cell-style="{background:'#FAFAFA',color:'#606266'}"
        >
          <span v-for="(item1,index1) in caseHeadData" :key="index1">
                  <el-table-column
            v-if="item1=='序列'"
            :prop="item1"
            :width="'100px'"
            fixed="left"
            align="center"
            :label="item1"
          >
          <template slot-scope="scope" v-if="scope.row[item1]==0">-</template>
            <template slot-scope="scope" v-if="scope.row[item1]>0">{{scope.row[item1]}}</template> 
          </el-table-column>
          <el-table-column v-if="(item1!='序列'&&item1!='最近销售日期')&&(item1=='所属目录'||item1=='产品名称')" :prop="item1" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]}}</template>
            </el-table-column>
            <el-table-column v-if="item1!='序列'&&item1!='最近销售日期'&&item1!='所属目录'&&item1!='产品名称'" :prop="item1" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]|numFilter}}</template>
            </el-table-column>
             <el-table-column v-if="item1=='最近销售日期'" :prop="item1" :label="item1">
              <template slot-scope="scope">{{scope.row[item1]|dateFormat}}</template>
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
    </el-card>
  </div>
</template>
<script>
import {getDay} from '../../utils/utils'
import Tree from "@/components/Tree/index";
import Pagination from "@/components/Pagination/index";
import * as fecha from "element-ui/lib/utils/date";
export default {
  components: { Pagination , Tree },
  data() {
    return {
      messageParams:"",
      mineStatus: "",
      mineStatusValue: [],
      drugItem:{value:'药品'},
      newarrNew:[],
      data:[],
      caseHeadData: [],
      caseBodyData: [],
      loading: false,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      
      options:[{
        value: 1046,
        label: '药品'
      },{
        value: 1047,
        label: '消耗品'
      },{
        value: 1048,
        label: '商品'
      },{
        value: 1049,
        label: '疫苗'
      },{
        value: 2998,
        label: '驱虫'
      },{
        value: 1209,
        label: '处置'
      },{
        value: 2401,
        label: '化验'
      },{
        value: 2285,
        label: '美容'
      },{
        value: 2294,
        label: '住院'
      },{
        value: 2408,
        label: 'B超'
      },{
        value: 2409,
        label: 'X光'
      },{
        value: 2884,
        label: '显微镜'
      },{
        value: 2423,
        label: '试纸'
      }],
      months: [],
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
         end: getDay(0),
          start: getDay(-7),
          drugtype:1046,
          categoryId:[-1]
        }
      },
    };
  },
  filters: {
        numFilter (value) {
          // 截取当前数据到小数点后两位
          let realVal = parseFloat(value).toFixed(2)
          return realVal
        },
        dateFormat(value){
          return value? fecha.format(new Date(value),'yyyy-MM-dd'):'';
        }
      },
  created() {
    var _this = this;
    this.GetTreeData();
    _this.handCurrentDateTime();
  },
  methods: {
    currentSel(selVal){
      this.options.forEach(s=>{
        if(s.value == selVal){
            this.drugItem.value = s.label;
           return
        }
      })
      this.mineStatus= "";
      this.mineStatusValue= [];
      this.GetTreeData();
    },
    handCurrentDateTime() {
      var _this = this; 
      _this.months.push(getDay(-7));
      _this.months.push(getDay(0));
      _this.loadCaseData();
    },
     GetTreeData: function() {
       var _this = this;
      _this.$store
        .dispatch("bi/getPsysListBykey", {
          drugType: _this.params.params.drugtype
        })
        .then(res => {
          _this.data = res;
        });
    },
    submit(){
      var _this = this;
      _this.params.currentPage = 1;
      _this.params.pageSize = 10;
      this.loadCaseData();
    },
    //获取病例信息
    loadCaseData: function() {
      var _this = this;
      _this.caseHeadData = [];
      _this.caseBodyData = [];
      _this.loading = true;
      
      let dataparam = this.drugItem;
      let catoryIds = []
      let catoryId =0;
      this.mineStatusValue.forEach(s=>{
          catoryIds.push(s.id);
      })
      console.log("目录",catoryIds);
      if(catoryIds.length<=0){catoryIds.push(-1);catoryId=-1;}
      console.log("id",catoryId)
      this.params.params.start = _this.months[0];
      this.params.params.end = _this.months[1];
      this.params.params.categoryId=catoryIds;
      _this.messageParams="日期："+this.params.params.start+"至"+this.params.params.end +"   产品类型："+dataparam.value+"  目录："+(catoryId==-1?'所有':this.mineStatus);
      _this.$store
        .dispatch("bi/GetPmedicinedCpayments", this.params)
        .then(res => {
          _this.loading = false;
          _this.caseHeadData = res.header;
          _this.caseBodyData = res.tbody;
          _this.total = res.PageSum;
        }).catch(err => {
          _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          _this.loading = false;
        });
    },
    //分页点击事件
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      _this.loadCaseData();
    },
    //select框值改变时候触发的事件
selectChange(e){
	  var arrNew = [];
      var dataLength = this.mineStatusValue.length;
      var eleng = e.length;
      for(let i = 0; i< dataLength ;i++){
        for(let j = 0; j < eleng; j++){
          if(e[j] === this.mineStatusValue[i].label){
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.newarrNew = arrNew;
      // this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
       document.getElementsByClassName('el-tag__close').length>0?document.getElementsByClassName('el-tag__close')[0].remove():'';
},
   /**
     * 树节点点击事件
     * {点击数据} nodeData
     */
    // handleCheckChange: function(nodeData) { 
    //   console.log(nodeData)
    //   this.params.params.categoryId = nodeData.id; 
    //   this.mineStatus = nodeData.name;
    // },
 handleCheckChange(res) {
      //let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      console.log(res)
      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.name);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel; 
      console.log('开始')
     
      
    }
   },
   watch:{
     'mineStatus':function(){
       console.log('已出发',document.getElementsByClassName('el-tag__close'))
 document.getElementsByClassName('el-tag__close').length>0?document.getElementsByClassName('el-tag__close')[0].remove():'';
     }
   }
};
</script> 
<style lang="scss" scoped>
</style>