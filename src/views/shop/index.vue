<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{createdTimes}}</el-tag>
    <el-alert style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" :closable="false">
    </el-alert>
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "tab",
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "China", key: "CN" },
        { label: "USA", key: "US" },
        { label: "Japan", key: "JP" },
        { label: "Eurozone", key: "EU" }
      ],
      activeName: "CN",
      createdTimes: 0
    };
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
