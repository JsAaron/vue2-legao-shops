<template>
  <div class="member-container">
    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="listQuery">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="手机号码:">
              <el-input v-model="listQuery.mobile" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="卡类型:">
              <el-input v-model="listQuery.card_name" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="状态:">
              <el-select v-model="listQuery.flag" clearable>
                <el-option
                  v-for="state in memberStatus"
                  :key="state.value"
                  :label="state.label"
                  :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="时间:" clearable>
              <el-date-picker
                v-model="listQuery.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" size="small" @click="filterReset">重置</el-button>
              <el-button type="primary" size="small" @click="filterQuery">开始查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 列表显示 -->
    <list-show ref="list" :listQuery="listQuery"></list-show>
    <!-- 管理 -->
    <member-manage @close-self="this.MemberManageClose"></member-manage>
  </div>
</template>

<script>
import { memberStatus } from "@/utils";
import { mapActions } from "vuex";
import ListShow from "@/views/common/member/list";
import MemberManage from "@/views/common/member/manage";

/**
 * 默认查询条件
 */
const defaultQuery = {
  mobile: "", //查询电话
  card_name: "", //查询卡类型
  date: "", //查询时间
  flag: "", //查询状态
  pages: 1, //取第几个页面
  limit: 8 //多少条数据
};

export default {
  components: {
    ListShow,
    MemberManage
  },
  data() {
    return {
      memberStatus,
      listQuery: Object.assign({}, defaultQuery) //列表查询条件
    };
  },
  methods: {
    ...mapActions(["MemberManageClose"]),
    //====================
    //  过滤查询
    //====================
    updateList() {
      this.$nextTick(() => {
        this.$refs.list.getList(true);
      });
    },
    filterQuery() {
      if (this.listQuery.date) {
        this.listQuery.starttime = this.listQuery.date[0];
        this.listQuery.endtime = this.listQuery.date[1];
      }
      this.updateList();
    },
    filterReset() {
      this.listQuery = Object.assign({}, defaultQuery);
      this.updateList();
    }
  }
};
</script>


