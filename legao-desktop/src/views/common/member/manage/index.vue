<template>
  <div>
    <!-- 个人主页 -->
    <el-dialog class="homepage-dialog" title="会员个人主页" :visible.sync="visible" :before-close="homeDialogClose">
      <div class="homepage-box">
        <div class="title">
          <img :src="personalData.avatar"/>
          <p>{{personalData.username}}</p>
        </div>
        <div class="container">
          <p>
            <label>手机号码:</label><span>{{personalData.usermobile}}</span>
          </p>
          <p>
            <label>会员卡类型:</label><span>{{personalData.card_name}}</span>
            <span @click="updateDateManage" class="float-right pointer">管理</span>
          </p>
          <p>
            <label>零件余额保证金:</label><span>{{personalData.deposit}}</span>
            <span @click="addMoney" class="float-right pointer">充值</span>
          </p>
        </div>
        <div class="button">
          <el-button @click="rentPoductOpen" type="primary">租借产品</el-button>
          <el-button @click="secondCardOpen" type="primary">次卡消费</el-button>
        </div>
        <div class="update-list">
          123
        </div>
      </div>
    </el-dialog>

    <!-- 充值 -->
    <common-dialog class="money-dialog el-dialog-mini" @close-self="moneyDialogClose" :visible="moneyDialogVisible" :title="moneyTitle">
      <div class="main" slot="main">
        <label>充值金额:</label><el-input v-model="moneyValue" placeholder="请输入金额"></el-input>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="ensurePay">立即支付</el-button>
      </template>
    </common-dialog>

    <!-- 管理 -->
    <common-dialog class="manage-dialog el-dialog-middle" @close-self="manageDialogClose" :visible="manageDialogVisible" :title="manageTitle">
      <div class="main" slot="main">
        <img src="../../../../images/menber-sell/1-1.png" />
        <p>
          <label>有效期</label>
          <el-date-picker
            v-model="manageTimeValueBan"
            disabled
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span class="flex-mini">至</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="manageTimeValue"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="manageDialogClose">取 消</el-button>
        <el-button type="primary" @click="manageDialogUpdate">保 存</el-button>
      </span>
    </common-dialog>

     <!-- 次卡消费 -->
    <common-dialog class="second-card-dialog el-dialog-mini" @close-self="secondCardDialogClose" :visible="secondCardDialogVisible" :title="secondCardTitle">
      <template class="main" slot="main">
        <dl>
          <dt>会员姓名:</dt>
          <dd>张三</dd>
        </dl>
        <dl>
          <dt>手机号码:</dt>
          <dd>13888888888</dd>
        </dl>
        <dl>
          <dt>本次消费人数:</dt>
          <dd>  
            <el-select v-model="secondCardValue" placeholder="1">
              <el-option
                v-for="item in secondCardOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </dd>
        </dl>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="secondCardDialogClose">取消</el-button>
        <el-button type="primary" @click="secondCardDialogSave">确定</el-button>
      </template>
    </common-dialog>

     <!-- 租借产品 -->
    <common-dialog class="rent-poduct-dialog el-dialog-middle" @close-self="rentPoductDialogClose" :visible="rentPoductDialogVisible" :title="rentPoductTitle">
      <template class="main" slot="main">
        <div class="title">
          <label>产品货号:</label>
          <el-input v-model="rentPoductValue" placeholder="请输入内容"></el-input>
        </div>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="rentPoductDialogClose">取消</el-button>
        <el-button type="primary" @click="rentPoductDialogSave">确定</el-button>
      </template>
    </common-dialog>

    <!-- 提交成功 -->
    <common-dialog class="success-dialog el-dialog-mini el-dialog-white" @close-self="successDialogClose" :visible="successDialogVisible" >
      <div class="main" slot="main">
        <img src="../../../../images/menber/success.png"/>
        <p>下单成功</p>
        <p><span>88234-213-3-53</span><span>已发货</span></p>
        <p>订单编号：D234234234J234UOI</p>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="rentPoductDialogSave">5秒后自动跳回首页</el-button>
      </template>
    </common-dialog>

    <!-- 提交失败 -->
    <common-dialog class="fail-dialog el-dialog-mini el-dialog-white" @close-self="failDialogClose" :visible="failDialogVisible" >
      <div class="main" slot="main">
        <img src="../../../../images/menber/fail.png"/>
        <p>下单失败</p>
        <p>这是皇冠卡产品，等级不够，需要升级</p>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="rentPoductDialogSave">重新下单</el-button>
        <el-button type="primary" @click="rentPoductDialogSave">回到主页</el-button>
      </template>
    </common-dialog>

  </div>

</template>

