<template>
  <div>
    <!-- 快速查询 -->
    <common-dialog class="member-query-dialog el-dialog-middle" @close-self="memberQueryDialogClose" :before-close="memberQueryDialogClose" :visible="memberQueryVisible" title="会员卡快速查询">
      <div class="main" slot="main">
        <p class="phone">手机号码:</p>
        <div>
          <el-input
            placeholder="请输入会员/办卡人手机号码"
            v-model="mobile"
            clearable>
          </el-input>
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="memberQueryDialogClose">取消</el-button>
        <el-button type="primary" @click="memberQueryDialogOpen">确定</el-button>
      </template>
    </common-dialog>

    <!-- 显示数据列表 -->
    <common-dialog class="legao-list query-dialog el-dialog-super"  @close-self="listQueryDialogClose"  :visible="listQueryDialogVisible" title="查询结果">
      <div class="main" slot="main">
        <el-scrollbar>
          <!-- 主体列表查询 -->
          <el-table
            :data="listData"
            tooltip-effect="dark">
            <el-table-column
              prop="username"
              label="会员姓名"
              width="150"
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
        </el-scrollbar>
      </div>
    </common-dialog>

    <!-- 管理 -->
    <member-manage @close-self="manageDialogClose" :visible="memberManageVisible" :personalData="personalData"></member-manage>

  </div>
</template>

<script>
import { fetchList, fetchPersonal } from "@/api/member";
import MemberManage from "@/views/common/member/manage";
import CommonDialog from "@/views/common/dialog";
import store from "@/store";
import { transformMemberStatuss, memberStatus } from "@/utils";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters(["memberQueryVisible", "memberManageVisible"])
  },
  data() {
    return {
      listData: "",
      listTotal: "",
      mobile: "",
      listQueryDialogVisible: false,
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
  methods: {
    transformMemberStatuss,
    ...mapActions([
      "MemberQueryClose",
      "MemberManageOpen",
      "MemberManageClose"
    ]),

    /////////////////
    /// 查询页面
    /////////////////
    memberQueryDialogClose() {
      this.MemberQueryClose();
    },
    memberQueryDialogOpen() {
      fetchList({
        mobile: this.mobile,
        pages: 1, //取第几个页面
        limit: 8 //多少条数据
      }).then(response => {
        this.listData = [...response.data.data];
        this.listTotal = Number(response.data.count);
        this.listQueryDialogVisible = true;
      });
    },

    //列表页面关闭
    listQueryDialogClose() {
      this.listQueryDialogVisible = false;
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
        })
        .then(() => {
          this.MemberManageOpen();
        });
    },
    manageDialogClose() {
      this.MemberManageClose();
    }
  },
  components: {
    MemberManage,
    CommonDialog
  }
};
</script>
<style lang="scss" scoped>
.member-query-dialog {
  .main {
    width: 90%;
    margin: 0 auto;
    .phone {
      font-size: 0.15rem;
      margin-bottom: 0.2rem;
    }
  }
  .query-dialog {
  }
}
</style>
