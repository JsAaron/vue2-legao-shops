<template>
  <div class="shop-container">
    <el-table class="shop-layout" :data="tableData" highlight-current-row>
      <el-table-column prop="user" label="账号类别">
      </el-table-column>
      <el-table-column prop="name" label="账号">
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleModify(scope.$index, scope.row)">修改密码</el-button>
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
          name: "老板"
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
    text-align: center;
    margin: 0 auto;
    margin-top: 100px;
    padding-bottom: 40px;
  }
}
</style>

<style lang="scss" >
// 重写th的优先级
.shop-container {
  margin-top: 1.2rem;
  .shop-layout {
    border: 1px solid #d5d5d5;
  }
  .el-table th {
    background: #4b91cd;
    text-align: center;
    padding: 0.2rem;
    .cell {
      font-weight: 800;
      @include setFontColor(0.2rem, white);
    }
  }
  .el-table__body-wrapper {
    text-align: center;
    .cell {
      font-weight: 800;
    }
    td {
      padding: 0.15rem;
    }
  }
}
</style>
