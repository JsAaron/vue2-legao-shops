<template>
  <div class="sell-container">

    <div class="sell-left">
      <div class="sell-scroll-wrapper">
        <el-scrollbar ref="wrapper" class="warp-box" :native="false">
          <li v-for="(item,index) in cardData" 
              :key="item.id"
              @click="clickCard(item,index)"
              :class="selectCardIndex === index?'active':''">
            <img src="../../images/menber-sell/1-1.png" />
          </li>
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
        <el-form size="small" :rules="rules" label-position="center" label-width="1.3rem" :model="payForm" >
          <el-form-item label="会员账号：" prop="phone">
            <el-col :span="15">
              <el-input v-model.number="payForm.phone" placeholder="请输入手机号码"></el-input> 
            </el-col>
            <el-col :span="6" :offset="1">
              <span>{{payForm.phonePrompt}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="商品名称：">
            <span>{{payForm.name}}</span>
          </el-form-item>
          <el-form-item label="会员费：">
            <span>13877777777</span>
          </el-form-item>
          <el-form-item label="押金：">
          <span>13877777777</span>
            </el-form-item>
          <el-form-item label="优惠金额：">
            <span>13877777777</span>
          </el-form-item>
          <el-form-item label="店铺玩次数：">
            <span>13877777777</span>
          </el-form-item>
          <el-form-item label="件数：">
            <el-select v-model="payForm.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
 

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
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCards, fetchPhone } from "@/api/member-sell";
import { isValidPhone } from "@/utils/validate";

export default {
  data() {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isValidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        fetchPhone(value).then(res => {
          if (res.data.new == "true") {
            this.payForm.phonePrompt = "(老用户)";
          }
          if (res.data.new == "false") {
            this.payForm.phonePrompt = "(新用户)";
          }
        });
        callback();
      }
    };
    return {
      selectCardIndex: "",
      cardData: null, //会员卡数据列表
      payForm: {
        name: "", //商品名
        phone: "", //电话号码
        phonePrompt: "" //用户注册提示
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ]
      },

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
    test() {
      console.log(1);
    },
    clickCard(item, index) {
      this.selectCardIndex = index;
      this.payForm.name = item.name;
    },
    getCards() {
      fetchCards()
        .then(response => {
          this.cardData = [...response.data.data.list];
        })
        .then(() => {
          setTimeout(() => {
            //强制刷新获取bar的高度
            this.$refs.wrapper.update();
          }, 100);
        });
    },
    pay() {}
  }
};
</script>

<style lang="scss" scoped>
@keyframes scaleDraw {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.96);
  }
}

.sell-container {
  margin-top: 0.2rem;
  margin-left: 0.5rem;
  height: 100%;
  .sell-left {
    float: left;
    width: 9.3rem;
    .sell-scroll-wrapper {
      height: 6.2rem;
      overflow: hidden;
      li {
        background: #eeb339;
        float: left;
        margin: 0.15rem;
        @include borderRadius(0.26rem);
        @include setWH(2.786rem, 1.75rem);
        img {
          width: 100%;
          height: 100%;
        }
        &.active {
          img {
            animation: scaleDraw 0.2s ease-in-out 1 forwards;
          }
        }
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
    float: left;
    margin-left: 0.5rem;
    border: 1px solid #707070;
    @include setWH(5.5rem, auto);
    @include borderRadius(0.26rem);
    .right-main {
      width: 80%;
      margin: 0.3rem auto;
      .el-form {
        .el-form-item {
          margin-bottom: 0.1rem;
        }
      }
      .handle-button,
      .notice,
      .put-money,
      .right-info,
      .pay-plat {
        margin-top: 0.5rem;
      }

      .pay-plat,
      .put-money,
      .handle-button {
        @include setFJ;
      }

      .handle-button .el-button {
        @include setWH(1.24rem, 0.46rem);
      }

      .pay-plat {
        justify-content: space-around;
        .el-button {
          margin: 0.1rem;
          padding: 0.1rem 0.3rem;
          height: 0.46rem;
        }
      }

      .put-money {
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
    }
  }
}
</style>