<script>
import { fetchUpateDate } from "@/api/member";
import CommonDialog from "@/views/common/dialog";
import { Message } from "element-ui";
export default {
  components: {
    CommonDialog
  },
  props: ["personalData", "visible"],
  data() {
    return {
      mobile: "",
      name: "",
      //===================
      //  充值
      //===================
      moneyDialogVisible: false,
      moneyValue: null, //充值金额
      moneyTitle: "充值",
      //===================
      //  管理
      //===================
      manageDialogVisible: false,
      manageValue: "",
      manageTimeValueBan: "",
      manageTimeValue: "",
      manageTitle: "会员卡管理界面",
      //===================
      //  租借产品
      //===================
      rentPoductDialogVisible: false,
      rentPoductTitle: "产品借出",
      rentPoductValue: null,
      //下单成功
      successDialogVisible: false,
      //下单失败
      failDialogVisible: false,
      //===================
      //  次卡消费
      //===================
      secondCardDialogVisible: false,
      secondCardTitle: "次卡消费界面",
      secondCardValue: null,
      secondCardOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    //===================
    //  主页
    //===================
    homeDialogClose() {
      this.$emit("close-self");
    },
    rentPoductOpen() {
      this.rentPoductDialogVisible = true;
    },
    secondCardOpen() {
      this.secondCardDialogVisible = true;
    },

    //===================
    //  充值
    //===================
    //点击充值
    addMoney() {
      this.moneyDialogVisible = true;
    },
    //确定支付
    ensurePay() {
      this.moneyDialogClose();
    },
    moneyDialogClose() {
      this.moneyDialogVisible = false;
    },

    //===================
    //  更新日期管理管理
    //===================
    updateDateManage() {
      this.manageTimeValueBan = this.personalData.card_start_time;
      this.manageTimeValue = this.personalData.card_end_time;
      this.manageDialogVisible = true;
    },
    manageDialogClose() {
      this.manageDialogVisible = false;
    },
    manageDialogUpdate() {
      if (this.manageTimeValue) {
        fetchUpateDate({
          card_no: this.personalData.card_no,
          endtime: this.manageTimeValue
        }).then(
          () => {
            Message({
              message: "数据更新成功!",
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              this.manageDialogClose();
            }, 1000);
          },
          () => {
            Message({
              message: "数据修改失败!",
              type: "error",
              duration: 2000
            });
          }
        );
      }
    },

    //===================
    //  次卡消费
    //===================
    secondCardDialogClose() {
      this.secondCardDialogVisible = false;
    },
    secondCardDialogSave() {
      this.secondCardDialogClose();
    },

    //===================
    //  租借产品
    //===================
    rentPoductDialogClose() {
      this.rentPoductDialogVisible = false;
    },
    rentPoductDialogSave() {
      alert(1);
      // this.rentPoductDialogClose();
    },
    successDialogClose() {
      this.secondCardDialogVisible = false;
    },
    failDialogClose() {
      this.failDialogVisible = false;
    }
  }
};
</script>

<style lang="scss" >
.homepage-dialog {
  .el-dialog {
    @include setWH(8.39rem, auto);
    @include borderRadius(0.2rem);
    margin-top: 0 !important;
    background: #4b91cd;
    @include translateCenter;
    .el-dialog__header {
      height: 0.67rem;
      position: relative;
      .el-dialog__title {
        @include translateCenter;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.22rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      background: #ffffff;
      .homepage-box {
        margin: 0 auto;
        width: 7.08rem;
        .title {
          text-align: center;
          img {
            margin: 0 auto;
            @include setWH(0.83rem, 0.83rem);
          }
        }
        .float-right {
          float: right;
          color: #4b91cd;
        }
        .container {
          border-bottom: 1px solid #cccccc;
          padding-bottom: 0.15rem;
          p {
            margin-top: 0.2rem;
            span {
              display: inline-block;
              text-indent: 1em;
            }
          }
        }
        .button {
          margin: 0.2rem 0;
          display: flex;
          justify-content: space-between;
          .el-button {
            @include setWH(1.87rem, 0.58rem);
          }
        }
        .update-list {
          height: 3.05rem;
          border: 1px solid #ccc;
        }
      }
    }
  }
}
.money-dialog {
  .el-dialog__body {
    .main {
      width: 70%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      label {
        flex: 2;
      }
      div {
        flex: 4;
      }
    }
  }
}
.manage-dialog {
  img {
    display: block;
    margin: 0 auto;
    @include setWH(3.18rem, 2rem);
    margin-bottom: 0.2rem;
  }
  p {
    display: flex;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    text-align: left;
    justify-content: space-between;
    text-align: center;
    label {
      flex: 1;
      width: 0.6rem;
      font-size: 0.17rem;
    }
    div {
      flex: 2;
    }
    .flex-mini {
      flex: 0.5;
    }
    span {
      flex: 1;
      font-size: 0.16rem;
      &:last-child {
        display: inline-block;
        color: #4b91cd;
      }
    }
  }
}
.second-card-dialog {
  .el-dialog__body {
    dl {
      display: flex;
      padding: 0.05rem;
      align-items: center;
    }
  }
}
.rent-poduct-dialog {
}
.success-dialog,
.fail-dialog {
  .el-dialog__header {
    height: 0 !important;
  }
  .main {
    @include flexCenter;
    flex-direction: column;
    img {
      @include setWH(0.78rem, 0.78rem);
    }
  }
}
</style>
