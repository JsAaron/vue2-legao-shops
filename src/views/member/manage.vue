<template>
  <el-dialog title="会员个人主页" :visible.sync="visible" :before-close="dialogClose">
    <div class="title">
      <img />
      <p>三张</p>
    </div>
    <div class="container fontWeight">
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
    <div class="m-button">
      <el-button type="primary">租借产品</el-button>
      <el-button type="primary">次卡消费</el-button>
    </div>
    <div class="m-container">
      123
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
    margin: 0 auto;
    width: 7.08rem;
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
      border-bottom: 1px solid #cccccc;
      padding-bottom: 0.15rem;
      p {
        margin-top: 0.1rem;
      }
    }
    .m-button {
      margin: 0.2rem 0;
      display: flex;
      justify-content: space-between;
      .el-button {
        @include setWH(1.87rem, 0.58rem);
      }
    }
    .m-container {
      height: 3.05rem;
      border: 1px solid #ccc;
    }
  }
}
</style>
