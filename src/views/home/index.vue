<template>
  <div class="home-container">
    <!-- 头部显示 -->
    <header class="home-header">
      <h1>今日付款金额</h1>
      <div>
        <span>¥</span>
        <span>99.99</span>
      </div>
      <div class="header-border"></div>
    </header>
    <!-- 主题显示 -->
    <section class="home-nav">
      <ul>
        <!-- 排除home -->
        <li v-for="(route, index) in permission_routers" :key="index" v-if="!route.hidden&&route.children&&route.children[0].name!=='home'">
          <router-link to="/foo" tag="div" class="img-wrapper" :to="resolvePath(route.path,route.children[0].path)">
            <img src="../../images/home-nav.png" />
            <p>{{generateTitle(route.children[0].meta.title)}}</p>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";
import { mapGetters } from "vuex";
// console.log(12443);
export default {
  name: "home",
  data() {
    return {
      currentRole: "home"
    };
  },
  methods: {
    generateTitle,
    resolvePath(basePath, ...paths) {
      return path.resolve(basePath, ...paths);
    }
  },
  computed: {
    ...mapGetters(["permission_routers"])
  },
  created() {}
};
</script>

<style lang="scss" scope>
.home-header {
  text-align: center;
  margin-top: 30px;
  h1 {
    font-size: 2rem;
    padding: 10px;
  }
  span {
    font-size: 1.5rem;
    font-weight: 800;
  }
  .header-border {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
}
.home-nav {
  margin-top: 50px;
  ul {
    // padding-left: 20px;
    // padding-right: 20px;
    li {
      width: 20%;
      float: left;
      text-align: center;
      margin-bottom: 80px;
    }
  }
  .img-wrapper {
    background: #ccc;
    position: relative;
    width: 80%;
    margin-left: 10%;
    img {
      width: 100%;
      vertical-align: middle;
      @include borderRadius(10px);
    }
    p {
      @include setCenter;
      @include setFontColor(1.5rem, white);
      font-weight: 800;
      width: 100%;
    }
  }
}
</style>

