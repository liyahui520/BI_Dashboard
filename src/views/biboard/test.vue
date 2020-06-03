<template>
  <div class="app-container">
    <el-card>
      <!-- 表单区域 -->
      <el-header>
        <el-form :inline="true" :model="params.params" class="demo-form-inline">
          <el-form-item :label="$t('pmedicines.DrugsName')">
            <el-input
              v-model="params.params.drugsName"
              :placeholder="$t('pmedicines.DrugsNameDesc')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="GetTableData">{{$t('query')}}</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- table区域 -->
      <el-main>
        <el-row>
          <el-button class="buRight" type="info" icon="el-icon-edit">{{ $t('pmedicines.PEdit') }}</el-button>
          <el-button
            class="buRight"
            type="danger"
            icon="el-icon-delete"
          >{{ $t('pmedicines.PDelete') }}</el-button>
          <el-button
            class="buRight"
            type="primary"
            icon="el-icon-download"
          >{{ $t('pmedicines.Lower') }}</el-button>
        </el-row> 
        
        <el-table
          :data="this.lableData" 
          row-class-name="row"
          cell-class-name="column"  
          v-loading="loading"
              border
              stripe
              align="center"
              style="width: 99.9%;height:100%;overflow:hidden;"  
        > 
        <span v-for="(item1,index1) in data" :key="index1">
          <el-table-column v-if="item1!='name'"
            :prop="item1" 
            :width="'110px'"
            :label="item1"
          ><template slot-scope="scope">{{scope.row[item1]}}</template></el-table-column> 
          <el-table-column v-else
            :prop="item1" 
            :width="'110px'"
            fixed="left"
            :label="item1"
          ><template slot-scope="scope">{{scope.row[item1]}}</template></el-table-column> 
          </span>
        </el-table>
        
      </el-main>
    </el-card>
  </div>
</template>
<script>
import Tree from "@/components/Tree/index";
import { getListData, dateFormat } from "@/utils/index";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination/index";
export default {
  name: "",
  components: { Tree, Pagination },
  data() {
    return {
      data: [],
      lableData:[],
      defaultProps: {
        children: "children",
        label: "name"
      },
      drugType: 1047,
      input: "",
      // 分页参数 Satrt
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      // 分页参数  End
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          barCode: "",
          canOrder: -1,
          canSell: -1,
          category: -1,
          deleted: -1,
          drugType: 1047,
          drugsName: "",
          endTime: "",
          id: -1,
          itemCode: "",
          manufacturer: -1,
          providerId: -1,
          startTime: "",
          usingMethod: -1
        }
      },
      tableData: [],
      categoryId: -1
    };
  },
  created() {
    /**
     * 初始化目录
     */
    this.GetTreeData();
    /**
     * 初始化产品数据
     */
    //this.GetTableData();
  },
  methods: {
    // 表格头部样式
            headerClass() {
                return 'table-header-class'
            },

            // element列表文字居中
            cellStyle () {
                return 'text-align:center;line-height: 8px;'
            },
    /**
     * 获取目录信息
     */
    GetTreeData: function() {
      this.$store.dispatch("bi/gettest").then(res => {
        this.data = res.header;
        this.lableData=res.tbody;
      //   this.data.forEach(s=>{
      //     let tempdata={}
      //     s.col.forEach(x=>{
      //       tempdata[x.key]=x.value;
      //     })
      //     console.log(tempdata)
      //     this.lableData.push(tempdata)
      //   })
      //   console.log(this.lableData)
      });
    },
    /**
     * 树节点点击事件
     * {点击数据} nodeData
     */
    handleClick: function(nodeData) {
      console.log(nodeData);
      this.categoryId = nodeData.id;
      this.GetTableData();
    },
    /**
     * 获取Table数据
     */
    GetTableData: function() {
      this.loading = true;
      this.params.params.category = this.categoryId;
      this.$store
        .dispatch("pmedicines/getPmedicinesByDrugType", this.params)
        .then(res => {
          this.tableData = res.list;
          this.total = res.total;
          this.page = res.pageNum;
          this.limit = res.pageSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 分页点击事件
     */
    pagination(param) {
      this.params.currentPage = param.page;
      this.params.pageSize = param.limit;
      this.GetTableData();
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