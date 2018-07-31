<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边主体内容 -->
    <div class="main-container">
      <!-- <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main> -->
    </div>
  </div>
</template>

<script>
import { Sidebar } from "./components";
export default {
  components: {
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
