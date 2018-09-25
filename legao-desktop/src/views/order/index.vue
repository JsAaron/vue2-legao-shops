<template>
  <div class="order-container">

    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="订单编号:">
              <el-input v-model="form.id" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员姓名:">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码:">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品货号:">
              <el-input v-model="form.poductId" clearable prefix-icon="el-icon-search" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row  :gutter="20">
          <el-col :span="5">
            <el-form-item label="所属门店:">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="订单状态:">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="时间:">
              <el-date-picker
                size="small"
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" size="small" @click="filterQuery">开始查询</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </div>

    <!-- 内容区域 -->
    <div class="legao-list legao-table-line">
        <el-table
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark">
        <el-table-column
          label="商品"
          min-width="370"
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
          label="下单时间"
          align="center">
          <template slot-scope="scope">
            <p>{{splitTime(scope.row.created)[0]}}</p>
            <p>{{splitTime(scope.row.created)[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="payment"
          label="实付金额"
          align="center">
          <span></span>
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
            <el-button type="primary"  @click="viewDetailHandle(scope.row)">查看详情</el-button>
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
import { fetchList, viewDetailApi } from "@/api/order";
import OrderDetails from "./details";
import CommonDialog from "@/views/common/dialog";
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["orderLimit"])
  },
  data() {
    return {
      //===================
      // 数据列表
      //===================
      listQuery: Object.assign({}, defaultQuery),
      listTotal: 0, //总数
      listData: null, //列表数据
      listLoading: false,

      //===================
      // 查询
      //===================
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

      //===================
      // 详细列表
      //===================
      dialogDetailsVisible: false,
      dialogCancelVisible: false,
      detailsData: {
        tid: null,
        created: null,
        pay_type: null,
        payment: null
      }
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
    ...mapActions(["UpdateAppScroll", "SaveOrderLimit"]),
    splitTime(time) {
      return time.split(" ");
    },
    //=========================
    //  公共方法
    //=========================
    getList(updateScroll) {
      this.listLoading = true;
      this.listQuery.limit = this.orderLimit;
      fetchList(this.listQuery).then(response => {
        this.listData = [...response.data.data];
        this.listTotal = Number(response.data.count);
        this.$nextTick(() => {
          this.listLoading = false;
          if (updateScroll) {
            this.UpdateAppScroll();
          }
        });
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
    filterReset() {
      this.listQuery = Object.assign({}, defaultQuery);
      this.getList(true);
    },
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
     * 查看详情
     */
    viewDetailHandle(data) {
      this.listLoading = true;
      viewDetailApi({ tid: data.tid }).then(response => {
        this.listLoading = false;
        this.detailsData = response.data.data;
        this.dialogDetailsVisible = true;
      });
    },

    //=======================
    //  页码操作
    //=======================
    /**
     * 改变每页显示的数量
     */
    handleSizeChange(value) {
      this.SaveOrderLimit(value);
      this.getList(true);
    },
    /**
     * 改变当前页码
     */
    handleCurrentChange(value) {
      this.listQuery.pages = value;
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

