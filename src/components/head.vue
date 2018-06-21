<template>
  <header id='head_top'>
    <slot name='logo'></slot>
    <router-link to="userInf" class="head_login">
      <span class="login_span">登录|注册</span>
    </router-link>
  </header>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 1.95rem);
}

.head_login {
  right: 0.55rem;
  @include sc(0.65rem, #fff);
  @include ct;
  .login_span {
    color: #fff;
  }
  .user_avatar {
    fill: #fff;
    @include wh(.8rem, .8rem);
  }
}

</style>
