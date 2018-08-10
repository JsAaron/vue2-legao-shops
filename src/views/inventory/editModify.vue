<template>

  <el-dialog title="商品信息" :visible.sync="dialogVisible" :before-close="handleClose" >

    <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      <el-button type="primary"  @click="dialogVisible = false">取 消</el-button>
    </span>

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
  },
  methods: {
    handleClose() {
      alert(1);
    }
  }
};
</script>

<style lang="scss" >
.stock-container {
  .el-dialog {
    @include setWH(8.14rem, 5.92rem);
    @include borderRadius(0.2rem);
    background: #4b91cd;
    .el-dialog__header {
      height: 0.62rem;
      text-align: center;
      font-size: 0;
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.25rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      height: 4rem;
      background: #ffffff;
    }
    .el-dialog__footer {
      height: 1.3rem;
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}
</style>
