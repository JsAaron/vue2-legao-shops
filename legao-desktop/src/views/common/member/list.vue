<template>

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

  </div>


</template>

<script>
import { fetchList, fetchPersonal } from "@/api/member";
import { transformMemberStatuss, memberStatus } from "@/utils";
import { mapGetters, mapActions } from "vuex";

export default {
  /**
   mobile: "", //查询电话
   card_name: "", //查询卡类型
   date: "", //查询时间
   flag: "", //查询状态
   pages: 1, //取第几个页面
   limit: 8 //多少条数据
   */
  props: ["listQuery"],
  data() {
    return {
      //====================
      // 数据列表
      //====================
      listLoading: true,
      listData: null,
      listTotal: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    transformMemberStatuss,
    ...mapActions(["MemberManageOpen", "UpdateAppScroll", "UpdatePersonal"]),

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
          let personalData = {};
          for (let key in data) {
            //数组只取第一条
            if (~["depositLog", "timesLog"].indexOf(key)) {
              personalData[key] = data[key][0];
            } else {
              personalData[key] = data[key];
            }
          }
          //设置会员数据
          this.UpdatePersonal(personalData);
        })
        .then(() => {
          this.MemberManageOpen();
        });
    },

    //====================
    //  页码
    //====================
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
