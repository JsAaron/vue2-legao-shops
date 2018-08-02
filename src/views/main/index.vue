<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边主体内容 -->
    <div class="main-container">
      <!-- 导航条 -->
      <navbar></navbar>
      <!-- <tags-view></tags-view>
      <app-main></app-main>  -->
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default {
  components: {
    Navbar,
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
  // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
}
</style>
