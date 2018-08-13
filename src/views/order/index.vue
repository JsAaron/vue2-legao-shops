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

  </div>
</template>

<script>
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
      }
    };
  }
};
</script>

