<template>
  <div>
    <!-- 快速查询 -->
    <common-dialog class="member-query-dialog el-dialog-middle" @close-self="memberQueryDialogClose" :before-close="memberQueryDialogClose" :visible="visible" :title="memberQueryTitle">
      <div class="main" slot="main">
        <p class="phone">手机号码:</p>
        <div>
          <el-input
            placeholder="请输入会员/办卡人手机号码"
            v-model="phone"
            clearable>
          </el-input>
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="memberQueryDialogClose">取消</el-button>
        <el-button type="primary" @click="memberQueryDialogSave">确定</el-button>
      </template>
    </common-dialog>
    <!-- 管理 -->
    <member-manage @close-self="manageDialogClose" :visible="manageDialogVisible"></member-manage>
  </div>
</template>

<script>
import MemberManage from "@/views/common/member/manage";
import CommonDialog from "@/views/common/dialog";
export default {
  props: ["visible"],
  data() {
    return {
      phone: "",
      memberQueryTitle: "会员卡快速查询",
      manageDialogVisible: false
    };
  },
  methods: {
    manageDialogClose() {
      this.manageDialogVisible = false;
    },
    memberQueryDialogClose() {
      this.$emit("close");
    },
    memberQueryDialogSave() {
      this.manageDialogVisible = true;
    }
  },
  components: {
    MemberManage,
    CommonDialog
  }
};
</script>
<style lang="scss">
.member-query-dialog {
  .main {
    width: 90%;
    margin: 0 auto;
    .phone {
      font-size: 0.15rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
