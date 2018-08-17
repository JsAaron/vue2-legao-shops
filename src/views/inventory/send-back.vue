<template>
  <el-dialog class="sendBack-dialog" title="归还清单" :visible.sync="dialogVisible" :before-close="handleClose" >
    <el-table
      :data="list"
      tooltip-effect="dark">
      <el-table-column
        prop="productName"
        label="产品名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品货号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cashPledge"
        label="押金价"
        align="center">
      </el-table-column>
      <el-table-column
        prop="purchasePrice"
        align="center"
        label="进货价">
      </el-table-column>
      <el-table-column
        prop="productStatus"
        align="center"
        label="产品状态">
      </el-table-column>
      <el-table-column
        prop="integrity"
        align="center"
        label="完整性">
      </el-table-column>
      <el-table-column 
        align="center" 
        label="操作"> 
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      editForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      list: [
        {
          productName: "张三",
          productId: "04-23-4-5-6-23-32",
          cashPledge: 1000,
          purchasePrice: 200,
          productStatus: "新品",
          integrity: "完整"
        }
      ]
    };
  },
  methods: {
    handleClose() {
      this.$emit("close-dialog");
    },
    handleUpdate() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.sendBack-dialog {
  .el-dialog {
    @include setWH(14.5rem, 8.5rem);
    @include borderRadius(0.2rem);
    margin-top: 0 !important;
    background: #ffffff;
    @include setCenter;
    .el-dialog__header {
      height: 1rem;
      position: relative;
      .el-dialog__title {
        @include setCenter;
        color: #111111;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.3rem;
      }
    }
  }
  .el-table__header th:nth-child(n + 2):before {
    // content: "|";
  }
}
</style>
