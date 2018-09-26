<template>
  <div class="pay-manage">
    <el-row  class="pay-plat">
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="choosePay('微信')">微信支付</el-button>
      </el-col>
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="choosePay('支付宝支付')">支付宝支付</el-button>
      </el-col>
      <el-col :span="8">
        <el-button size="medium" :icon="checkCash" type="primary" @click="choosePay('cash')">现金支付</el-button>
      </el-col>
    </el-row>
    <div class="put-money">
      <div>
        <label>应收：</label>
        <el-input
          ref="putMoney"
          size="small"
          placeholder="请输入收款金额"
          clearable>
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix">
          </i>
        </el-input>
      </div>
      <div>
        <label>实收：</label>
        <el-input
          size="small"
          placeholder="请输入收款金额"
          clearable>
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix">
          </i>
        </el-input>
      </div>
      <div>
        <label>找零：</label>
        <el-input
          :disabled="true"
          size="small"
          clearable>
        </el-input>
      </div>
    </div>
    <el-row class="submit-money" type="flex" justify="center" >
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="submitPay()">立即支付</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonDialog from "@/views/common/dialog";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["selfVisible"],
  components: {
    CommonDialog
  },
  data() {
    return {
      qrCode: "", //条码
      qrDialogVisible: false,
      checkCash: ""
    };
  },
  watch: {
    selfVisible() {
      if (this.checkCash) {
        this.checkCash = "";
      }
    }
  },
  methods: {
    ...mapActions(["QrOpen", "QrClose"]),
    //===========
    //  支付
    //===========
    choosePay(plat) {
      switch (plat) {
        case "cash":
          this.$refs.putMoney.focus();
          this.checkCash = "el-icon-success";
          break;
        default:
          this.checkCash = "";
          this.QrOpen({ plat, money: 100 });
      }
    },
    submitPay() {
      // this.QrClose()
    }
  }
};
</script>
<style lang="scss" scoped>
.pay-manage {
  .pay-plat {
    .el-col {
      @include flexCenter;
    }
  }
  .put-money {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > div {
      padding: 0.1rem;
    }
    .el-input {
      width: 80%;
    }
  }
  .submit-money {
    margin-top: 0.5rem;
    .el-col {
      @include flexCenter;
    }
  }
  .qr-dialog {
    .el-dialog {
      // height: 5.26rem;
      // width: 6.41rem;
    }
    .title {
    }
    .qr-code {
      width: 80%;
      margin: 0 auto;
      @include flexCenter;
      label {
        display: inline-block;
        width: 1.5rem;
      }
    }
    img {
      @include flexCenter;
      width: 3.58rem;
      height: 1.83rem;
    }
  }
}
</style>
