<template>
  <header id='head_top'>
    <slot name="home-title"></slot>
  </header>
  <!-- 切换城市 -->
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include setWH(100%, 1.95rem);
}

</style>
