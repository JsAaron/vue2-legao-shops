<template>
  <div>
    <!-- 订单详情 -->
    <el-dialog class="dialogDetails" title="订单详情" :visible.sync="dialogDetailsVisible" :before-close="handleClose" >
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
          <p><label>押金价</label><span>1</span></p>
        <p><label>实付金额</label><span>{{detailsData.payment}}</span></p>
        </dd>
        <dd>
          <p><label>所属门店</label><span>1</span></p>
        </dd>
      </dl>

      <dl class="details-group">
        <dt>买家信息</dt>
        <dd>
          <p><label>会员姓名</label><span>张三</span></p>
          <p><label>手机号码</label><span>13455555555</span></p>
        </dd>
        <dd>
          <p><label>卡类型</label><span>读库通用卡</span></p>
          <p><label>租借批次</label><span>第2批</span></p>
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
        <el-button type="primary" @click="typeInClick">回收清点</el-button> 
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

    <!-- 清点信息录入 -->
    <el-dialog class="dialogDetails" title="清点信息录入"  :visible.sync="dialogTypeInVisible" :before-close="typeInClose" >
      <dl class="details-group">
        <dt>租借信息</dt>
        <dd>
          <p><label>商品名称: </label><span>1</span></p>
          <p><label>产品货号: </label><span>1</span></p>
        </dd>
        <dd>
          <p><label>会员姓名: </label><span>1</span></p>
          <p><label>手机号: </label><span>1</span></p>
        </dd>
        <dd>
          <p><label>会员卡: </label><span>1</span></p>
          <p><label>租借批次: </label><span>1</span></p>
        </dd>
      </dl>

      <dl class="details-group">
        <dt>清点信息</dt>
        <dd>
          <p><label>清点结果: </label><span><el-checkbox>完整</el-checkbox></span></p>
          <p><label>缺损总金额: </label><span>70.98</span></p>
          <p><label>清点时间: </label><span>2019-08-90 15:00</span></p>
        </dd>
        <dd>
          <el-form :inline="true" :model="formInline" class="form-inline">
            <el-form-item label="零件缺损:"></el-form-item>
            <el-form-item label="型号:">
              <el-input v-model="formInline.user" ></el-input>
            </el-form-item>
            <el-form-item label="数量:">
              <el-input v-model="formInline.user" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >确认</el-button>
            </el-form-item>
          </el-form>
        </dd>
        <dd>
          <el-table
              :data="tableData3"
              show-summary
              style="width: 100%"
              height="180"
              border="none">
              <el-table-column
                fixed
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编">
              </el-table-column>
            </el-table>
        </dd>

        <div class="defect-checkbox">
          <span class="title">收纳盒缺损：</span>
          <div>
            <el-checkbox-group class="checkbox" v-model="storageBox"> 
              <el-checkbox  v-for="(item) in storageBoxList" :label="item" :key="item.id"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <span>
              <label>金额(元):</label>
              <span>20.200</span>
            </span>
          </div>
        </div>
  
        <div class="defect-checkbox">
          <span class="title align" >说明书缺损：</span>
          <div class="defect-overflow">
            <el-checkbox-group class="checkbox" v-model="explainBox"> 
              <el-checkbox  v-for="(item) in explainList" :label="item" :key="item.id"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="defect-sum">
            <span>
              <label>金额(元):</label>
              <span>20.200</span>
            </span>
          </div>
        </div>
      </dl>
      

      <dl class="details-group">
        <dt>补充说明</dt>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入备注内容"
          v-model="textarea">
        </el-input> 
        <div class="bt">
          <el-button class="save-remark" type="primary" @click="dialogDetailsVisible = false">确定</el-button> 
          <el-button class="save-remark" type="primary" @click="dialogDetailsVisible = false">重置</el-button>
        </div>
      </dl>
 
    </el-dialog> 
  </div>
</template>



<script>
import {
  payPlatform,
  getTradeType,
  getTradeFlagStr,
  transformProductStatus
} from "@/utils/status";

export default {
  props: ["detailsData", "dialogDetailsVisible"],
  data() {
    return {
      storageBox: [], //收纳盒多选
      // 收纳盒列表
      storageBoxList: (function() {
        let list = [];
        //1-15
        for (let i = 1; i <= 5; i++) {
          list.push("内" + i);
        }
        return list;
      })(),

      explainBox: [], //说明书多选
      explainList: (function() {
        let list = [];
        //1-15
        for (let i = 1; i <= 15; i++) {
          list.push(i);
        }
        return list;
      })(),

      dialogTypeInVisible: false,

      formInline: {
        user: "",
        region: ""
      },
      textarea: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
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
    handleClose() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.order-container {
  .dialogDetails {
    .el-dialog {
      margin-top: 0.8rem !important;
      @include setWH(10.36rem, auto);
      @include borderRadius(0.2rem);
      background: #4b91cd;
      .el-dialog__header {
        height: 0.69rem;
        position: relative;
        .el-dialog__title {
          @include translateCenter;
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
        // 冒号对齐
        dd {
          display: flex;
          p {
            flex: 1;
            margin: 0.02rem;
            position: relative;
            label {
              position: absolute;
              width: 0.8rem;
              text-align: justify;
              text-align-last: justify;
              & :after {
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
  }
}
</style>
