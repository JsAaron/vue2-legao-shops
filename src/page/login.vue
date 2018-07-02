<template>
  <!--  注册页面 -->
  <div class="loginContainer">
    <head-top>
      <div slot="changeLogin" class="change_login">{{loginWay}}</div>
    </head-top>
    <!-- 手机验证 -->
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="填入手机号码注册" name="phone" maxlength="11" v-model="phoneNumber">
        <button :class="{right_phone_number:rightPhoneNumber}">获取验证码</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <!-- 联动 -->
    <section class="loginDistpicker">
      <h4 class="city_title">门店定位(<span>选中切换</span>)</h4>
      <v-distpicker :province="province" :city="city" :area="area" @selected="onSelected"></v-distpicker>
      <h4 class="choose_shop">选择门店</h4>
    </section>
    <!-- 注册用户 -->
    <div class="register_user">注册</div>
  </div>
</template>
<script>
import headTop from 'components/head'
import VDistpicker from 'v-distpicker'
import { setStore, getStore } from 'src/utils/store'
import { getlocation, getAddress } from 'src/utils/location'

export default {
  data() {
    return {
      loginWay: '注册用户',
      phoneNumber: null, //电话号码
      mobileCode: null, //短信验证码
      province: '', //省会
      city: '', //城市
      area: '' //区域
    }
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.phoneNumber)
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
    var $self = this
    getAddress(longitude, latitude)
      .then(function(data) {
        $self.province = data.province
        $self.city = data.city
        $self.area = data.district
      })
  },
  methods: {
    onSelected(data) {
      this.province = data.province.value
      this.city = data.city.value
      this.area = data.area.value
    },
  },
  components: {
    headTop,
    VDistpicker
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';
.loginContainer {
  padding-top: 1.95rem;
  p,
  span,
  input {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.change_login {
  position: absolute;
  @include ct;
  right: 0.75rem;
  @include sc(.7rem, #fff);
}





/* 手机信息 */

.loginForm {
  background-color: #fff;
  margin-top: .6rem;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: .6rem .8rem;
    border-bottom: 1px solid #f1f1f1;
    input {
      @include sc(.7rem, #666);
    }
    button {
      @include sc(.65rem, #fff);
      font-family: Helvetica Neue, Tahoma, Arial;
      padding: .28rem .4rem;
      border: 1px;
      border-radius: 0.15rem;
    }
    /* 验证码图片，上颜色 */
    .right_phone_number {
      background-color: #4cd964;
    }
  }
  .phone_number {
    padding: .3rem .8rem;
  }
}





/* 注册按钮 */

.register_user {
  margin: 1rem 1rem;
  @include sc(.7rem, #fff);
  background-color: #4cd964;
  padding: .5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}

</style>
<style lang="scss">
@mixin setTitle {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid #e4e4e4; // border-bottom: 1px solid #e4e4e4;
  font: 0.55rem/1.45rem "Helvetica Neue";
}

.loginDistpicker {
  background-color: #fff;
  margin-top: .4rem;
  .city_title {
    @include setTitle;
    span {
      font-weight: 600;
    }
  }
  .choose_shop {
    margin-top: 0.4rem;
    @include setTitle;
  }
  .distpicker-address-wrapper {
    display: flex;
    justify-content: center;
    /*水平居中*/
    align-items: center;
    /*垂直居中*/
    select {
      font-size: .6rem;
      padding: 0;
      flex: 1;
      max-width: 34%;
      text-align: center;
    }
  }
}

</style>
