<template>

  <el-dialog title="商品信息" :visible.sync="dialogVisible" :before-close="handleClose" >
    <!-- 左图 -->
    <section>
      <img src="../../images/logo.png">
    </section>
    <!-- 右表单 -->
    <el-form ref="editForm"  :model="editForm" >
      <el-form-item label="产品名称 :">气球气球气球</el-form-item>
      <div class="between">
        <el-form-item label="产品货号 :">22222-41-13</el-form-item>
        <el-form-item label="颗 粒 数 :">542</el-form-item>
      </div>
      <div class="between">
        <el-form-item label="押 金 价 :">951.00</el-form-item>
        <el-form-item label="进 货 价 :">844.00</el-form-item>
      </div>
      <el-form-item label="产品状态 :">
        <el-select v-model="editForm.region" placeholder="二手">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="完 整 性 :">
        <el-select v-model="editForm.region" placeholder="二手">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属门店 :">
        <el-select v-model="editForm.region" placeholder="长沙喜盈门范城">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能管理 :">
        <el-select v-model="editForm.region" placeholder="可租借">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary"  @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>

  </el-dialog>

</template>



<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      password: "",
      password_sure: "",
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      editForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.stock-container {
  .el-dialog {
    @include setWH(8.14rem, 5.92rem);
    @include borderRadius(0.2rem);
    background: #4b91cd;
    .el-dialog__header {
      height: 0.62rem;
      position: relative;
      .el-dialog__title {
        @include setCenter;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.25rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      height: 4rem;
      background: #ffffff;
      display: flex;
      padding-top: 0.2rem;
      align-items: center;
      img {
        @include setWH(2.92rem, 2.92rem);
      }
      .el-form {
        width: 4.6rem;
        height: 2.92rem;
        margin-left: 0.1rem;
        .between {
          display: flex;
        }
        .between div:first-child {
          width: 2.7rem;
        }
        .el-form-item {
          margin-bottom: 0.05rem;
          display: flex;
          align-items: center;
        }
        .el-form-item__label {
          width: 0.8rem;
          text-align: left;
        }
        .el-form-item__label,
        .el-form-item__content {
          line-height: 0.4rem;
          display: inline-block;
          font-weight: 600;
          font-size: 0.15rem;
          padding: 0;
        }
      }
    }
    .el-dialog__footer {
      height: 1.3rem;
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}
</style>
