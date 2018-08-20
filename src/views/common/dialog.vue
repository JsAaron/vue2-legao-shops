<template>
  <div class="dialog-common">
    <el-dialog :title="title" :visible.sync="visible" :before-close="dialogClose">
      <!-- 内容 -->
      <slot name="main"></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "visible"],
  methods: {
    dialogClose() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.dialog-common {
  .el-dialog {
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
  .el-dialog__header {
    height: 0.56rem;
  }
  .el-dialog__body {
    width: auto !important;
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
