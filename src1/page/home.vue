<template>
  <div>
      <span>{{homeTitle}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgBaseUrl, //图片域名地址
      geohash: "28.19031,113.00131",
      homeTitle: "长沙中国城戴斯酒店",
      foodTypes: [] // 食品分类列表
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";
div {
  background-color:red;
  span {
    color: red;
  }
}
</style>
