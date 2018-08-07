<template>
  <section class="sidebar-wrapper">
    <!-- logo -->
    <header>
      <img src="../../../images/sidebar.png" />
      <p>
        <span>长沙喜盈门范城店</span>
      </p>
    </header>
    <!-- 列表 -->
    <!-- https://qiqihaobenben.github.io/Front-End-Basics/project/el-scrollbar -->
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu mode="vertical" 
        :show-timeout="200" 
        :default-active="$route.path" 
        background-color="#304156" 
        text-color="#bfcbd9" 
        active-text-color="#409EFF">
        <sideBar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sideBar-item>
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import sideBarItem from "./sideBarItem";

export default {
  components: { sideBarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  }
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  header {
    text-align: center;
    width: 100%;
    height: 100px;
    margin-top: 40px;
    margin-bottom: 30px;
    img {
      margin-bottom: 5px;
    }
    p {
      background-color: darkgrey;
      width: 80%;
      margin: 0 auto;
      height: 30px;
      @include borderRadius(10px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      @include setFontColor(0.8rem, white);
    }
  }
  .scrollbar-wrapper {
    height: 100%;
    .el-scrollbar__warp {
      overflow: y;
    }
  }
}
</style>

