<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <bar-item :routes="permission_routers"></bar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
//菜单列表
import BarItem from "./barItem";

export default {
  components: { BarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  }
};
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
