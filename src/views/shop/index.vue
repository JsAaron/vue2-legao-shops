<template>
  <div class="shop-container">
    <el-table class="shop-layout" :data="tableData" highlight-current-row>
      <el-table-column prop="user" label="日期">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleModify(scope.$index, scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改密码 -->
    <edit-password :dialogVisible="dialogVisible"></edit-password>

  </div>
</template>

<script>
import editPassword from "./edit";
export default {
  data() {
    return {
      //弹框
      dialogVisible: false,
      tableData: [
        {
          user: "管理员",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        },
        {
          user: "子账号",
          name: "王小虎"
        }
      ]
    };
  },
  components: {
    editPassword
  },
  methods: {
    handleModify(index, row) {
      this.dialogVisible = true;
      console.log(this.dialogVisible);
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  .shop-layout {
    width: 70%;
    @include borderRadius(15px);
    padding-bottom: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>

<style lang="scss" >
// 重写th的优先级
.shop-container {
  .el-table th {
    background: #304156;
    text-align: center;
    padding: 15px;
    .cell {
      font-weight: 800;
      @include setFontColor(1.1rem, white);
    }
  }
  .el-table__body-wrapper {
    text-align: center;
    .cell {
      font-weight: 800;
    }
  }
}
</style>
