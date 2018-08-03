<template>
  <section class="bar-logo">
    <hgroup>
      <header><img src="../../../images/sidebar.png" class="imation_opactiy" /></header>
    </hgroup>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <bar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></bar-item>
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import BarItem from "./barItem";

export default {
  components: { BarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  }
};
</script>

<style lang="scss" scoped>
.bar-logo {
  hgroup {
    width: 100%;
    height: 100px;
    @include setFJ(center);
    margin-top: 30px;
  }
}
// .scrollbar-wrapper {
//   overflow-x: hidden !important;
//   .el-scrollbar__view {
//     height: 100%;
//   }
// }
</style>
