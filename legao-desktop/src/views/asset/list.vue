<template>
  <div class="asset-list-container">

    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="listQuery">
        <el-row :gutter="20">
         <el-col :span="6">
            <el-form-item label="交易状态:">
              <el-select v-model="listQuery.success" clearable>
                <el-option
                  v-for="type in successType"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="时间:">
              <el-date-picker
                size="small"
                v-model="listQuery.date"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" size="small" @click="filterReset">重置</el-button>
              <el-button type="primary" size="small" @click="filterQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 列表数据 -->
    <div class="legao-list">
      <el-table
        v-loading="listLoading" 
        :data="listData"
        tooltip-effect="dark">
        <el-table-column
          prop="created"
          label="交易时间"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="商品名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="订单号|支付号"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <p>{{scope.row.code}}</p>
            <p>{{scope.row.thirdorder}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="付款人"
          align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>{{scope.row.mobile}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="金额明细"
          align="center">
          <template slot-scope="scope">
            <p><span>{{scope.row.success >=0 ?"+":"-"}}</span>{{scope.row.price}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <p>{{getState(scope.row.success)}}</p>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 底部页码导航 -->
    <div class="legao-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,50,100,200]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchList } from "@/api/asset";
import { successType } from "@/utils/status";
import { mapActions, mapGetters } from "vuex";
/**
 * 默认查询条件
 */
const defaultQuery = {
  success: "", //交易状态
  pages: 1, //取第几个页面
  limit: 10 //多少条数据
};

export default {
  data() {
    return {
      //===================
      // 数据查询
      //===================
      listQuery: Object.assign({}, defaultQuery),
      //===================
      // 数据列表
      //===================
      listData: [],
      listTotal: 0,
      successType,
      listLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions(["UpdateAppScroll"]),
    getState(state) {
      switch (state) {
        case "0":
          return "未付款";
        case "1":
          return "交易成功";
        case "-1":
          return "退款";
      }
    },
    getList(updateScroll) {
      fetchList(this.listQuery).then(response => {
        this.listData = [...response.data.data.list];
        this.listTotal = Number(response.data.data.count);
        this.$nextTick(() => {
          this.listLoading = false;
          if (updateScroll) {
            this.UpdateAppScroll();
          }
        });
      });
    },

    //=========================
    //  查询
    //=========================
    updateList() {
      this.$nextTick(() => {
        this.getList(true);
      });
    },
    filterReset() {
      this.listQuery = Object.assign({}, defaultQuery);
      this.updateList();
    },
    filterQuery() {
      if (this.listQuery.date) {
        this.listQuery.starttime = this.listQuery.date[0];
        this.listQuery.endtime = this.listQuery.date[1];
      }
      this.updateList();
    },

    //=======================
    //  页码操作
    //=======================
    /**
     * 改变每页显示的数量
     */
    handleSizeChange(value) {
      this.listQuery.limit = value;
      this.getList(true);
    },
    /**
     * 改变当前页码
     */
    handleCurrentChange(value) {
      this.listQuery.pages = value;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
