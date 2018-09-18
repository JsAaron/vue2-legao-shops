<template>
  <transition name="router-fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss" scoped>
#app {
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.5s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>

