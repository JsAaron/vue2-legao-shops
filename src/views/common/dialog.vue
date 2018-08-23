<template>
  <div class="dialog-common">
    <el-dialog :title="title" :visible.sync="visible" :modal="modal" :before-close="dialogClose">
      <!-- 内容 -->
      <slot name="main"></slot>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "visible", "modal"],
  methods: {
    dialogClose() {
      this.$emit("close-self");
    }
  }
};
</script>

