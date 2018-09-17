<template>
  <div>
    <div v-for="route in permissionRouters" :key="route.name">
       <div onlyClick v-if="!route.hidden&&route.children" class="menu-wrapper">
        <!-- 选择是否可跳转与可点击的导航 -->
        <router-link :to="resolvePath(route)">
          <el-menu-item :index="resolvePath(route)">
            <template slot="title">
              <p></p>
              <p>
                <icon :name="route.children[0].meta.icon" :scale="1.5"></icon>
                <span slot="title">{{generateTitle(route.children[0].meta.title)}}</span>
              </p>
            </template>
          </el-menu-item>
        </router-link>
       </div>
    </div>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["permissionRouters"])
  },
  methods: {
    resolvePath(route) {
      return path.resolve(route.path, route.children[0].path);
    },
    generateTitle
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  li {
    height: 0.65rem;
    border-top-left-radius: 0.6rem;
    border-bottom-left-radius: 0.6rem;
    padding: 0 !important;
    background-color: transparent !important;
    display: flex;
    align-items: center;
    &:hover {
      p {
        span {
          color: #eeb339;
        }
      }
    }
    p {
      color: white;
      position: absolute;
      z-index: 2;
      span {
        color: white;
        font-weight: 800;
        margin-left: 0.05rem;
        text-align: center;
      }
      &:last-child {
        margin-left: 0.2rem;
      }
      &:first-child {
        border-top-left-radius: 0.6rem;
        border-bottom-left-radius: 0.6rem;
        height: 100%;
        width: 100%;
        z-index: 1;
        opacity: 0.3;
      }
    }
    &.is-active {
      p {
        color: #eeb339;
        &:first-child {
          background-color: #111111;
        }
      }
    }
  }
}
</style>
