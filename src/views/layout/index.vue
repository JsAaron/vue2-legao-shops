<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <sidebar class="app-sidebar"></sidebar>
    <!-- 右边内容 -->
    <el-scrollbar ref="appWrapper">
      <div class="app-container">
        <div class="head-top"><header-top></header-top></div>
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
import AppMain from "./Main";
import MemberQuery from "@/views/common/member/query";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    HeaderTop,
    Sidebar,
    AppMain,
    MemberQuery
  },
  mounted() {
    this.SaveScrollHandle(() => {
      this.$refs.appWrapper.update();
    });
  },
  beforeDestroy() {
    this.clearScrollHandle();
  },
  methods: {
    ...mapActions(["SaveScrollHandle", "clearScrollHandle"])
  }
};
</script>

<style lang="scss" >
.app-wrapper {
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
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
  overflow: hidden;
  .app-sidebar,
  .app-container {
    float: left;
    height: 100%;
  }

  // 侧边栏
  .app-sidebar {
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
  .app-container {
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
