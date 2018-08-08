<template>
   <table class="table">
   <thead>
        <th>BB</th>
      <slot name="columns">
        <th v-for="data in columns">
          {{data}}
        </th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <slot :row="item">

        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      columns: ["产品编号", "产品ID", "产品说明"],
      data: ["a", "b", "c"]
    };
  }
};
</script>