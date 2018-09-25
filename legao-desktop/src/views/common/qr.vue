<template>
  <div class="legao-dialog qr-manage">
    <!-- 支付扫码 -->
    <common-dialog class="qr-dialog el-dialog-white" :visible="qrDialogVisible" :modal="false">
      <div class="main" slot="main">
        <p class="title"><label>收款金额:</label>&yen;<span>899</span>元</p>
        <div class="qr-code">
          <label>付款条码:</label>
          <el-input
            clearable
            size="mini"
            placeholder="【请扫用户付款条码】"
            v-model="qrCode">
          </el-input>
        </div>
        <div class="qr-img">
          <img src="../../images/member/code.png"/>
          <p>请扫描用户手机客户端中的条码</p>
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" >扫描中，请稍等...</el-button>
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
<style lang="scss" >
.qr-manage {
  .qr-dialog {
    .el-dialog {
      height: 5.26rem;
      width: 6.41rem;
    }
    .el-dialog__body {
      padding: 0;
      .title {
        label {
          margin-right: 0.1rem;
        }
        font-size: 0.24rem;
        span {
          color: red;
        }
      }
    }
    .qr-code {
      width: 60%;
      margin: 0 auto;
      margin-top: 0.3rem;
      @include flexCenter;
      label {
        display: inline-block;
        width: 1.5rem;
        font-size: 0.18rem;
      }
    }
    .qr-img {
      width: 80%;
      margin: 0 auto;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #c0c4cc;
      margin-top: 0.2rem;
      @include flexCenter(column);
      img {
        width: 3.57rem;
        height: 1.83rem;
      }
    }
    .dialog-footer {
      .el-button {
        width: 2.6rem;
      }
    }
  }
}
</style>
