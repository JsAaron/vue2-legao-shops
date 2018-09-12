<template>
  	<div>
      <div class="tet"></div>
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
.tet {
  margin: 0;
  width: 7.5rem;
  height: 100px;
  background: #111111;
}
</style>
