<template>
  <div class="home-container">
    <!-- 头部显示 -->
    <header class="home-header">
      <head-top></head-top>
    </header>
    <!-- 主题显示 -->
    <nav class="home-nav">
      <!-- 左边logo金额 -->
      <div class="nav-left">
        <div class="logo-top">
          <figure>
            <img src="../../images/home/logo.png" width="107" />
            <p><span>长沙喜盈门范城店</span></p>
          </figure>
        </div>
        <div class="logo-bottom">
          <h1>今日付款金额</h1>
          <h2>
            <span>¥</span>
            <span>99.99</span>
          </h2>
        </div>
      </div>
      <!-- 右边导航 -->
      <div class="nav-right">
        <ul>
          <li v-for="item in routers.top" :key="item.id">
            <router-link :to="item.newPath">
              <figure :style="{opacity:item.opacity}">
                <img :src="item.newUrl"/>
                <figcaption>{{generateTitle(item.title)}}</figcaption>
              </figure>
            </router-link>
          </li>
        </ul>
        <div class="nav-border"></div>
        <ul>
          <li v-for="item in routers.middle" :key="item.id">
            <router-link :to="item.newPath">
              <figure :style="{opacity:item.opacity}">
                <img :src="item.newUrl"/>
                <figcaption>{{generateTitle(item.title)}}</figcaption>
              </figure>
            </router-link>
          </li>
          <li class="man-layout">           
            <div class="nav-man">
              <img src="../../images/home/plane.png"  />
              <img src="../../images/home/man.png"  />
            </div>
          </li>
        </ul>
        <div class="nav-border"></div>
        <ul>
          <li v-for="item in routers.bottom" :key="item.id">
           <figure :style="{opacity:item.opacity}">
              <img :src="item.newUrl"/>
              <figcaption>{{generateTitle(item.title)}}</figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import path from "path";
import { mapGetters } from "vuex";
import HeadTop from "../common/header";
import { generateTitle } from "@/utils/i18n";
export default {
  name: "home",
  data() {
    return {
      imgBaseUrl: "../../images/home/",
      currentRole: "home",
      //路由列表
      routers: {
        top: [],
        middle: [],
        bottom: []
      }
    };
  },
  methods: {
    generateTitle
  },
  computed: {
    ...mapGetters(["permissionRouters", "homeRouters"])
  },
  created() {
    const setRouters = (item, hidden) => {
      if (!item.hidden && !item.special) {
        const meta = item.children[0].meta;
        const pos = meta.group;
        if (this.routers[pos]) {
          //不能直接修改meta，重复进页面就会出错，因为会叠加
          this.routers[pos].push({
            opacity: hidden ? 0.2 : 1,
            newUrl: require("../../images/home/" + meta.url),
            newPath: hidden
              ? ""
              : path.resolve(item.path, item.children[0].path),
            title: meta.title
          });
        }
      }
    };

    //授权
    const permissionRouters = this.permissionRouters.map(function(item) {
      return item.path;
    });
    const matchRouter = item => {
      if (~permissionRouters.indexOf(item.path)) {
        return true;
      }
      return false;
    };

    this.homeRouters.forEach((item, index, array) => {
      if (matchRouter(item)) {
        //授权显示
        return setRouters(item, false);
      } else {
        //隐藏
        return setRouters(item, true);
      }
    });
  },
  components: {
    HeadTop
  }
};
</script>

<style lang="scss" scope>
.home-container {
  height: 100%;
}
.home-header {
  width: 17rem;
  height: 2rem;
  margin: 0 auto;
}
.home-nav {
  width: 17rem;
  margin: 0 auto;
  .nav-left {
    float: left;
    text-align: center;
    @include setWH(4.05rem, 7rem);
    background-color: #efb526;
    @include borderRadius(0.1rem);
    .logo-top {
      height: 50%;
      figure {
        height: 100%;
        @include flexCenter(column);
        img {
          @include setWH(1.07rem, 1.07rem);
          margin-top: -0.5rem;
          margin-bottom: 0.2rem;
        }
        p {
          @include setWH(1.91rem, 0.3rem);
          line-height: 0.3rem;
          background-color: white;
          @include borderRadius(0.2rem);
          margin: 0 auto;
          color: red;
          font-size: 0.15rem;
          font-weight: 800;
        }
      }
    }
    .logo-bottom {
      color: white;
      h1 {
        @include setWH(2.25rem, 0.5rem);
        font-size: 0.3rem;
        margin: 0 auto;
      }
      h2 {
        @include setWH(2.9rem, 1.03rem);
        font-size: 0.6rem;
        margin: 0 auto;
      }
    }
  }
  .nav-right {
    width: 12.95rem;
    height: 7rem;
    display: flex;
    flex-direction: column;
    ul {
      flex: 1;
      display: flex;
      li {
        flex: 1;
        background: #fd6861;
        margin-left: 0.05rem;
        @include borderRadius(0.1rem);
        figure {
          height: 100%;
          @include flexCenter(column);
          img {
            @include setWH(1.13rem, 1.13rem);
          }
          figcaption {
            color: white;
            margin-top: 0.1rem;
            font-size: 0.25rem;
            height: 0.3rem;
          }
        }
      }
    }
    ul:last-child {
      width: 75%;
    }
    //撑开边线
    .nav-border {
      height: 0.05rem;
    }
    .man-layout {
      margin-top: 0.05rem;
      @include setWH(2.86rem, 4.5rem);
      background: transparent;
      position: relative;
      .nav-man {
        @include flexCenter(column);
        position: absolute;
        img:first-child {
          @include setWH(1.72rem, 1.19rem);
        }
        img:last-child {
          @include setWH(3.4rem, 3.4rem);
        }
      }
    }
  }
}
</style>

