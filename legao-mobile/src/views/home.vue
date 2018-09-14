<template>
  <div class="home-container">
    <header>123</header>
    <div class="home-main">
      
    </div>
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
  header {
    height: 251px;
    background-color: #f7bf1f;
  }
  .home-main {
    height: 1700px;
    background-color: #ffffff;
  }
}
</style>
