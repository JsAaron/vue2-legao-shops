<template>
  <div>
    <!-- 头部 -->
    <head-top signin-up='home'>
      <span slot='logo' class="head_logo">ele.me</span>
    </head-top>
    <!-- 定位 -->
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
  </div>
</template>
<script>
import headTop from '../components/head'
import { cityGuess } from '../service/getData'
export default {
  data() {
    return {
      guessCity: '',
      guessCityid: '', //当前城市id
    }
  },
  //el 被新创建的 vm.$el 替换
  //并挂载到实例上去之后调用该钩子
  mounted() {
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    })
  },
  components: {
    headTop
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';
.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
}

.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .city_tip {
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }
  .guess_city {
    @include fj;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(.6rem, .6rem);
      fill: #999;
    }
  }
}

</style>
