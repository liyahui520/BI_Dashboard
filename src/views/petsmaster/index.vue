<template>
  <div class="app-container">
    <el-card>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客户来源" name="source">
        <sourceCom />
      </el-tab-pane>
      <el-tab-pane label="活跃客户" name="active">
        <active />
      </el-tab-pane>
      <el-tab-pane label="流失客户" name="loss">
        <loss />
      </el-tab-pane>
      <el-tab-pane label="最近消费客户" name="lately">
        <latelyconsume />
      </el-tab-pane>
      <el-tab-pane label="消费频次" name="number">
        <consumenumber />
      </el-tab-pane>
      <el-tab-pane label="年龄分布" name="age">
        <age />
      </el-tab-pane>
      <el-tab-pane label="性别" name="sex">
        <sex />
      </el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { dateFormat } from "@/utils/index";
import active from '../component/petsmaster/active/index'
import age from '../component/petsmaster/age/index'
import consumenumber from '../component/petsmaster/consumenumber/index'
import latelyconsume from '../component/petsmaster/latelyconsume/index'
import loss from '../component/petsmaster/loss/index'
import sex from '../component/petsmaster/sex/index'
import sourceCom from '../component/petsmaster/source/index'
export default {
  components:{
    active,
    age,
    consumenumber,
    latelyconsume,
    loss,
    sex,
    sourceCom
  },
  data() {
    return {
      data: [],
      lableData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      input: "",
      loading: false,
      tableData: [],
      categoryId: -1,
      activeName: "source"
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
    handleClick(tab, event) {
      console.log(tab, event);
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