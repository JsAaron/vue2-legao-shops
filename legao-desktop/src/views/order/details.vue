<template>
  <div>
    <!-- 订单详情 -->
    <common-dialog class="details-dialog" @close-self="detailsDialogClose" :visible="detailsVisible" title="订单详情">
      <div slot="main">
        <!-- 订单信息 -->
        <dl class="details-group">
          <dt>订单信息</dt>
          <dd>
            <p><label>订单编号</label><span>{{detailsData.tid}}</span></p>
            <p><label>下单时间</label><span>{{detailsData.created}}</span></p>
          </dd>
          <dd>
            <p><label>付款方式</label><span>{{payPlatform(detailsData.pay_type)}}</span></p>
            <p><label>支付流水</label><span>{{detailsData.outer_tid}}</span></p>
          </dd>
          <dd>
            <p><label>押金价</label><span>{{detailsData.total_fee}}</span></p>
            <p><label>实付金额</label><span>{{detailsData.payment}}</span></p>
          </dd>
          <dd>
            <p><label>所属门店</label><span>{{shopName}}</span></p>
          </dd>
        </dl>
        <!-- 买家信息 -->
        <dl class="details-group">
          <dt>买家信息</dt>
          <dd>
            <p><label>会员姓名</label><span>{{detailsData.receiver_name}}</span></p>
            <p><label>手机号码</label><span>{{detailsData.receiver_mobile}}</span></p>
          </dd>
          <dd>
            <p><label>卡类型</label><span>？</span></p>
            <p><label>租借批次</label><span>第{{detailsData.times}}批次</span></p>
          </dd>
        </dl>
        <!-- 商品信息 -->
        <dl class="details-group">
          <dt>商品信息</dt>
          <el-table
            border
            size="small"
            :data="detailsData.orders">
            <el-table-column
              prop="title"
              min-width="150"
              show-overflow-tooltip
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="total_fee"
              label="押金价">
            </el-table-column>
            <el-table-column
              prop="discount_fee"
              label="实付金额">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="payment"
              label="总金额">
            </el-table-column>
            <el-table-column
              prop="state_str"
              label="状态">
            </el-table-column>
          </el-table>
        </dl>
        <!-- 回收清点 -->
        <dl class="details-group" v-if="showTypeIn">
          <dt>清点信息</dt>
          <div v-if="detailsData.process==2 || detailsData.process==3" >
            <dd class="details-typeIn-info">
              <p><label>清点结果</label><span>缺失</span></p>
              <p><label>清点时间</label><span>2015-18-12</span></p>
              <p><label>缺损金额</label><span>199</span></p>
            </dd>
            <dd>
              <p><label>零件缺损</label><span></span></p>
            </dd>
            <el-table
              style="width: 100%" 
              max-height="250"
              show-summary
              border
              size="small"
              :data="detailsData.orders">
              <el-table-column
                prop="title"
                min-width="150"
                show-overflow-tooltip
                label="型号">
              </el-table-column>
              <el-table-column
                prop="total_fee"
                label="图片">
              </el-table-column>
              <el-table-column
                prop="discount_fee"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="payment"
                label="总金额">
              </el-table-column>
            </el-table>
            <dd class="details-lose">
              <p><label>收纳盒缺损</label><span>内2</span></p>
              <p><label>金额(元)</label><span>20:00</span></p>
            </dd>
            <dd class="details-lose">
              <p><label>说明书缺损</label><span>2</span></p>
              <p><label>金额(元)</label><span>20:00</span></p>
            </dd>
          </div>
          <el-button v-if="detailsData.process==3" type="primary" @click="typeInClick">找回零件</el-button> 
          <el-button v-if="detailsData.process==1" type="primary" @click="typeInClick">回收清点</el-button> 
        </dl>
        <!-- 商家备注 -->
        <dl class="details-group" v-if="detailsData.process==0" >
          <dt>商家备注</dt>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入备注内容"
            v-model="remarkTextarea">
          </el-input>
          <el-button class="save-remark" type="primary" @click="saveRemark">确定保存</el-button> 
        </dl>
      </div>
    </common-dialog>

    <!-- 清点录入 -->
  </div>
</template>


<script>
import {
  payPlatform,
  getTradeType,
  getTradeFlagStr,
  transformProductStatus
} from "@/utils/status";
import { mapActions, mapGetters } from "vuex";
import CommonDialog from "@/views/common/dialog";

export default {
  components: {
    CommonDialog
  },
  computed: {
    ...mapGetters(["shopName"]),
    //process
    //0代表可以添加备注的时候
    //1代表可以有点击回收清点按钮
    //2代表显示回收清点后的信息
    //3可以点击找回另加
    showTypeIn() {
      const process = this.detailsData.process;
      if (process == 1 || process == 2 || process == 3) {
        return true;
      }
      return false;
    }
  },
  props: ["detailsData", "detailsVisible"],
  data() {
    return {
      remarkTextarea: ""
    };
  },
  methods: {
    payPlatform,
    /**
     * 回收清点
     */
    typeInClick() {
      this.dialogTypeInVisible = true;
    },
    typeInClose() {
      this.dialogTypeInVisible = false;
    },
    detailsDialogClose() {
      this.$emit("close-self");
    },
    /**
     * 保存备注
     */
    saveRemark() {
      if (this.remarkTextarea) {
        alert(this.remarkTextarea);
      }
    }
  }
};
</script>

<style lang="scss">
.details-dialog .el-dialog {
  width: 10.36rem;
  // margin
}
</style>

<style lang="scss" scoped>
.details-dialog {
  .details-group {
    width: 8.5rem;
    margin: 0 auto;
    padding-bottom: 0.1rem;
    // padding-bottom: 0.rem;
    border-bottom: 1px solid #ccc;
    dt {
      font-weight: 700;
      margin: 0.1rem 0;
    }
    // 冒号对齐
    dd {
      @include setFJ;
      p {
        flex: 1;
        margin: 0.02rem;
        position: relative;
        label {
          position: absolute;
          width: 0.8rem;
          text-align: justify;
          text-align-last: justify;
          &:after {
            display: inline-block;
            content: "";
            width: 100%;
            height: 0;
          }
          &:before {
            position: absolute;
            left: 0.8rem;
            content: "\FF1A";
          }
        }
        span {
          padding-left: 1rem;
        }
      }
      &.details-lose {
        p {
          label {
            width: 1rem;
            &:before {
              left: 1rem;
            }
          }
          span {
            padding-left: 1.2rem;
          }
        }
      }
      &.details-typeIn-info {
        flex: none;
      }
    }
    .save-remark {
      margin-top: 0.1rem;
    }
    .form-inline {
      margin-top: 0.1rem;
    }
    .defect-checkbox {
      margin-top: 0.2rem;
      div {
        display: inline-block;
      }
      .title {
        width: 20%;
      }
      .defect-overflow {
        width: 80%;
      }
      .align {
        vertical-align: top;
      }
      .defect-sum {
        margin-top: 0.1rem;
        margin-left: 0.9rem;
      }
    }
    .bt {
      margin: 0 auto;
      width: 6rem;
      justify-content: space-between;
      display: flex;
      button {
        width: 1.56rem;
        height: 0.49rem;
      }
    }
  }
}
</style>
