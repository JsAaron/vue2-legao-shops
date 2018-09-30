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
        <mainBar-item v-for="route in mainRouters" :key="route.name" :item="route" :base-path="route.path"></mainBar-item>
      </el-menu>
      <el-menu mode="vertical" 
        background-color="transparent" 
        active-text-color="#eeb339"
        text-color="white" >
        <staticBar-item></staticBar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainBarItem from "./mainBar";
import StaticBarItem from "./staticBar";
export default {
  computed: {
    ...mapGetters(["shopName", "mainRouters"])
  },
  components: { MainBarItem, StaticBarItem }
};
</script>

<style  lang="scss">
.sidebar-wrapper {
  .el-menu {
    border: none;
  }
}
</style>


<style lang="scss" scped>
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
        @include setWH(2rem, 0.4rem);
        @include borderRadius(0.2rem);
        background: #ffffff;
        opacity: 0.36;
      }
      span {
        @include flexCenter;
        position: absolute;
        top: 0;
        left: 0;
        @include setWH(2rem, 0.4rem);
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

