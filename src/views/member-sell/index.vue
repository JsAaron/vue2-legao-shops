<template>
  <div class="sell-container">

    <div class="sell-left">
      <div class="sell-scroll-wrapper">
        <el-scrollbar ref="wrapper" class="warp-box" :native="false">
          <li v-for="item in cardData" :key="item.id"><img src="../../images/menber-sell/1-1.png" /></li>
        </el-scrollbar>
      </div>
      <div class="sell-account">
        <p>共1件商品</p>
        <p>
          <label>应收:</label><span>899.00</span>
          <label>实收:</label><span>899.00</span>
        </p>
      </div>
    </div>

    <div class="sell-right">
      <div class="right-main">
        <ul class="right-info">
          <li><label>会员账号：</label><span>13877777777</span></li>
          <li><label>商品名称：</label><span>13877777777</span></li>
          <li><label>会员费：</label><span>13877777777</span></li>
          <li><label>押金：</label><span>13877777777</span></li>
          <li><label>优惠金额：</label><span>13877777777</span></li>
          <li><label>店铺玩次数：</label><span>13877777777</span></li>
          <li>
            <label>件数：</label>
            <el-select v-model="numberValue" placeholder="请选择" clearable>
              <el-option
                v-for="item in number"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <ul class="pay-plat">
          <li><el-button type="primary" @click="pay(weixin)">微信支付</el-button></li>
          <li><el-button type="primary" @click="pay(zhifubao)">支付宝支付</el-button></li>
          <li><el-button type="primary" @click="pay(cash)">现金支付</el-button></li>
        </ul>
        <div class="put-money">
          <div>
            <label>实收：</label>
            <el-input
              placeholder="请输入收款金额"
              clearable>
            </el-input>
          </div>
          <div>
            <label>找零：</label>
            <span>0:00</span>
          </div>
        </div>
        <div class="handle-button">
          <el-button type="primary" >结算</el-button>
          <el-button type="primary" >清空</el-button>
        </div>
        <p class="notice" >
          <el-checkbox>阅读并同意读库会员借还须知</el-checkbox>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCards } from "@/api/member-sell";
export default {
  data() {
    return {
      cardData: null, //会员卡数据列表
      numberValue: 1,
      number: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        }
      ]
    };
  },
  created() {
    this.getCards();
  },
  methods: {
    getCards() {
      fetchCards()
        .then(response => {
          this.cardData = [...response.data.data.list];
        })
        .then(() => {
          this.$nextTick(() => {
            //强制刷新获取bar的高度
            this.$refs.wrapper.update();
          });
        });
    },
    pay() {}
  }
};
</script>

<style lang="scss" scoped>
.sell-container {
  margin-top: 0.2rem;
  margin-left: 0.5rem;
  display: flex;

  .sell-left {
    width: 9.3rem;
    .sell-scroll-wrapper {
      height: 6.2rem;
      overflow: hidden;
      li {
        float: left;
        margin: 0.15rem;
        @include setWH(2.786rem, 1.75rem);
        @include borderRadius(0.26rem);
      }
    }
    .sell-account {
      padding: 0.2rem;
      margin-top: 0.15rem;
      @include borderRadius(0.26rem);
      border: 1px solid #707070;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      p {
        font-size: 0.25rem;
        padding: 0.1rem;
      }
    }
  }
  .sell-right {
    margin-left: 0.5rem;
    border: 1px solid #707070;
    @include setWH(5.52rem, 7.8rem);
    @include borderRadius(0.26rem);
    .right-main {
      width: 80%;
      margin: 0 auto;
      .handle-button,
      .notice,
      .put-money,
      .right-info,
      .pay-plat {
        margin-top: 0.4rem;
      }
      .right-info {
        li {
          padding: 0.1rem;
          label {
            text-align: right;
            width: 1rem;
            display: inline-block;
            margin-right: 0.05rem;
          }
        }
      }
      .pay-plat,
      .put-money,
      .handle-button {
        @include setFJ;
      }
      .pay-plat,
      .handle-button {
        .el-button {
          width: 1.2rem;
        }
      }
      .put-money {
        div {
          flex: 1;
        }
        .el-input {
          width: 70%;
        }
      }
    }
  }
}
</style>

