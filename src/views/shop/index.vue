<template>
  <div class="shop-container">
    <el-table class="shop-layout" :data="listData" highlight-current-row>
      <el-table-column prop="rolename" label="账号类别">
      </el-table-column>
      <el-table-column prop="realname" label="账号">
      </el-table-column>
      <el-table-column prop="shopname" label="所属门店">
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button type="primary" @click="changePassword(scope.$index, scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改密码 -->
    <common-dialog class="password-dialog el-dialog-mini" @close-self="passwordDialogClose" :visible="passwordDialogVisible" :title="passwordDialogTitle">
      <template class="main" slot="main">
        <el-form ref="passwrodDialogForm" :model="passwrodDialogForm"  :rules="rules">
          <el-form-item label="账号：" label-width="50px">
            <el-input v-model="passwrodDialogForm.realname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword1">
            <el-input type="password" v-model="passwrodDialogForm.newPassword1"  placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword2">
            <el-input type="password" v-model="passwrodDialogForm.newPassword2" placeholder="请再次确定新密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footer">
        <el-button type="primary" @click="passwordDialogClose">取消</el-button>
        <el-button type="primary" @click="passwordDialogSave">确定修改</el-button>
      </template>
    </common-dialog>

  </div>
</template>

<script>
import { fetchList, chagePassword } from "@/api/shop";
import CommonDialog from "@/views/common/dialog";
import { isPasswd } from "@/utils/validate";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
export default {
  components: { CommonDialog },
  computed: {
    ...mapGetters(["userId"])
  },
  data() {
    const validatePassword1 = (rule, value, callback) => {
      if (!isPasswd(value)) {
        callback(new Error("密码不能小于六位数"));
      } else {
        callback();
      }
    };

    const validatePassword2 = (rule, value, callback) => {
      if (
        this.passwrodDialogForm.newPassword1 ===
        this.passwrodDialogForm.newPassword2
      ) {
        callback;
      } else {
        callback(new Error("两次密码输入不一致"));
      }
    };

    return {
      //====================
      // 数据列表
      //====================
      listData: null,
      listTotal: null,
      listQuery: {
        pages: 1, //取第几个页面
        limit: 8 //多少条数据
      },
      //====================
      // 修改密码
      //====================
      passwordDialogVisible: false,
      passwordDialogTitle: "修改密码",
      passwrodDialogForm: {
        id: "",
        realname: "",
        newPassword1: "",
        newPassword2: ""
      },
      rules: {
        newPassword1: [{ trigger: "blur", validator: validatePassword1 }],
        newPassword2: [{ trigger: "blur", validator: validatePassword2 }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.listData = [...response.data.data.list];
        this.listTotal = Number(response.data.data.count);
        // console.log(this.listData);
      });
    },
    passwordDialogClose() {
      this.passwordDialogVisible = false;
    },
    passwordDialogSave() {
      if (
        this.passwrodDialogForm.id &&
        isPasswd(this.passwrodDialogForm.newPassword1) &&
        this.passwrodDialogForm.newPassword1 ===
          this.passwrodDialogForm.newPassword2
      ) {
        chagePassword({
          aid: this.userId,
          id: this.passwrodDialogForm.id,
          psw: this.passwrodDialogForm.newPassword1
        }).then(res => {
          if (res.data.state === "ok") {
            Message({
              message: "密码修改成功!",
              type: "success",
              duration: 1000
            });
            setTimeout(this.passwordDialogClose, 1500);
          } else {
            Message({
              message: "密码修改失败!",
              type: "error",
              duration: 1000
            });
          }
        });
      }
    },
    changePassword(index, row) {
      this.passwordDialogVisible = true;
      this.passwrodDialogForm = {
        id: row.id,
        realname: row.realname
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  .shop-layout {
    width: 70%;
    @include borderRadius(15px);
    text-align: center;
    margin: 0 auto;
    margin-top: 100px;
    padding-bottom: 40px;
  }
  .dialog-footer {
    .el-button {
      width: 1.56rem;
      height: 0.49rem;
      padding: 0;
    }
  }
}
</style>

<style lang="scss" >
// 重写th的优先级
.shop-container {
  margin-top: 1.2rem;
  .shop-layout {
    border: 1px solid #d5d5d5;
  }
  .el-table th {
    background: #4b91cd;
    text-align: center;
    padding: 0.2rem;
    .cell {
      font-weight: 800;
      @include setFontColor(0.2rem, white);
    }
  }
  .password-dialog {
    .el-dialog__body {
      padding: 0.3rem;
    }
  }
  .el-table__body-wrapper {
    text-align: center;
    .cell {
      font-weight: 800;
    }
    td {
      padding: 0.15rem;
    }
  }
}
</style>
