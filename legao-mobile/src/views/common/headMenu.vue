<template>
    <div class="home-menu">
      <div class="home-icon" @click="PopupMenuOpen" :class="{chooseHome:type=='home'}"></div>
      <transition name="menu-fade">
        <hgroup v-if="popupMenuVisible" :class="{chooseHgroup:type=='home'}">
          <h2 @click="shareFriend"><span>分享给好友</span></h2>
          <div class="menu-linear"></div>
          <h2><span>会员借还须知</span></h2>
        </hgroup>
      </transition>
      <div @click="PopupMenuClose" v-if="popupMenuVisible" class="full-popup"></div>

      <!-- 弹出 -->
      <van-popup v-model="shareVisible" position="bottom" :overlay="false">
        <p>分享到</p>
        <van-row>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>微信好友</figcaption>
            </figure>
          </van-col>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>朋友圈</figcaption>
            </figure>
          </van-col>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>QQ好友</figcaption>
            </figure>
          </van-col>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>QQ空间</figcaption>
            </figure>
          </van-col>        
        </van-row>
        <van-row>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>新浪微博</figcaption>
            </figure>
          </van-col>
          <van-col span="6">
            <figure>
              <img src="../../images/home/indicator.png"/>
              <figcaption>复制</figcaption>
            </figure>
          </van-col>      
        </van-row>
        <p class="cancel van-hairline--top">取消</p>
      </van-popup>
    </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      shareVisible: false,
      popupMenuVisible: false
    };
  },
  methods: {
    shareFriend() {
      this.shareVisible = true;
    },
    shareClose() {
      this.shareVisible = false;
    },
    PopupMenuOpen() {
      this.popupMenuVisible = true;
    },
    PopupMenuClose() {
      this.shareVisible = false;
      this.popupMenuVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.5s;
}
.menu-fade-enter,
.menu-fade-leave-to {
  opacity: 0;
}
.white .home-menu .home-icon {
  background-image: url("../../images/notice/indicator.png");
}
.home-menu {
  .van-popup {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 606px;
    z-index: 3;
    > p {
      text-align: center;
      margin-top: 45px;
      font-size: 32px;
    }
    .van-row {
      margin-top: 41px;
      text-align: center;
      width: 90%;
      margin-left: 5%;
      img {
        width: 100px;
        height: 100px;
      }
      figcaption {
        font-size: 24px;
        color: #6a6a6a;
      }
    }
    .cancel {
      @include flexCenter;
      height: 105px;
      width: 90%;
      margin-left: 5%;
      color: #6a6a6a;
      &::after {
        border-color: #d1d1d1;
      }
    }
  }

  .home-icon {
    position: absolute;
    width: 51px;
    height: 14px;
    left: 650px;
    background-size: 100% 100%;
    background-image: url("../../images/home/indicator.png");
  }
  // 主页特定高度
  .chooseHome {
    top: 80px;
  }
  .full-popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #000000;
    opacity: 0.5;
  }
  // 主页特定高度
  .chooseHgroup {
    top: 126px;
  }
  hgroup {
    position: absolute;
    z-index: 2;
    width: 300px;
    height: 193px;
    left: 434px;
    top: 80px;
    background-image: url("../../images/home/popup.png");
    background-size: 100% 100%;
    padding-top: 14px;
    h2 {
      @include flexCenter;
      height: 50%;
      font-size: 26px;
    }
    .menu-linear {
      width: 261px;
      margin: 0 auto;
      height: 2px;
      background-color: #bcbcbc;
    }
  }
}
</style>
