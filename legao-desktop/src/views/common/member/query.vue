<template>
  <div>
    <!-- 快速查询 -->
    <common-dialog class="member-query-dialog el-dialog-middle" @close-self="this.MemberQueryClose" :before-close="this.MemberQueryClose" :visible="memberQueryVisible" title="会员卡快速查询">
      <div class="main" slot="main">
        <p class="mobile">手机号码:</p>
        <div>
          <el-input
            placeholder="请输入会员/办卡人手机号码"
            v-model="listQuery.mobile"
            clearable>
          </el-input>
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="this.MemberQueryClose">取消</el-button>
        <el-button type="primary" @click="memberQueryDialogOpen">确定</el-button>
      </template>
    </common-dialog>

    <!-- 列表显示 -->
    <common-dialog class="el-dialog-super" :modal="false" @close-self="this.listQueryClose" :before-close="this.listQueryClose"  :visible="listQueryVisible" title="会员卡显示列表">
      <div class="main" slot="main">
        <list-show ref="list" :listQuery="listQuery" ></list-show>
      </div>
    </common-dialog>

    <!-- 管理 -->
    <member-manage @close-self="this.MemberManageClose"></member-manage>

  </div>
</template>

<script>
import store from "@/store";
import { Message } from "element-ui";
import { isValidPhone } from "@/utils/validate";
import { mapGetters, mapActions } from "vuex";
import ListShow from "@/views/common/member/list";
import CommonDialog from "@/views/common/dialog";
import MemberManage from "@/views/common/member/manage";

const defaultQuery = {
  mobile: "", //查询电话
  pages: 1, //取第几个页面
  limit: 8 //多少条数据
};

export default {
  props: ["visible"],
  components: {
    ListShow,
    MemberManage,
    CommonDialog
  },
  computed: {
    ...mapGetters(["memberQueryVisible"])
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery), //列表查询条件
      listQueryVisible: false
    };
  },
  methods: {
    ...mapActions([
      "MemberQueryClose",
      "MemberManageOpen",
      "MemberManageClose"
    ]),
    memberQueryDialogOpen() {
      if (!isValidPhone(this.listQuery.mobile)) {
        Message({
          message: "电话号码输入有误!",
          type: "error",
          duration: 2000
        });
        return;
      }

      this.$nextTick(() => {
        //多次查询必须调用接口
        if (this.$refs.list) {
          this.$refs.list.getList(true);
        }
        this.listQueryVisible = true;
      });
    },
    listQueryClose() {
      this.listQueryVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.member-query-dialog {
  .main {
    width: 90%;
    margin: 0 auto;
    .mobile {
      font-size: 0.15rem;
      margin-bottom: 0.2rem;
    }
  }
  .query-dialog {
  }
}
</style>
