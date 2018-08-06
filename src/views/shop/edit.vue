<template>

  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%">
    <el-form :model="form">
      <el-form-item label="账号：">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="password" placeholder="输入新密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="password_sure" placeholder="确定新密码"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>

</template>



<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      password: "",
      password_sure: "",
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>

<style lang="scss">
.shop-container {
  .el-dialog__header {
    text-align: center;
  }
  .el-dialog__body {
    width: 60%;
    margin: 0 auto;
  }
  .el-form-item__label {
    width: 20%;
  }
  .el-select--medium {
    width: 80%;
  }
}
</style>
