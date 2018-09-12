<template>
  <div>
    <div v-for="route in staticRouters" :key="route.name">
       <div onlyClick v-if="!route.hidden&&route.children" class="hidden-menu-wrapper">
          <el-menu-item v-if="route.onlyClick" :index="resolvePath(route)" @click="handleOpen(route,$event)" >
            <template slot="title">
              <p>
                <icon :name="route.children[0].meta.icon" :scale="1.5"></icon>
                <span slot="title">{{generateTitle(route.children[0].meta.title)}}</span>
              </p>
          </template>
        </el-menu-item>
       </div>
    </div>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["staticRouters"])
  },
  methods: {
    ...mapActions(["MemberQueryOpen"]),
    handleOpen(route, $event) {
      //如果是快速查询
      if (route.path === "/member-query") {
        this.MemberQueryOpen();
      }
    },
    resolvePath(route) {
      return path.resolve(route.path, route.children[0].path);
    },
    generateTitle
  }
};
</script>

<style lang="scss" scoped>
.hidden-menu-wrapper {
  li {
    height: 0.7rem;
    padding: 0 !important;
    background-color: transparent !important;
    &:hover {
      p {
        span {
          color: #eeb339;
        }
      }
    }
    p {
      color: white;
      span {
        color: white;
        font-weight: 800;
        margin-left: 0.05rem;
        text-align: center;
      }
      &:last-child {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
