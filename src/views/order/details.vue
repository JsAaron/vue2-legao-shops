<template>

  <el-dialog class="dialogDetailsVisible" title="订单详情" :visible.sync="dialogDetailsVisible" :before-close="handleClose" >
    <hgroup class="details-group">
      <h2>订单信息</h2>
      <div>
        <p><label>订单编号：</label><span>1</span></p>
        <p><label>下单时间</label><span>1</span></p>
      </div>
      <div>
        <p><label>付款方式</label><span>1</span></p>
        <p><label>支付流水</label><span>1</span></p>
      </div>
      <div>
        <p><label>押金价：</label><span>1</span></p>
       <p><label>实付金额</label><span>1</span></p>
      </div>
      <div>
        <p><label>所属门店：</label><span>1</span></p>
      </div>
    </hgroup>
  </el-dialog>

</template>



<script>
export default {
  props: ["dialogDetailsVisible"],
  methods: {
    handleClose() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.order-container {
  .dialogDetailsVisible {
    .el-dialog {
      margin-top: 0 !important;
      @include setWH(10.36rem, auto);
      @include borderRadius(0.2rem);
      background: #4b91cd;
      .el-dialog__header {
        height: 0.69rem;
        position: relative;
        .el-dialog__title {
          @include setCenter;
        }
        .el-dialog__title,
        .el-dialog__close {
          font-size: 0.3rem;
          color: #ffffff;
        }
      }
      .el-dialog__body {
        background: #ffffff;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }
      .details-group {
        width: 7rem;
        div {
          display: flex;
          p {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
