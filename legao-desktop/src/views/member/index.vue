<template>
  <div class="member-container">
    <!-- 搜索，过滤 -->
    <div class="legao-filter">
      <el-form size="small" :model="listQuery">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="手机号码:">
              <el-input v-model="listQuery.mobile" clearable prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="卡类型:">
              <el-input v-model="listQuery.card_name" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="状态:">
              <el-select v-model="listQuery.flag" clearable>
                <el-option
                  v-for="state in memberStatus"
                  :key="state.value"
                  :label="state.label"
                  :value="state.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="时间:" clearable>
              <el-date-picker
                v-model="listQuery.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" size="small" @click="filterReset">重置</el-button>
              <el-button type="primary" size="small" @click="filterQuery">开始查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 主体列表查询 -->
    <div class="legao-list legao-table-line">
      <el-table
        v-loading="listLoading" 
        :data="listData"
        tooltip-effect="dark">
        <el-table-column
          prop="username"
          label="会员姓名"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="card_name"
          label="卡类型"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="开始时间">
          <template slot-scope="scope">
            <p>{{scope.row.card_start_time.split(" ")[0]}}</p>
            <p>{{scope.row.card_start_time.split(" ")[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="结束时间">
          <template slot-scope="scope">
            <p>{{scope.row.card_end_time.split(" ")[0]}}</p>
            <p>{{scope.row.card_end_time.split(" ")[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          width="100"
          label="状态">
          <template slot-scope="scope">
            {{transformMemberStatuss(scope.row.flag)}}
          </template>
        </el-table-column>
        <el-table-column 
          align="center" 
          width="120"
          label="操作"> 
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="manageDialogOpen(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 底部页码导航 -->
    <div class="legao-pagination">
      <el-pagination
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[8,10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal">
      </el-pagination>
    </div>

    <!-- 管理 -->
    <member-manage @close-self="manageDialogClose" :visible="memberManageVisible" :personalData="personalData"></member-manage>

  </div>
</template>

<script>
import { fetchList, fetchPersonal } from "@/api/member";
import MemberManage from "@/views/common/member/manage";
import { transformMemberStatuss, memberStatus } from "@/utils";
import { mapGetters, mapActions } from "vuex";

/**
 * 默认查询条件
 */
const defaultQuery = {
  mobile: "", //查询电话
  card_name: "", //查询卡类型
  date: "", //查询时间
  flag: "", //查询状态
  pages: 1, //取第几个页面
  limit: 8 //多少条数据
};

export default {
  components: {
    MemberManage
  },
  computed: {
    ...mapGetters(["memberManageVisible"])
  },
  data() {
    return {
      //====================
      // 数据列表
      //====================
      listLoading: true,
      listData: null,
      listTotal: null,
      memberStatus,
      listQuery: Object.assign({}, defaultQuery), //列表查询条件
      //====================
      // 管理目录,数据定义
      //====================
      personalData: {
        avatar: "",
        username: "",
        usermobile: "",
        card_name: "",
        deposit: "",
        depositLog: {
          created: "",
          remark: ""
        },
        timesLog: {
          created: "",
          remark: ""
        }
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions(["MemberManageOpen", "MemberManageClose", "UpdateAppScroll"]),
    transformMemberStatuss,
    //====================
    //  获取数据
    //====================
    getList(updateScroll) {
      this.listLoading = true; //每次重新获取，需要处理
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

    //====================
    //  管理
    //====================
    manageDialogOpen(data) {
      fetchPersonal({ card_no: data.card_no })
        .then(response => {
          const data = response.data.data;
          for (let key in data) {
            //数组只取第一条
            if (~["depositLog", "timesLog"].indexOf(key)) {
              this.personalData[key] = data[key][0];
            } else {
              this.personalData[key] = data[key];
            }
          }
          console.log(this.personalData);
        })
        .then(() => {
          this.MemberManageOpen();
        });
    },
    manageDialogClose() {
      this.MemberManageClose();
    },

    //====================
    //  过滤查询
    //====================
    filterQuery() {
      if (this.listQuery.date) {
        this.listQuery.starttime = this.listQuery.date[0];
        this.listQuery.endtime = this.listQuery.date[1];
      }
      this.getList();
    },
    filterReset() {
      this.listQuery = Object.assign({}, defaultQuery);
      // this.$refs.pagination.size(1);
      // console.log(this.$refs.);
      this.getList(true);
    },

    //====================
    //  页码
    //====================
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val;
      this.getList();
    }
  }
};
</script>


