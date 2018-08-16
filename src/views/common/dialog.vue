<template>
  <div class="dialog-common">
    <el-dialog title="测试测试测试测试测试" :visible.sync="visible" :before-close="handleClose" modal=false>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
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
    handleClose() {
      this.$emit("close-DialogBox");
    },
    handleUpdate() {}
  }
};
</script>

<style lang="scss" >
.dialog-common {
  .el-dialog {
    margin-top: 0 !important;
    @include setWH(4.3rem, 2.8rem);
    @include setCenter;
    .el-dialog__title {
      @include setCenter;
    }
    .el-dialog__title,
    .el-dialog__close {
      font-size: 0.25rem;
      color: #ffffff;
    }
  }
}
</style>
