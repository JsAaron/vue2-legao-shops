<template>
  <!-- 附近商家 -->
  <div class="shoplist_container">
    <ul>
    </ul>
  </div>
</template>
<script>
import { getShopList } from '../service/getData'
export default {
  props: ['restaurantCategoryId'],
  data() {
    return {
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      'latitude':28.19031 , //纬度
      'longitude':113.00131 //经度
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      //获取商品列表数据
      let res = await getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
    }
  }
}

</script>
<style lang="scss" scoped>


</style>
