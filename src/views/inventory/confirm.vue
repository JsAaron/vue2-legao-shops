<template>

  <el-dialog title="确认进货" :visible.sync="dialogVisible" :before-close="handleClose" >


    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary"  @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      },
      editForm: {
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
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.stock-container {
  .el-dialog {
    @include setWH(8.14rem, auto);
    @include borderRadius(0.2rem);
    background: #4b91cd;
    .el-dialog__header {
      height: 0.62rem;
      position: relative;
      .el-dialog__title {
        @include setCenter;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.25rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      height: 4rem;
      background: #ffffff;
      display: flex;
      padding-top: 。6rem;
      // align-items: center;
      img {
        @include setWH(2.92rem, 2.92rem);
      }
      .el-form {
        width: 4.6rem;
        height: 2.92rem;
        margin-left: 0.1rem;
        .between {
          display: flex;
        }
        .between div:first-child {
          width: 2.7rem;
        }
        .el-form-item {
          margin-bottom: 0.05rem;
          display: flex;
          align-items: center;
        }
        .el-form-item__label {
          width: 0.8rem;
          text-align: left;
        }
        .el-form-item__label,
        .el-form-item__content {
          line-height: 0.4rem;
          display: inline-block;
          font-weight: 600;
          font-size: 0.15rem;
          padding: 0;
        }
      }
    }
    .el-dialog__footer {
      align-items: center;
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}
</style>
