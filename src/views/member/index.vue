<template>
  <div class="member-container">

    <!-- 搜索，过滤 -->
    <div class="member-filter">
      <el-form :model="filterForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              <el-input v-model="filterForm.phone" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡类型：">
              <el-input v-model="filterForm.cardType" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间：" clearable>
              <el-date-picker
                v-model="filterForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态：">
              <el-select v-model="filterForm.state" clearable>
                <el-option
                  v-for="state in filterForm.stateValue"
                  :key="state.value"
                  :label="state.label"
                  :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 查询 -->
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="filterQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="member-list">
      <el-table
        v-loading="listLoading" 
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark">
        <el-table-column
          prop="username"
          label="会员姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cardType"
          label="卡类型"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="开始时间">
          <template slot-scope="scope">
            <p>{{scope.row.startTime}}</p>
            <p>11:11:11</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="结束时间">
          <template slot-scope="scope">
            <p>{{scope.row.endTime}}</p>
            <p>11:11:11</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态">
        </el-table-column>
        <el-table-column 
          align="center" 
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="manageDialogOpen(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 底部页码导航 -->
    <div class="member-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[8,10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>

    <!-- 管理 -->
    <member-manage @close-self="manageDialogClose" :visible="manageDialogVisible"></member-manage>

  </div>
</template>

<script>
import { fetchList } from "@/api/member";
import MemberManage from "@/views/common/member/manage";
export default {
  components: {
    MemberManage
  },
  data() {
    return {
      //====================
      // 管理目录
      //====================
      manageDialogVisible: false,
      //====================
      // 过滤表单
      //====================
      filterForm: {
        phone: "", //产品编号
        cardType: "", //卡类型
        date: "", //日期
        state: "", //状态
        //会员状态
        stateValue: [
          {
            value: "选项1",
            label: "使用中"
          },
          {
            value: "选项2",
            label: "已归还"
          }
        ]
      },
      //====================
      // 数据列表
      //====================
      listLoading: true,
      listData: null,
      listTotal: null,
      //列表查询条件
      listQuery: {
        page: 1, //取第几个页面
        limit: 8 //多少条数据
      },
      //====================
      // 管理菜单
      //====================
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //====================
    //  获取数据
    //====================
    getList() {
      this.listLoading = true; //每次重新获取，需要处理
      fetchList(this.listQuery).then(response => {
        this.listData = response.data.items;
        this.listTotal = response.data.total;
        this.listLoading = false;
      });
    },

    //====================
    //  管理
    //====================
    manageDialogOpen() {
      this.manageDialogVisible = true;
    },
    manageDialogClose() {
      this.manageDialogVisible = false;
    },

    //====================
    //  过滤查询
    //====================
    filterQuery() {},

    //====================
    //  页码
    //====================
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.member-container {
  .member-filter {
    width: 90%;
    margin: 0 auto;
    .el-form-item {
      display: flex;
      font-weight: 800;
      height: 0.33rem;
    }
  }
  .member-list {
    width: 95%;
    margin: 0 auto;
    .checked-bt {
      font-size: 0;
      .all-checkbox {
        margin: 0.2rem 0.15rem;
      }
    }
  }
  .member-pagination {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    margin-bottom: 1rem;
    div {
      float: right;
    }
  }
}
</style>

<style lang="scss">
.member-container {
  .el-table__header th {
    background-color: #4b91cd;
    @include setFontColor(0.15rem, white);
  }
  .el-table__header th:nth-child(n + 3):before {
    content: "|";
    color: white;
  }
}
</style>


