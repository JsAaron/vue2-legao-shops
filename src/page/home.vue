<template>
  <div>
    <header class="header">
      <!-- 城市定位 -->
      <div class="city_tip">
        长沙
      </div>
    </header>
  </div>
</template>
<script>
import { cityGuess, hotcity, groupcity } from '../service/getData'
export default {
  data() {
    return {
      groupcity: {}
    }
  },
  //el 被新创建的 vm.$el 替换
  //并挂载到实例上去之后调用该钩子
  mounted() {
    //获取当前城市城市
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    })
    // //获取热门城市
    // hotcity().then(res => {
    //   this.hotcity = res;
    // })
    // //获取所有城市
    // groupcity().then(res => {
    //   this.groupcity = res;
    // })
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';

</style>
