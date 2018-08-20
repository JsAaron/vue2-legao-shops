<template>
  <div>
    <el-dialog class="homepage-dialog" title="会员个人主页" :visible.sync="visible" :before-close="dialogClose">
      <div class="title">
        <img />
        <p>三张</p>
      </div>
      <div class="container fontWeight">
        <p>
          <label>手机号码：</label><span>13488888888</span>
        </p>
        <p>
          <label>会员卡类型：</label><span>读酷黄光通用卡</span>
          <span class="float-right pointer">管理</span>
        </p>
        <p>
          <label>零件余额保证金：</label><span>100:00</span>
          <span @click="addMoney" class="float-right pointer">充值</span>
        </p>
      </div>
      <div class="m-button">
        <el-button type="primary">租借产品</el-button>
        <el-button type="primary">次卡消费</el-button>
      </div>
      <div class="m-container">
        123
      </div>
    </el-dialog>

    <!-- 充值 -->
    <money-dialog class="money-dialog el-dialog-mini" @close-dialog="moneyDialogClose" :visible="moneyDialogVisible" :title="moneyTitle">
      <div class="main" slot="main">
        <label>充值金额：</label><el-input v-model="moneyValue" placeholder="请输入金额"></el-input>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="ensurePay">立即支付</el-button>
      </template>
    </money-dialog>

    <!-- 管理 -->
    <manage-dialog class="manage-dialog el-dialog-middle" @close-dialog="manageDialogClose" :visible="manageDialogVisible" :title="manageTitle">
      <div class="main" slot="main">
        <img src="../../images/menber-sell/1-1.png" />
        <p>
          <label>有效期</label>
          <el-date-picker
            v-model="manageTimeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <span>修改</span>
        </p>
        <p>
          <label>状态</label>
          <el-select v-model="manageSelectValue" placeholder="请选择">
            <el-option
              v-for="item in manageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">保 存</el-button>
      </span>
    </manage-dialog>

  </div>

</template>

<script>
import MoneyDialog from "@/views/common/dialog";
import ManageDialog from "@/views/common/dialog";
export default {
  components: {
    MoneyDialog,
    ManageDialog
  },
  props: ["data", "visible"],
  data() {
    return {
      //===================
      //  充值
      //===================
      moneyDialogVisible: false,
      moneyValue: null, //充值金额
      moneyTitle: "充值",
      //===================
      //  管理
      //===================
      manageDialogVisible: true,
      manageValue: null, //充值金额
      manageTimeValue: null,
      manageTitle: "会员卡管理界面",
      manageSelectValue: "",
      manageOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    //===================
    //  充值
    //===================
    //点击充值
    addMoney() {
      this.moneyDialogVisible = true;
    },
    //确定支付
    ensurePay() {
      this.moneyDialogClose();
    },
    moneyDialogClose() {
      this.moneyDialogVisible = false;
    },
    //===================
    //  管理
    //===================
    manageDialogClose() {
      this.manageDialogVisible = false;
    },

    dialogClose() {
      this.$emit("close-dialog");
    },
    dialogUpdate() {
      this.dialogClose();
    }
  }
};
</script>

<style lang="scss" >
.homepage-dialog {
  .el-dialog {
    @include setWH(8.39rem, auto);
    @include borderRadius(0.2rem);
    margin-top: 0 !important;
    @include setCenter;
    .el-dialog__header {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      height: 0.67rem;
      position: relative;
      background: #4b91cd;
      .el-dialog__title {
        @include setCenter;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.22rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      margin: 0 auto;
      width: 7.08rem;
      .title {
        text-align: center;
        img {
          margin: 0 auto;
          @include setWH(0.83rem, 0.83rem);
        }
      }
      .float-right {
        float: right;
        color: #4b91cd;
      }
      .container {
        border-bottom: 1px solid #cccccc;
        padding-bottom: 0.15rem;
        p {
          margin-top: 0.1rem;
        }
      }
      .m-button {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        .el-button {
          @include setWH(1.87rem, 0.58rem);
        }
      }
      .m-container {
        height: 3.05rem;
        border: 1px solid #ccc;
      }
    }
  }
}
.money-dialog {
  .el-dialog__body {
    .main {
      width: 70%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      label {
        flex: 2;
      }
      div {
        flex: 4;
      }
    }
  }
}
.manage-dialog {
  img {
    display: block;
    margin: 0 auto;
    @include setWH(3.18rem, 2rem);
    margin-bottom: 0.2rem;
  }
  p {
    width: 80%;
    margin: 0 auto;
    text-align: left;
    label {
      margin-right: 0.1rem;
      width: 0.6rem;
      display: inline-block;
      font-size: 0.17rem;
    }
    span {
      font-size: 0.17rem;
      margin-left: 0.1rem;
    }
  }
}
</style>
