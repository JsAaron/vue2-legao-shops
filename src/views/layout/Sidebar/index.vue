<template>
  <div class="sidebar-wrapper">
    <!-- logo -->
    <header>
      <img src="../../../images/common/logo.png" />
      <div>
        <p></p>
        <span>{{shopName}}</span>
      </div>
    </header>
    <!-- 列表 -->
    <!-- https://qiqihaobenben.github.io/Front-End-Basics/project/el-scrollbar -->
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu mode="vertical" 
        :default-active="$route.path" 
        background-color="transparent" 
        active-text-color="#eeb339"
        text-color="white" >
        <sideBar-item></sideBar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sideBarItem from "./SideBar";

export default {
  computed: {
    ...mapGetters(["shopName"])
  },
  components: { sideBarItem }
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
    margin-top: 0.6135rem;
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
    height: 80%;
    padding-left: 0.45rem;
  }
}
</style>

