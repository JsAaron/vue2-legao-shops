<template>
  <div>
    <!-- 管理编辑 -->
    <el-dialog class="update-dialog" title="商品信息" :visible.sync="dialogVisible" :before-close="handleClose" >
      <!-- 左图 -->
      <section><img src="../../images/common/logo.png"></section>
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
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
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
    },
    handleUpdate() {
      this.$emit("close-dialog");
    }
  }
};
</script>

<style lang="scss" >
.update-dialog,
.submit-dialog {
  .el-dialog {
    @include borderRadius(0.2rem);
    // background: transparent;
    margin-top: 0 !important;
    @include setCenter;
    .el-dialog__header {
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      background: #4b91cd;
      position: relative;
      .el-dialog__title {
        @include setCenter;
      }
      .el-dialog__title,
      .el-dialog__close {
        font-size: 0.22rem;
        color: #ffffff;
      }
    }
    .el-dialog__body {
      background: #ffffff;
    }
    .el-dialog__footer {
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}

//管理
.update-dialog {
  .el-dialog {
    @include setWH(8.14rem, auto);
    .el-dialog__header {
      height: 0.62rem;
    }
    .el-dialog__body {
      display: flex;
      padding-top: 0.3rem;
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
  }
}
</style>
