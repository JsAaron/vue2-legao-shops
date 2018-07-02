<template>
  <!--  注册页面 -->
  <div class="loginContainer">
    <head-top :head-title="loginWay">
      <div slot="changeLogin" class="change_login">{{loginWay}}</div>
    </head-top>
    <!-- 手机验证 -->
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">

      </section>
    </form>
  </div>
</template>
<script>
import headTop from 'components/head'
import { setStore, getStore } from 'src/utils/store'
import { getlocation, getAddress } from 'src/utils/location'

export default {
  data() {
    return {
      loginWay: '注册用户'
    }
  },
  mounted() {
    var longitude = getStore('longitude') || 112.995684
    var latitude = getStore('latitude') || 28.193636
    if (!longitude && !latitude) {
      getlocation().then(function(data) {
        if (data) {
          setStore('longitude', v.longitude)
          setStore('latitude', v.latitude)
        }
      })
    }
    getAddress(longitude, latitude)
      .then(function(address) {
        console.log(address)
      })
  },
  components: {
    headTop
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';

</style>
