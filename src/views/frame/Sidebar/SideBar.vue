<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item 
          :index="resolvePath(onlyOneChild.path)" 
          :class="{'submenu-title-noDropdown':!isNest}">
            <icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" :scale="1.5"></icon>
            <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
        </el-menu-item>
    </router-link>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";
export default {
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    /**
     * 解析出路由地址
     */
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
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
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.menu-wrapper :hover {
  background: #ffffff;
  opacity: 0.3;
}
.el-menu-item span {
  color: white;
  font-weight: 800;
  margin-left: 0.05rem;
}
</style>
