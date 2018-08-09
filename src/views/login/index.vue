
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left"></div>
      <div class="login-right">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
          <!-- 表单标题 -->
          <div class="title-container">
            <h2 class="title">{{$t('login.title')}}</h2>
            <h4 class="subtitle">{{$t('login.subtitle')}}</h4>
          </div>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <span class="svg-container">
              <icon name="user" :scale="1.5"></icon>
            </span>
            <el-input name="username" type="text" v-model="loginForm.username " autoComplete="on " :placeholder="$t( 'login.username') " />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <span class="svg-container">
              <icon name="password" :scale="1.5"></icon>
            </span>
            <el-input name="password" :type="passwordType " @keyup.enter.native="handleLogin " v-model="loginForm.password " autoComplete="on " :placeholder="$t( 'login.password') " />
            <!-- 密码可见 -->
            <span class="show-pwd" @click="showPwd">
              <icon name="eye" :scale="1.5"></icon>
            </span>
          </el-form-item>
          <!-- 底部 -->
          <div class="foot">
            <!-- 忘记密码 -->
            <div class="forgot-password">
              <span @click="forgotPassword">忘记密码</span>
            </div>
            <!--  登录按钮 -->
            <el-button type="primary" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isvalidUsername } from "@/utils/validate";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于六位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "1111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },
  methods: {
    ...mapActions(["RECORD_USERINFO"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.RECORD_USERINFO(this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              console.log("登录错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    forgotPassword() {
      console.log(123);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 27px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 27px;
    }
  }
  .el-button--primary {
    border-color: antiquewhite;
    // box-shadow: 2px 2px 2px 2px antiquewhite;
    span {
      color: white;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("../../images/login/background.png");
  background-size: 100% 100%;

  .login-box {
    width: 900px;
    height: 550px;
    @include setCenter;
    display: flex;
    div {
      flex: 1;
      @include borderRadius(5px);
    }
    .login-left {
      background-image: url("../../images/login/landing.png");
      background-size: 100% 100%;
    }
    .login-right {
      background-color: white;
      position: relative;
    }
    .login-form {
      @include setCenter;
      width: 70%;
    }
    .title-container {
      margin-bottom: 10px;
      h2 {
        font-weight: 800;
        margin-bottom: 5px;
        font-size: 1.8rem;
      }
      .subtitle {
        color: #9c9c9c;
        font-size: 1.1rem;
      }
    }
    .show-pwd {
      cursor: pointer;
    }
    .forgot-password {
      display: inline-block;
      cursor: pointer;
      @include setFontColor(0.7rem, #9c9c9c);
    }
    .el-form-item {
      border-bottom: 1px solid rgb(200, 200, 200);
    }
    .foot {
      @include setFJ;
      .el-button {
        width: 150px;
        height: 45px;
      }
    }
  }
}
</style>

