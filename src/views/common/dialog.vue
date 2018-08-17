<template>
  <div class="dialog-common">
    <el-dialog :title="data.title" :visible.sync="visible" :before-close="dialogClose">
      <div class="title">
        <p>共选择商品(件): 4</p>
        <p>总金额(元): 3453234</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
.dialog-common {
  .el-dialog {
    @include setWH(4.3rem, 2.79rem);
    @include borderRadius(0.2rem);
    // background: transparent;
    margin-top: 0 !important;
    @include setCenter;
    .el-dialog__header {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      background: #4b91cd;
      position: relative;
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
      background: #ffffff;
    }
    .el-dialog__footer {
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}

.dialog-common {
  .el-dialog {
    @include setWH(4.3rem, auto);
  }
  .el-dialog__header {
    height: 0.56rem;
  }
  .el-dialog__body {
    .title {
      text-align: center;
    }
    p {
      padding-top: 0.1rem;
      font-size: 0.2rem;
    }
  }
  .el-dialog__footer {
    display: flex;
    justify-content: space-around;
  }
}
</style>
