<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边内容 -->
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <div class="main-container">
        <!-- 顶部导航条 -->
        <div class="head-top">
          <header-top></header-top>
        </div>
        <!-- 底部内容 -->
        <app-main></app-main>
      </div>
    </el-scrollbar>
    <!-- 快速查询 -->
    <member-query></member-query>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import HeaderTop from "./Header";
import AppMain from "./AppMain";
import MemberQuery from "@/views/common/member/query";
export default {
  components: {
    HeaderTop,
    Sidebar,
    AppMain,
    MemberQuery
  }
};
</script>

<style lang="scss" >
.app-wrapper {
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  .sidebar-container,
  .main-container {
    float: left;
    height: 100%;
  }

  // 侧边栏
  .sidebar-container {
    width: 2.65rem;
    position: fixed;
    z-index: 1;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  //内容栏
  .main-container {
    margin-left: 2.65rem;
    width: 16.55rem;
    height: 100%;
    background: white;
    //重新定义高度
    .head-top {
      // height: 1.5rem;
    }
  }

  //会员卡查询
  .member-query-dialog {
  }
}
</style>
