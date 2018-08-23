<template>
  <div class="query-container">
    <div class="query-dialog">
      <h1>会员卡快速查询</h1>
      <p>手机号码：</p>
      <div>
        <el-input
          placeholder="请输入电话号码"
          v-model="phone"
          clearable>
        </el-input>
      </div>
      <div>
        <el-button type="primary" >取消</el-button>
        <el-button type="primary" >确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: ""
    };
  },
  methods: {
    manageDialogSave() {}
  }
};
</script>

<style lang="scss" scoped>
.query-container {
  .query-dialog {
    @include setWH(5.5rem, 3.7rem);
    @include borderRadius(0.2rem);
    margin: 0 auto;
    background-color: #ffffff;
    margin-top: 1.5rem;
    h1 {
      background-color: #4b91cd;
      text-align: center;
      height: 0.69rem;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
    }
  }
}
</style>

