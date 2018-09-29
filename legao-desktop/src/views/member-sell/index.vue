<template>
  <div class="sell-container">

    <div class="sell-left">
      <div class="sell-scroll-wrapper">
        <el-scrollbar ref="wrapper" class="warp-box" :native="false">
          <li v-for="(item,index) in cardData" 
              :key="item.id"
              @click="changeCard(item,index)"
              :class="selectCardIndex === index?'active':''">
            <img src="../../images/member-sell/1-1.png" />
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
            <el-col :span="20">
              <el-input size="mini" v-model.number="payForm.phone" placeholder="请输入手机号码" clearable></el-input> 
            </el-col>
            <el-col :span="6" :offset="1">
              <span>{{payForm.phonePrompt}}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="商品名称：">
            <span>{{payForm.card_name}}</span>
          </el-form-item>
          <el-form-item label="会员费：">
            <span>{{payForm.price}}</span>
          </el-form-item>
          <el-form-item label="押金：">
          <span>{{payForm.deposit}}</span>
          </el-form-item>
          <el-form-item label="店铺玩次数：">
            <span>{{payForm.times}}</span>
          </el-form-item>
          <el-form-item label="件数：">
            <el-col :span="12">
              <el-select size="mini" v-model="payForm.number" placeholder="请选择">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="5" value="5"></el-option>
                </el-select>
            </el-col>
          </el-form-item>
          <pay-manage :card_no="1111" selfVisible="true"></pay-manage>
          <p class="notice" >
            <el-checkbox>阅读并同意读库会员借还须知</el-checkbox>
          </p>
        </el-form>
      </div>
    </div>

      <!-- qr扫码 -->
    <qr-manage></qr-manage>

  </div>
</template>

<script>
import { fetchCards, fetchPhone } from "@/api/member-sell";
import { isValidPhone } from "@/utils/validate";
import PayManage from "@/views/common/pay";
import QrManage from "@/views/common/qr";
export default {
  components: {
    QrManage,
    PayManage
  },
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
        card_name: "", //商品名
        price: "", //会员费用
        deposit: "", //押金
        times: "", //店铺玩的次数
        number: 1 //件数
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
    /**
     * 选择卡
     */
    changeCard(item, index) {
      this.selectCardIndex = index;
      Object.assign(this.payForm, item);
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


<style lang="scss" >
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
      margin: 0.2rem auto;
      .el-form {
        .el-form-item {
          margin-bottom: 0.1rem;
        }
      }
      .pay-manage,
      .notice {
        margin-top: 0.2rem;
        text-align: center;
        .put-money,
        .submit-money {
          margin-top: 0.2rem;
        }
      }
    }
  }
}
</style>

