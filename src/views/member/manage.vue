<template>
  <el-dialog title="会员个人主页" :visible.sync="visible" :before-close="dialogClose">
    <div class="title">
      <img />
      <p>三张</p>
    </div>
    <div class="container">
      <p>
        <label>手机号码：</label><span>13488888888</span>
      </p>
      <p>
        <label>会员卡类型：</label><span>读酷黄光通用卡</span>
        <span class="float-right">管理</span>
      </p>
      <p>
        <label>零件余额保证金：</label><span>100:00</span>
        <span class="float-right">充值</span>
      </p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "visible"],
  data() {
    return {};
  },
  methods: {
    dialogClose() {
      this.$emit("close-dialog");
    },
    dialogUpdate() {
      this.dialogClose();
    }
  }
};
</script>

<style lang="scss" >
.el-dialog {
  @include setWH(8.39rem, auto);
  @include borderRadius(0.2rem);
  margin-top: 0 !important;
  @include setCenter;

  .el-dialog__header {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    height: 0.67rem;
    position: relative;
    background: #4b91cd;
    .el-dialog__title {
      @include setCenter;
    }
    .el-dialog__title,
    .el-dialog__close {
      font-size: 0.22rem;
      color: #ffffff;
    }
  }

  .el-dialog__body {
    .title {
      text-align: center;
      img {
        margin: 0 auto;
        @include setWH(0.83rem, 0.83rem);
      }
    }
    .float-right {
      float: right;
      color: #4b91cd;
    }
    .container {
      p {
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
