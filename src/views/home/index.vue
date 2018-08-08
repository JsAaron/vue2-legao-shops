<template>
  <div class="home-container">
    <!-- 头部显示 -->
    <header class="home-header">
      <head-top></head-top>
    </header>
    <!-- 主题显示 -->
    <nav class="home-nav">
      <div class="nav-layer">
        <div class="nav-left">
          <figure>
            <img src="../../images/home/logo.png" width="107" />
            <p><span>长沙喜盈门范城店</span></p>
          </figure>
          <section>
            <h1>今日付款金额</h1>
            <div>
              <span>¥</span>
              <span>99.99</span>
            </div>
          </section>
        </div>
        <div class="nav-right">
          <ul>
            <li><div>1</div></li>
            <li><div>2</div></li>
            <li><div>3</div></li>
            <li><div>10</div></li>
          </ul>
          <div class="nav-border"></div>
          <ul>
            <li><div>4</div></li>
            <li><div>5</div></li>
            <li><div>6</div></li>
            <li class="man-layout">           
              <div class="nav-man">
                <img src="../../images/home/plane.png"  />
                <img src="../../images/home/man.png"  />
              </div>
            </li>
          </ul>
          <div class="nav-border"></div>
          <ul>
            <li><div>7</div></li>
            <li><div>8</div></li>
            <li><div>9</div></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";
import { mapGetters } from "vuex";
import HeadTop from "../common/header";

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
  created() {},
  components: {
    HeadTop
  }
};
</script>

<style lang="scss" scope>
.home-container {
  height: 100%;
  background-size: 100% 100%;
  background-image: url("../../images/login/background.png");
}
.home-header {
  width: 85%;
  margin: 0 auto;
}
.home-nav {
  margin-top: 20px;
  height: 80%;
  .nav-layer {
    width: 85%;
    height: 100%;
    margin: 0 auto;
  }
  .nav-left {
    width: 25%;
    float: left;
    text-align: center;
    height: 80%;
    background-color: #efb526;
    @include borderRadius(10px);
    figure {
      margin-top: 50px;
    }
    p {
      background-color: white;
      @include borderRadius(20px);
      width: 60%;
      margin: 0 auto;
      margin-top: 10px;
      padding: 3px;
      color: red;
      font-size: 1rem;
      font-weight: 800;
    }
    section {
      margin-top: 50px;
      color: white;
      h1 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      span {
        font-size: 3rem;
        font-weight: bold;
      }
    }
  }
  .nav-right {
    width: 75%;
    height: 80%;
    display: flex;
    flex-direction: column;
    ul {
      flex: 1;
      display: flex;
      li {
        flex: 1;
        background: #fd6861;
        margin-left: 5px;
        @include borderRadius(10px);
      }
    }
    ul:last-child {
      width: 75%;
    }
    .nav-border {
      height: 5px;
    }
    .man-layout {
      background: transparent;
      .nav-man {
        width: 100%;
        text-align: center;
        img {
          width: 80%;
          display: block;
          margin: 0 auto;
        }
        img:first-child {
          width: 50%;
        }
      }
    }
  }
}
</style>

