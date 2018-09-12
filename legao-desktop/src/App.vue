<template>
  <div id="app">
		<transition name="router-fade" mode="out-in">
      <router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss" scoped>
#app {
  @include setWH(100%, 100%);
  background-image: url("./images/common/background.png");
  background-size: 100% 100%;
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
}
</style>

