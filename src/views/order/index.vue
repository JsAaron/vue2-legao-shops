<template>
  <div class="order-container">

    <!-- 搜索，过滤 -->
    <div class="order-filter">
      <el-form :model="form">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号：">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员姓名：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品货号：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="所属门店：">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态：">
              <el-input v-model="form.poductId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间：">
              <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 内容区域 -->
    <div class="order-list">
        <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark">

        <el-table-column
          prop="shop"
          label="商品"
          min-width="250"
          align="center">
          <template slot-scope="scope">
            <div class="shop-id">
              <div><label>订单编号:</label><span> {{scope.row.orderId}}</span></div>
              <div><span> {{scope.row.plat}}</span></div>
              <div><label>支付交易号:</label><span> {{scope.row.transactionId}}</span></div>
            </div>
            <div class="shop-container">
              <section class="shop-left"><img :src="scope.row.image"></section>
              <hgroup class="shop-right">
                <h4>{{scope.row.title}}</h4>
                <h5>{{scope.row.productId}}</h5>
                <h5>{{scope.row.cardType}}<span>{{scope.row.batch}}</span></h5>
              </hgroup>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="buyer"
          label="买家信息"
          align="center">
          <template slot-scope="scope">
            <h5>{{scope.row.username}}</h5>
            <h5>{{scope.row.phone}}</h5>
          </template>
        </el-table-column>

        <el-table-column
          prop="time"
          label="下单时间"
          align="center">
          <template slot-scope="scope">
            <h5>{{scope.row.data}}</h5>
            <h5>{{scope.row.time}}</h5>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="实付金额"
          align="center">
          <template slot-scope="scope">
            <h5>{{scope.row.meney}}</h5>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          label="订单状态">
          <template slot-scope="scope">
            <h5>{{scope.row.state}}</h5>
            <h5 @click="cancelOrder" class="cancel-order">取消订单</h5>
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
    <div class="order-page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[4,10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 订单详情 -->
    <order-details @close-dialog="closeDialog" :detailsData="detailsData" :dialogDetailsVisible="dialogDetailsVisible"></order-details>

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
      //列表查询条件
      listQuery: {
        page: 1, //取第几个页面
        limit: 4 //多少条数据
      },
      //详情数据
      detailsData: null,
      //详情
      dialogDetailsVisible: false,
      //取消订单
      dialogCancelVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCancelClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    /**
     * 子组件改变dialog的装填
     */
    closeDialog() {
      this.dialogDetailsVisible = false;
    },
    /**
     * 取消订单
     */
    cancelOrder() {
      this.dialogCancelVisible = true;
    },
    /**
     * 管理
     */
    handleUpdate() {
      this.dialogDetailsVisible = true;
    },
    /**
     * 改变每页显示的数量
     */
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    /**
     * 改变当前页码
     */
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    /**
     * 获取数据
     */
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items.map(function(item) {
          if (item.image) {
            item.image = require("../../images/home/" + item.image);
          }
          return item;
        });
        this.total = response.data.total;
      });
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
  .order-filter {
    width: 90%;
    margin: 0 auto;
    .el-form-item__label {
    }
    .el-form-item__content {
      display: inline-block;
      width: 1.92rem;
    }
    .el-form-item {
      margin-bottom: 0.1rem;
      display: inline-block;
      width: 4.5rem;
    }
    .el-form-item__label,
    .el-form-item__content {
      font-size: 0.15rem;
      font-weight: 600;
    }
  }
  .order-list {
    width: 95%;
    margin: 0 auto;
    .el-table__header th {
      height: 0.47rem;
      background-color: #4b91cd;
      @include setFontColor(0.15rem, white);
    }
    .el-table__header th:nth-child(n + 2):before {
      content: "|";
      color: white;
    }
    .shop-id {
      color: #111111;
      display: flex;
      justify-content: space-between;
      font-size: 0.1rem;
      border-bottom: 1px solid #ebeef5;
    }
    .shop-container {
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
  }
  .order-page {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    margin-bottom: 1rem;
    div {
      float: right;
    }
  }
}
</style>

