<template>
  <div>
    <h1>{{homeTitle}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      geohash: "28.19031,113.00131",
      homeTitle: "长沙中国城戴斯酒店2",
      foodTypes: [] // 食品分类列表
    };
  }
};
</script>

<style lang="scss" scoped>
div {
  @include setWH(100%, auto);
  background-color: blue;
  h1 {
    color: red;
  }
}
</style>
