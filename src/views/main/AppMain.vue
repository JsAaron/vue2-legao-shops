<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
/*绘制前的状态*/
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
/*移除后的状态*/
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/*绘制与销毁的中间状态*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
</style>

