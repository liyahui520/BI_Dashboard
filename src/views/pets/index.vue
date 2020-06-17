<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="猫" name="cat">
          <cat v-if="currentName=='cat'" />
        </el-tab-pane>
        <el-tab-pane label="狗" name="dog">
          <dog v-if="currentName=='dog'" />
        </el-tab-pane>
        <el-tab-pane label="其他" name="other">
          <other v-if="currentName=='other'" />
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
      currentName: "cat"
    };
  },
  methods: {
    handleClick(tab, event) {
      var _this = this;
      _this.currentName = tab.paneName;
    }
  }
};
</script> 
<style>
</style>