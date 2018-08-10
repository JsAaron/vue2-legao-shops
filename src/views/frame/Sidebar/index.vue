<template>
  <div class="sidebar-wrapper">
    <!-- logo -->
    <header>
      <img src="../../../images/logo.png" />
      <div>
        <p></p>
        <span>长沙喜盈门范城店</span>
      </div>

    </header>
    <!-- 列表 -->
    <!-- https://qiqihaobenben.github.io/Front-End-Basics/project/el-scrollbar -->
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu mode="vertical" 
        :show-timeout="200" 
        :default-active="$route.path" 
        background-color="transparent" 
        text-color="white" >
        <sideBar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sideBar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sideBarItem from "./SideBar";

export default {
  components: { sideBarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  }
};
</script>

<style  lang="scss">
.sidebar-wrapper {
  .el-menu {
    border: none;
  }
}
</style>


<style lang="scss" scoped>
.sidebar-wrapper {
  header {
    @include flexCenter(column);
    @include setWH(2.19rem, 1.39rem);
    margin-top: 0.8135rem;
    margin-right: auto;
    margin-left: auto;
    img {
      @include setWH(0.87rem, 0.68rem);
      padding: 0.12rem;
    }
    div {
      position: relative;
      p {
        @include setWH(2.19rem, 0.4rem);
        @include borderRadius(0.2rem);
        background: #ffffff;
        opacity: 0.36;
      }
      span {
        @include flexCenter;
        position: absolute;
        top: 0;
        left: 0;
        @include setWH(2.19rem, 0.4rem);
        @include setFontColor(0.16rem, white);
      }
    }
  }
  .scrollbar-wrapper {
    margin-top: 0.3rem;
    width: 100%;
    height: 6.68rem;
    margin-left: 0.6rem;
  }
}
</style>

