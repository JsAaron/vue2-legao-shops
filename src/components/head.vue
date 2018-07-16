<template>
  <header id='head_top'>
    <slot name="home-title"></slot>
    <!-- 返回按钮 -->
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
    </section>
    <!-- 标题 -->
    <section class="title_head" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
    </section>

  </header>
  <!-- 切换城市 -->
</template>
<script>
export default {
  props: ["headTitle", "goBack"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include setWH(100%, 1.95rem);
}
.head_goback {
  left: 0.4rem;
  @include setWH(0.6rem, 1rem);
  line-height: 2.2rem;
  margin-left: 0.4rem;
}

.title_head {
  @include setUDRLCenter;
  width: 50%;
  color: #fff;
  text-align: center;
  .title_text {
    @include setSC(0.8rem, #fff);
    text-align: center;
    font-weight: bold;
  }
}
</style>
