<template>

  <el-dialog class="dialogDetailsVisible" title="订单详情" :visible.sync="dialogDetailsVisible" :before-close="handleClose" >
    <dl class="details-group">
      <dt>订单信息</dt>
      <dd>
        <p><label>订单编号: </label><span>1</span></p>
        <p><label>下单时间: </label><span>1</span></p>
      </dd>
      <dd>
        <p><label>付款方式: </label><span>1</span></p>
        <p><label>支付流水: </label><span>1</span></p>
      </dd>
      <dd>
        <p><label>押金价: </label><span>1</span></p>
       <p><label>实付金额: </label><span>1</span></p>
      </dd>
      <dd>
        <p><label>所属门店: </label><span>1</span></p>
      </dd>
    </dl>

    <dl class="details-group">
      <dt>买家信息</dt>
      <dd>
        <p><label>会员姓名: </label><span>张三</span></p>
        <p><label>手机号码: </label><span>13455555555</span></p>
      </dd>
      <dd>
        <p><label>卡类型: </label><span>读库通用卡</span></p>
        <p><label>租借批次: </label><span>第2批</span></p>
      </dd>
    </dl>

    <dl class="details-group">
      <dt>商品信息</dt>
      <el-table
        :data="tableData">
        <el-table-column
          prop="date"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="押金价">
        </el-table-column>
        <el-table-column
          prop="address"
          label="实付金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="address"
          label="总金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
        </el-table-column>
      </el-table>
    </dl>

    <dl class="details-group">
      <dt>清点信息</dt>
      <el-button type="primary" @click="dialogDetailsVisible = false">回收清点</el-button> 
    </dl>

    <dl class="details-group">
      <dt>商家备注</dt>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入备注内容"
        v-model="textarea">
      </el-input>
      <el-button class="save-remark" type="primary" @click="dialogDetailsVisible = false">确定保存</el-button> 
    </dl>


  </el-dialog>

</template>



<script>
export default {
  props: ["dialogDetailsVisible"],
  data() {
    return {
      textarea: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
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
      margin-top: 0.8rem !important;
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
          font-size: 0.25rem;
          color: #ffffff;
        }
      }
      .el-dialog__body {
        background: #ffffff;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }
      .details-group {
        width: 8.5rem;
        margin: 0 auto;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ccc;
        dt {
          font-weight: 700;
          margin: 0.1rem 0;
        }
        dd {
          display: flex;
          p {
            flex: 1;
            margin: 0.02rem;
          }
        }
        .save-remark {
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
