<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" type="card" @tab-click="loadData">
        <el-tab-pane label="客户来源" name="source">
          <sourceCom v-if="currentName=='source'" />
        </el-tab-pane>
        <el-tab-pane label="活跃客户" name="active">
          <active v-if="currentName=='active'" />
        </el-tab-pane>
        <el-tab-pane label="流失客户" name="loss">
          <loss v-if="currentName=='loss'" />
        </el-tab-pane>
        <el-tab-pane label="最近消费客户" name="lately">
          <latelyconsume v-if="currentName=='lately'" />
        </el-tab-pane>
        <el-tab-pane label="消费频次" name="number">
          <consumenumber v-if="currentName=='number'" />
        </el-tab-pane>
        <el-tab-pane label="年龄分布" name="age">
          <age v-if="currentName=='age'" />
        </el-tab-pane>
        <el-tab-pane label="性别比例" name="sex">
          <sex v-if="currentName=='sex'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { dateFormat } from "@/utils/index";
import active from "../component/petsmaster/active/index";
import age from "../component/petsmaster/age/index";
import consumenumber from "../component/petsmaster/consumenumber/index";
import latelyconsume from "../component/petsmaster/latelyconsume/index";
import loss from "../component/petsmaster/loss/index";
import sex from "../component/petsmaster/sex/index";
import sourceCom from "../component/petsmaster/source/index";
export default {
  components: {
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
      activeName: "source",
      currentName:'source'
    };
  },
  created() {
    var _this=this;

  },
  methods: {
    loadData(tab, event){
      var _this=this;
      console.log("点击",tab.paneName, event)
      _this.currentName=tab.paneName;
    }
  }
};
</script> 
<style>
</style>