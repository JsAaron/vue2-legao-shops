<template>
  <div id="app">
    <router-view></router-view>
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
  background-image: url("./images/background.png");
  background-size: 100% 100%;
}
</style>

