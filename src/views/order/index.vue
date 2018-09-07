<template>
  <div class="order-container">

    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="form">
        <el-row type="flex" justify="space-between">
          <el-col :xs="10" :sm="12" :lg="5">
            <el-form-item label="订单编号：">
              <el-input v-model="form.id" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="12" :lg="5">
            <el-form-item label="会员姓名：">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="12" :lg="5">
            <el-form-item label="手机号码：">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="12" :lg="5">
            <el-form-item label="产品货号：">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" >
          <el-col :lg="5">
            <el-form-item label="所属门店：">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4">
            <el-form-item label="订单状态：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8">
            <el-form-item label="时间：">
              <el-date-picker
                size="small"
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col  :lg="5" >
            <el-button type="primary" size="small" @click="filterReset">重置</el-button>
            <el-button type="primary" size="small" @click="filterQuery">开始查询</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 内容区域 -->
    <div class="legao-list legao-table-line">
        <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark">
        <el-table-column
          label="商品"
          min-width="250"
          align="center">
          <template slot-scope="scope">
            <div class="shop-id">
              <div><label>订单编号:</label><span>{{scope.row.tid}}</span></div>
              <div><span> {{payPlatform(scope.row.pay_type)}}</span></div>
              <div><label style="text-align:left;">支付交易号:</label><span>{{scope.row.transaction_tid?scope.row.transaction_tid:"无"}}</span></div>
            </div>
            <div class="order-main" v-for="item in scope.row.orders" :key="item.id">
              <section class="shop-left"><img :src="item.pic_path"></section>
              <hgroup class="shop-right">
                <h4>{{item.title}}</h4>
                <h5 v-if="item.goods_no">{{item.goods_no}}<span>{{transformProductStatus(item.is_new)}}</span></h5>
                <h5>{{getTradeType(scope.row.trade_type)}}<span>第{{item.times}}批</span></h5>
              </hgroup>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="买家信息"
          align="center">
          <template slot-scope="scope">
            <h5>{{scope.row.receiver_name}}</h5>
            <h5>{{scope.row.receiver_mobile}}</h5>
          </template>
        </el-table-column>

        <el-table-column
          prop="created"
          label="下单时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="payment"
          label="实付金额"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="订单状态">
          <template slot-scope="scope">
            <h5>{{getTradeFlagStr(scope.row.flag)}}</h5>
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
                <p style="text-align: center;margin:0.1rem;">是否确定删除订单?</p>
                <div style="text-align: center;margin-top:.2rem; margin-bottom:.1rem;">
                  <el-button size="mini" type="primary" @click="cancelOrder(scope.row)">确定删除</el-button>
                </div>
              <el-button slot="reference" type="text" style="color:#111111;">取消订单</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column 
          align="center" 
          width="120" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary"  @click="handleUpdate(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 底部页码显示 -->
    <div class="legao-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[4,10,50,100,200]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>

    <!-- 订单详情 -->
    <order-details 
      @close-dialog="closeDialog" 
      :detailsData="detailsData" 
      :dialogDetailsVisible="dialogDetailsVisible">
    </order-details>

    <!-- 取消订单 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogCancelVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogDetailsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDetailsVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from "@/api/order";
import OrderDetails from "./details";
import CommonDialog from "@/views/common/dialog";
import { mapActions } from "vuex";
import {
  payPlatform,
  getTradeType,
  getTradeFlagStr,
  transformProductStatus
} from "@/utils/status";
/**
 * 默认查询条件
 */
const defaultQuery = {
  pages: 1, //取第几个页面
  limit: 4 //多少条数据
};

/**
 * 订单管理
 */
export default {
  components: {
    OrderDetails,
    CommonDialog
  },
  data() {
    return {
      //===================
      // 数据列表
      //===================
      listQuery: Object.assign({}, defaultQuery),
      listTotal: 0, //总数
      listData: null, //列表数据

      visible2: false,
      value: "",
      form: {
        id: "", //产品编号
        poductId: "", //产品货号
        cadrValue: "读库通用铂金卡",
        stockValue: "进货确定",
        shopValue: "长沙喜盈门范城店"
      },
      //总数据量
      total: null,
      list: null,
      //详情数据
      detailsData: null,
      //详情
      dialogDetailsVisible: false,
      //取消订单
      dialogCancelVisible: false
    };
  },

  created() {
    this.getList(true);
  },
  methods: {
    payPlatform,
    getTradeType,
    getTradeFlagStr,
    transformProductStatus,
    ...mapActions(["UPDATE_APP_SCROLL"]),
    //=========================
    //  公共方法
    //=========================
    getList(updateScroll) {
      fetchList(this.listQuery).then(response => {
        this.listData = [...response.data.data];
        this.listTotal = Number(response.data.count);
        if (updateScroll) {
          this.$nextTick(() => {
            this.UPDATE_APP_SCROLL();
          });
        }
      });
    },

    /**
     * 取消订单
     */
    cancelOrder(row) {
      console.log(row);
      // this.dialogCancelVisible = true;
    },

    //=========================
    //  查询
    //=========================
    /**
     * 重置查询
     */
    filterReset() {},
    /**
     * 开始查询
     */
    filterQuery() {},

    //=========================
    //  查看详情
    //=========================
    /**
     * 子组件改变dialog的装填
     */
    closeDialog() {
      this.dialogDetailsVisible = false;
    },

    /**
     * 管理
     */
    handleUpdate() {
      this.dialogDetailsVisible = true;
    },

    //=======================
    //  页码操作
    //=======================
    /**
     * 改变每页显示的数量
     */
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList(true);
    },
    /**
     * 改变当前页码
     */
    handleCurrentChange(val) {
      this.listQuery.pages = val;
      this.getList();
    },

    onQuery() {}
  }
};
</script>

<style lang="scss">
/**
  订单管理：
  1 过滤搜索栏
**/
.order-container {
  .legao-list {
    .shop-id {
      @include clearfix;
      div {
        text-align: center;
        display: inline-block;
        float: left;
      }
      div:first-child {
        width: 40%;
      }
      div:nth-child(2) {
        width: 25%;
      }
      div:nth-child(3) {
        width: 35%;
      }
      font-size: 0.1rem;
    }
    .order-main {
      display: flex;
      align-items: center;
      text-align: left;
      .shop-left {
        margin-top: 0.05rem;
        img {
          @include setWH(0.87rem, 0.87rem);
          border: 1px solid #ccc;
        }
      }
      .shop-right {
        margin-left: 0.1rem;
        color: #111111;
        h5 {
          opacity: 0.52;
          span {
            margin-left: 0.1rem;
          }
        }
      }
    }
    .cancel-order {
      color: #4b91cd;
      cursor: pointer;
    }
    .cancel-order:hover {
      color: #eeb339;
    }
    .el-popover__reference {
      span {
        color: #4b91cd;
      }
    }
  }
}
</style>

