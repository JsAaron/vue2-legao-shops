<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边内容 -->
    <div class="main-container">
      <!-- 顶部导航条 -->
      <div class="head-top">
        <head-top></head-top>
      </div>
      <!-- 底部内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import HeadTop from "../common/header";
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
  height: 100%;
  width: 100%;
  .sidebar-container,
  .main-container {
    float: left;
    height: 100%;
  }
  // 侧边栏
  .sidebar-container {
    width: 2.65rem;
  }
  //内容栏
  .main-container {
    width: 16.55rem;
    background-color: white;
    //重新定义高度
    .head-top {
      height: 1.5rem;
    }
  }
}
</style>
