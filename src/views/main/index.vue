<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边内容 -->
    <div class="main-container">
      <!-- 顶部导航条 -->
      <head-top></head-top>
      <!-- 底部内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import HeadTop from "../common/Header";
import AppMain from "./AppMain";
export default {
  data() {
    return {};
  },
  components: {
    HeadTop,
    Sidebar,
    AppMain
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  //内容栏
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 180px;
    position: relative;
  }

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
    background-color: rgb(48, 65, 86);
  }
}
</style>
