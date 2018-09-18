<template>
    <div class="home-menu">
      <img @click="PopupMenuOpen" src="../../images/home/indicator.png" :class="{chooseHome:type=='home'}"/>
      <transition name="menu-fade">
        <hgroup v-if="popupMenuVisible">
          <h2><span>分享给好友</span></h2>
          <div class="menu-linear"></div>
          <h2><span>会员借还须知</span></h2>
        </hgroup>
      </transition>
      <div @click="PopupMenuClose" v-if="popupMenuVisible" class="full-popup"></div>
    </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      popupMenuVisible: false
    };
  },
  methods: {
    PopupMenuOpen() {
      this.popupMenuVisible = true;
    },
    PopupMenuClose() {
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
.home-menu {
  .full-popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #000000;
    opacity: 0.3;
  }
  img {
    position: absolute;
    width: 51px;
    height: 14px;
    left: 650px;
  }
  // 主页特定高度
  .chooseHome {
    top: 80px;
  }
  hgroup {
    position: absolute;
    z-index: 2;
    width: 300px;
    height: 193px;
    left: 434px;
    top: 126px;
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
