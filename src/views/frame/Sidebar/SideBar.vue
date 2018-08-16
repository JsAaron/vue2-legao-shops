<template>
  <div>
    <div v-for="route in permission_routers" :key="route.name">
       <div v-if="!route.hidden&&route.children" class="menu-wrapper">
        <router-link :to="resolvePath(route)">
          <el-menu-item :index="resolvePath(route)" >
            <template slot="title">
              <icon :name="route.children[0].meta.icon" :scale="1.5"></icon>
              <span slot="title">{{generateTitle(route.children[0].meta.title)}}</span>
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
    ...mapGetters(["permission_routers"])
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    /**
     * 解析出路由地址
     */
    resolvePath(route) {
      return path.resolve(route.path, route.children[0].path);
    },
    generateTitle
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
.menu-wrapper li {
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
}
.menu-wrapper li:hover {
  // background: transparent !important;
  opacity: 0.5;
}
.el-menu-item span {
  color: white;
  font-weight: 800;
  margin-left: 0.05rem;
  text-align: center;
}
</style>
