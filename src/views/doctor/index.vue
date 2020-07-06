<template>
  <div class="sumClass">
        <el-card>
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
        <el-form-item label="是否启用">
          <el-switch
  v-model="enabled"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="loadNumData">{{$t('query')}}</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!-- table区域 -->
    <el-main>
      <el-table
        :data="tbodyData"
        row-class-name="row"
        cell-class-name="column"
        v-loading="loading"
        border
        stripe
        align="center"
        style="width: 99.9%;height:100%;overflow:hidden;"
      >
        <el-table-column label="月份" prop="月份" align="center"></el-table-column>
        <el-table-column v-for="(headInfo,index) in headData" :key="index" :label="headInfo">
          <el-table-column label="化验数量">
            <template slot-scope="scope">{{scope.row[headInfo+'_化验数量']|handNumber}}</template>
          </el-table-column>
          <el-table-column label="化验金额">
            <template slot-scope="scope">{{scope.row[headInfo+'_化验金额']|handMoney}}</template>
          </el-table-column>
          <el-table-column label="诊疗收入">
            <template slot-scope="scope">{{scope.row[headInfo+'_诊疗收入']|handMoney}}</template>
          </el-table-column>
          <el-table-column label="个人化验占比" width="110px">
            <template slot-scope="scope">{{scope.row[headInfo+'_个人化验占比']|handBiLi}}</template>
          </el-table-column>
        </el-table-column>
        </el-table>
    </el-main>
        </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      months: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      loading: false,
      headData:[],
      tbodyData:[],
      enabled:true,
    };
  },
    created() {
    var _this = this;
    _this.handCurrentDateTime();
  },
filters:{
  handNumber(value){
    console.log("value",value)
    if(value!=null&&value!=''){
      return value
    }
    else{
      return "0"
    }
  },
  handMoney(value){
if(value!=null&&value!=''){
      return value
    }
    else{
      return "0.00"
    }
  },
  handBiLi(value){
    if(value!=null&&value!=''){
      return value
    }
    else{
      return "0.00%"
    }
  }

},
  methods: {
    handCurrentDateTime(){
        var _this=this;
        var currentDate=new Date();
        var year=currentDate.getFullYear();
        var month=(currentDate.getMonth()+1);
        var newMonth=month<10?("0"+month):month;
        var dateFormat=`${year}-${newMonth}-01`;
        _this.months.push(dateFormat);
        _this.months.push(dateFormat);
        _this.loadNumData();
    },
    loadNumData() {
      var _this = this;
      _this.lableData = [];
      _this.loading = true;
      _this.$store
        .dispatch("bi/getDoctorTest", {
            end: "2020-07-03",
            start: "2020-07-03",
            userid: -1,
            userstatus: 0
        })
        .then(res => {
          _this.loading = false;
          console.log("请求完毕以后的数据为",res)
        _this.headData=res.header;
        _this.tbodyData=res.tbody;
        }).catch(err => {
          _this.$message({
            message: "数据加载失败，请稍后重试",
            type: "error"
          });
          _this.loading = false;
        });
    }
  }
};
</script>
