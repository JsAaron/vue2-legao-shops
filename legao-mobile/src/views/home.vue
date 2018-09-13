<template>
  <div class="home-container">
    <p class="a"></p>
    <p class="b">11</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {} //所有城市列表
    };
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  .a {
    margin-top: 100px;
    width: 3.75rem;
    height: 3.75rem;
    border: 1px solid red;
  }
  .b {
    margin-top: 100px;
    width: 375px;
    height: 200px;
    border: 1px solid red;
    @include px2px(font-size, 16);
  }
}
</style>
