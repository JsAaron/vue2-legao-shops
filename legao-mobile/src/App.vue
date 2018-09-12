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
@import "./styles/common";
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>

