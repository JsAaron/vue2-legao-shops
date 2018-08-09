`<template>
  <el-menu class="legao-navbar" mode="horizontal">
    <h2>读酷儿童智力馆门店管理系统</h2>
    <breadcrumb class="breadcrumb-container"></breadcrumb> 

    <!-- 右边菜单，有退出 -->
    <div class="right-menu">
      <span class="title">长沙喜盈门范城店</span>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.switchUser')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Breadcrumb from "./Breadcrumb";

export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    ...mapActions(["TOGGLE_SIDEBAR", "LOGOUT"]),
    /**
     * 切换首页图标
     */
    toggleSideBar() {
      this["TOGGLE_SIDEBAR"]();
    },
    /**
     * 退出登录
     */
    logout() {
      this["LOGOUT"]().then(() => {
        location.reload();
      });
    }
  }
};
</script>
<style lang="scss">
.legao-navbar {
  width: 100%;
  // 清空背景颜色
  background-color: transparent;
  border: none;
}
</style>

<style lang="scss" scoped>
.legao-navbar {
  height: 2rem;
  color: white;
  h2 {
    font-size: 0.6rem;
    text-align: center;
    padding: 0.2rem;
  }
  //导航
  .breadcrumb-container {
    float: left;
  }
  //右边菜单
  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 0.2rem;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 0.3rem;
    }
    //切换退出按钮
    .avatar-container {
      height: 0.5rem;
      margin-right: 0.3rem;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 0.05rem;
        position: relative;
        .user-avatar {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>
