<template>
  <div class="pay-manage">
    <el-row  class="pay-plat">
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="choosePay('wx')">微信支付</el-button>
      </el-col>
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="choosePay('ali')">支付宝支付</el-button>
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
          @blur="calculatePrice"
          v-model="receivable"
          placeholder="请输入商品实际金额"
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
          @blur="calculatePrice"
          size="small"
          :disabled="!cashMode"
          v-model="received"
          placeholder="请输入收款实际金额"
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
          v-model="changeFund"
          :disabled="true"
          size="small"
          clearable>
        </el-input>
      </div>
    </div>
    <el-row class="submit-money" type="flex" justify="center" >
      <el-col :span="8">
        <el-button :disabled="!cashMode" size="medium" type="primary" @click="submitPay()">立即支付</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonDialog from "@/views/common/dialog";
import { mapGetters, mapActions } from "vuex";
import { fetchPayment } from "@/api/pay";
export default {
  props: ["selfVisible", "card_no"],
  components: {
    CommonDialog
  },
  data() {
    return {
      qrCode: "", //条码
      qrDialogVisible: false,
      checkCash: "",
      cashMode: false, //是否现金付款方式
      changeFund: "", //找零
      receivable: "", //应收价
      received: "" //实际收取价格
    };
  },
  watch: {
    selfVisible() {
      if (this.checkCash) {
        this.checkCash = "";
      }
      //关闭，清空状态
      if (!this.selfVisible) {
        this.changeFund = "";
        this.cashMode = false;
        this.receivable = "";
        this.received = "";
      }
    }
  },
  methods: {
    ...mapActions(["QrOpen"]),
    //===========
    //  支付
    //===========
    choosePay(plat) {
      switch (plat) {
        case "cash":
          this.cashMode = true;
          this.$refs.putMoney.focus();
          this.checkCash = "el-icon-success";
          break;
        default:
          this.cashMode = false;
          this.checkCash = "";
          if (this.receivable) {
            this.QrOpen({
              plat,
              money: this.receivable,
              card_no: this.card_no
            });
          } else {
            this.$message({
              message: "请输入金额!",
              type: "error",
              duration: 2000
            });
          }
      }
    },
    //===========
    //  计算费用
    //===========
    calculatePrice() {
      if (this.receivable && this.received) {
        this.changeFund = this.received - this.receivable;
      }
    },
    submitPay() {
      if (this.receivable) {
        fetchPayment({
          card_no: this.card_no,
          type: "cash",
          price: this.receivable
        }).then(
          () => {
            this.$message({
              message: "支付成功!",
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              this.$emit("close-self");
            }, 1000);
          },
          () => {
            this.$message({
              message: "支付失败!",
              type: "error",
              duration: 2000
            });
          }
        );
      } else {
        this.$message({
          message: "请输入金额!",
          type: "error",
          duration: 2000
        });
      }
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
