<template>
  <div class="pay-manage">
    <el-row type="flex" justify="space-around" class="pay-plat">
      <el-col :span="7">
        <el-button size="small" type="primary" @click="pay(weixin)">微信支付</el-button>
      </el-col>
      <el-col :span="7">
        <el-button size="small" type="primary" @click="pay(zhifubao)">支付宝支付</el-button>
      </el-col>
      <el-col :span="7">
        <el-button size="small" type="primary" @click="pay(cash)">现金支付</el-button>
      </el-col>
    </el-row>
    <div class="put-money">
      <div>
        <label>实收：</label>
        <el-input
          size="small"
          placeholder="请输入收款金额"
          clearable>
        </el-input>
      </div>
      <div>
        <label>找零：</label>
        <span>0:00</span>
      </div>
    </div>
    <el-row class="submit-money" type="flex" justify="center" >
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="pay(weixin)">立即支付</el-button>
      </el-col>
    </el-row>

    <!-- 支付扫码 -->
    <common-dialog class="qr-dialog el-dialog-white" :visible="qrDialogVisible" :modal="false">
      <div class="main" slot="main">
        <p class="title"><label>收款金额:</label><span>899元</span></p>
        <div class="qr-code">
          <label>付款条码:</label>
          <el-input
            size="mini"
            placeholder="【请扫用户付款条码】"
            v-model="qrCode">
          </el-input>
        </div>
        <img src="../../images/member/code.png"/>
      </div>
      <template slot="footer">
        <el-button type="primary" >重新下单</el-button>
      </template>
    </common-dialog>

  </div>
</template>

<script>
import CommonDialog from "@/views/common/dialog";
export default {
  components: {
    CommonDialog
  },
  data() {
    return {
      qrCode: "", //条码
      qrDialogVisible: false
    };
  },
  methods: {
    pay() {
      this.qrDialogVisible = true;
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
    @include setFJ;
    div {
      flex: 1;
      &:first-child {
        flex: 2;
      }
      text-align: center;
    }
    .el-input {
      width: 70%;
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
      height: 5.26rem;
      width: 6.41rem;
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
