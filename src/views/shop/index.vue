<template>
  <div class="tab-container">
    1123
  </div>
</template>

<script>
export default {
  name: "tab",
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
