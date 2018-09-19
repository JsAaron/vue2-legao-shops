<template>
    <header class="head-top van-hairline--bottom">
      <!-- 返回按钮 -->
      <van-icon  @click="$router.go(-1)" class="head-arrow" name="arrow-left"  />
      <!-- 标题 -->
      <section class="head-title">
        <span class="head-title-text">{{title}}</span>
      </section>
      <!-- 菜单 -->
      <head-menu class="head-menu"></head-menu>
    </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headMenu from "@/views/common/headMenu";
export default {
  props: ["title"],
  components: { headMenu },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 90px;
  width: 100vw;
  @include flexCenter;
  // 白色版
  &.white {
    background-color: #f7bf1f;
    .head-title {
      color: #ffffff;
    }
    .head-arrow {
      color: #ffffff;
    }
  }
  &::after {
    border-color: #bbbbbb;
  }
  .head-title-text {
    font-size: 33.99px;
  }
  .head-arrow {
    color: #f8a113;
    position: absolute;
    left: 33px;
  }
  .head-menu {
    @include flexCenter;
  }
}
</style>
