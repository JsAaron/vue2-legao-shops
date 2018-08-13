<template>
  <div class="order-container">
    <!-- 搜索，过滤 -->
    <div class="filter-container">
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
          min-width="300"
          align="center">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="买家信息"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="下单时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="money"
          label="实付金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          label="订单状态">
        </el-table-column>
        <el-table-column 
          align="center" 
          width="100" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary"  @click="handleUpdate(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
// import { fetchList } from "@/api/order";
/**
 * 订单管理
 */
export default {
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
      list: null,
      //列表查询条件
      listQuery: {
        page: 1, //取第几个页面
        limit: 10 //多少条数据
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // fetchList(this.listQuery).then(response => {});
    },
    onQuery() {},
    handleUpdate() {}
  }
};
</script>

<style lang="scss">
/**
  订单管理：
  1 过滤搜索栏
**/
.order-container {
  .filter-container {
    // width: 90%;
    margin-left: 0.2rem;
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
      background-color: #4b91cd;
      @include setFontColor(0.15rem, white);
    }
    .el-table__header th:nth-child(n + 2):before {
      content: "|";
      color: white;
    }
  }
}
</style>

