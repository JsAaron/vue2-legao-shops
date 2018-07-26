<template>
  	<div>
        <h1>titie</h1>
    </div>
</template>

<script>
export default {
  data() {
    return {
      titie: "test飒飒发",
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {} //所有城市列表
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  @include sc(10rem,red);
}
</style>
