<template>
  <div class="stock-container">
    <!-- 搜索，过滤 -->
    <div class="filter-container">
      <el-form ref="form" :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品编号：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="产品货号：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="所属卡：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="所属门店：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="库存状态：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
  }
};
</script>

<style lang="scss" scoped>
.stock-container {
  .filter-container {
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    .el-form-item {
      display: flex;
      font-weight: 800;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
