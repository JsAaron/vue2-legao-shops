<template>
  <div class="pay-manage">
    <el-row type="flex" justify="space-between" class="pay-plat">
      <el-col :span="7">
        <el-button size="mini" type="primary" @click="pay(weixin)">微信支付</el-button>
      </el-col>
      <el-col :span="7">
        <el-button size="mini" type="primary" @click="pay(zhifubao)">支付宝支付</el-button>
      </el-col>
      <el-col :span="7">
        <el-button size="mini" type="primary" @click="pay(cash)">现金支付</el-button>
      </el-col>
    </el-row>
    <div class="put-money">
      <div>
        <label>实收：</label>
        <el-input
          size="mini"
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
    
  </div>
</template>

<script>
export default {};
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
}
</style>
