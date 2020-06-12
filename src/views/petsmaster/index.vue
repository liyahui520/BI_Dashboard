<template>
  <div class="app-container">
    <el-card>
    <el-tabs v-model="activeName" type="card">
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
      activeName: "source"
    };
  },
  created() {
  },
  methods: {
  }
};
</script> 
<style>

</style>