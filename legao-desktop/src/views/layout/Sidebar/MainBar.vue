<template>
  <div class="menu-wrapper">
    <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <p></p>
        <p>
          <icon :name="onlyOneChild.meta.icon" :scale="1.5"></icon> 
          <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">
            {{generateTitle(onlyOneChild.meta.title)}}
          </span>
        </p>
      </el-menu-item>
    </router-link>
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <p></p>
        <p>
          <icon :name="item.meta.icon" :scale="1.5"></icon> 
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span> 
        </p>
      </template>
      <!-- 有子列表循环 -->
      <template v-for="child in item.children" v-if="!child.hidden">
        <router-link :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <icon :name="item.meta.icon" :scale="1.5"></icon> 
            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n.js";

export default {
  props: {
    item: {
      type: Object,
      required: true
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
    test(a) {
      console.log(a);
    },
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        this.onlyOneChild = item;
        return true;
      });
      // 子导航的数量
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    },
    generateTitle
  }
};
</script>

<style lang="scss" >
.sidebar-wrapper {
  .menu-wrapper .el-submenu {
    .el-submenu__title {
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
      background-color: transparent;
      padding: 0 !important;
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
        &:nth-child(2) {
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
    }
    .el-submenu__icon-arrow {
      color: white !important;
    }
    .el-menu-item {
      margin-left: 0.4rem;
      height: 0.6rem;
      padding: 0 !important;
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
      // background-color: transparent !important;
      span {
        color: white;
      }
      &.is-active {
        span {
          color: #eeb339;
          &:first-child {
            background-color: #111111;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.menu-wrapper {
  .el-menu-item {
    padding: 0 !important;
    border-top-left-radius: 0.6rem;
    border-bottom-left-radius: 0.6rem;
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
