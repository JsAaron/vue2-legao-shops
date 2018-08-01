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
import { Sidebar, Navbar } from "./components";
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
}
</style>
