<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="猫" name="cat">
          <cat :catHeadData="catHeadData" :catBodyData="catBodyData" />
        </el-tab-pane>
        <el-tab-pane label="狗" name="dog">
          <dog :dogHeadData="dogHeadData" :dogBodyData="dogBodyData" />
        </el-tab-pane>
        <el-tab-pane label="其他" name="other">
          <other :otherHeadData="otherHeadData" :otherBodyData="otherBodyData" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import cat from "../component/pets/cat/index";
import dog from "../component/pets/dog/index";
import other from "../component/pets/other/index";
export default {
  components: {
    cat,
    dog,
    other
  },
  data() {
    return {
      activeName: "cat",
      catHeadData: [],
      catBodyData: [],
      dogHeadData: [],
      dogBodyData: [],
      otherHeadData: [],
      otherBodyData: []
    };
  },
  created() {
    var _this=this;
    _this.loadPetsData();
  },
  methods: {
    loadPetsData: function() {
      var _this = this;
      _this.$store.dispatch("bi/getPPetsData").then(res => {
        _this.catHeadData = res.header.cat;
        _this.catBodyData = res.tbody.cat;
        _this.dogHeadData = res.header.dog;
        _this.dogBodyData = res.tbody.dog;
        _this.otherHeadData = res.header.other;
        _this.otherBodyData = res.tbody.other;
      });
    }
  }
};
</script> 
<style>
</style>