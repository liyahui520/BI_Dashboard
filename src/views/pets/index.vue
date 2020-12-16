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
        <el-tab-pane label="宠物种类" name="pettype">
          <pettype :styleClass="'height: 600px; width: 800px; margin: auto;'" :showHead="true" v-if="currentName=='pettype'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import cat from "../component/pets/cat/index";
import dog from "../component/pets/dog/index";
import other from "../component/pets/other/index";
import pettype from '../component/pets/pettype/index';
export default {
  components: {
    cat,
    dog,
    other,
    pettype
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