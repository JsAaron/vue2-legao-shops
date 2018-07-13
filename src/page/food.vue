<template>
  <div class="city_container">
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { getHomeAddress } from 'src/service/getData'
export default {
  data() {
    return {
      geohash: '', // city页面传递过来的地址geohash
      headTitle: '', // msiet页面头部标题
      foodTitle: '', // 排序左侧头部标题
      restaurant_category_id: '', // 食品类型id值
      restaurant_category_ids: '', //筛选类型的id
    }
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    async initData() {
      //获取从home页面传递过来的参数
      this.geohash = this.$route.query.geohash;
      this.headTitle = this.$route.query.title;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      if (!this.latitude) {
        //获取位置信息
        let res = await getHomeAddress(this.geohash);
        // 记录当前经度纬度进入vuex
        this.RECORD_ADDRESS(res);
      }
    }
  },
  components: {}
}

</script>
<style lang="scss" scoped>


</style>
