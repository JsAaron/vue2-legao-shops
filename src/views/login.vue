<template>
  	<div class="login-page">
	  	<transition name="form-fade" mode="in-out">

	  		<section class="form-contianer" v-show="showLogin">

		  		<div class="manage-tip">
		  			<span class="title">乐高商铺端管理系统</span>
		  		</div>

		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">

            <el-form-item prop="username">
              <span class="fa-tips"><i class="fa fa-user"></i></span>
              <el-input class="area" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <span class="fa-tips"><i class="fa fa-lock"></i></span>
              <el-input class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
            </el-form-item>

				  </el-form>

	  		</section>
	  	</transition>
  	</div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: true,
      ip: ""
    };
  },
  methods: {
    submitForm(loginForm) {
      //用户登录的接口
      let userinfo = this.loginForm;
      let data = {
        ip: this.ip,
        url: "http://ip.taobao.com/service/getIpInfo.php?ip="
      };
      console.log(this.loginForm)
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background: url(../assets/images/bg9.jpg) no-repeat center center;
  .form-contianer {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 20%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .submit_btn {
      width: 100%;
      font-size: 16px;
      letter-spacing: 20px;
    }
    //标题
    .manage-tip {
      margin-bottom: 20px;
      .title {
        font-family: cursive;
        font-weight: bold;
        font-size: 26px;
        color: #fff;
      }
      .logo {
        width: 60px;
        height: 60px;
      }
    }
    //登录框
    .loginForm {
      background-color: #fff;
      padding: 20px;
      border-radius: 3px;
      box-shadow: 5px 5px 10px #01144c;
      .fa-tips {
        position: absolute;
        top: 0px;
        left: 10px;
        z-index: 20;
        color: #ff7c1a;
        font-size: 18px;
      }
    }
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
