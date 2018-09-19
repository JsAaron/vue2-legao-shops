<template>
    <header class="head-top van-hairline--bottom">
      <!-- 返回按钮 -->
      <van-icon class="head-arrow" name="arrow-left" color="#F8A113" />
      <!-- 标题 -->
      <section class="head-title">
        <span class="head-title-text">【钻石黄金怀远卡】</span>
      </section>
      <!-- 菜单 -->
      <head-menu class="head-menu"></head-menu>
    </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headMenu from "@/views/common/headMenu";
export default {
  components: { headMenu },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.head-top {
  height: 90px;
  width: 100vw;
  @include flexCenter;
  &::after {
    border-color: #bbbbbb;
  }
  .head-title-text {
    font-size: 33.99px;
  }
  .head-arrow {
    position: absolute;
    left: 33px;
  }
  .head-menu {
    @include flexCenter;
  }
}
</style>
