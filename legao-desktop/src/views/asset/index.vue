<template>
  <div class="asset-container">

    <!-- 资产金额 -->
    <div class="assset-sum" v-show="true">
      <div class="sum-container">
        <div class="sum-left">
          <p>进货押金余额</p>
          <p>00.00</p>
        </div>
        <span class="sum-line"></span>
        <div class="sum-right">
          <p>可提现金额</p>
          <p>00.00</p>
        </div>
      </div>
      <div class="sum-button">
        <el-button type="primary" @click="clickAsset">收支明细</el-button>
        <p>说明：待结算、可提现金额已扣除卡交易金额的15%作为服务费</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //====================
      // 过滤表单
      //====================
      filterForm: {
        date: "", //日期
        state: "", //状态
        //会员状态
        stateValue: [
          {
            value: "选项1",
            label: "使用中"
          },
          {
            value: "选项2",
            label: "已归还"
          }
        ]
      }
    };
  },
  methods: {
    clickAsset() {
      this.$router.push({ path: "/asset/list" });
    }
  }
};
</script>

<style lang="scss" scoped>
.asset-container {
  .assset-sum {
    .sum-container {
      @include setWH(8.84rem, 2rem);
      @include borderRadius(0.2rem);
      @include flexCenter;
      margin-top: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      background: linear-gradient(to right, #4b91cd, #3db4dc);
      .sum-left,
      .sum-right {
        flex: 1;
        text-align: center;
        p {
          @include setFontColor(0.3rem, #f0f3fd);
          padding: 0.05rem;
        }
      }
      .sum-line {
        background: #f0f3fd;
        height: 60%;
        width: 1px;
      }
    }
    .sum-button {
      margin-top: 0.8rem;
      text-align: center;
      .el-button {
        @include setWH(2.14rem, 0.6rem);
        font-size: 0.2rem;
      }
      p {
        padding: 0.3rem;
        font-size: 0.15rem;
      }
    }
  }
  .asset-detail {
    .detail-filter {
      width: 90%;
      margin: 0 auto;
      .el-form-item {
        display: flex;
        font-weight: 800;
        height: 0.33rem;
      }
    }
  }
}
</style>
