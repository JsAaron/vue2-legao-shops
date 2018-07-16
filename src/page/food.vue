<template>
  <div class="food_container">
      <!-- 头部信息 -->
    	<head-top :head-title="headTitle" goBack="true"></head-top>

      <!-- 下拉排序 -->
    	<section class="sort_container">
    		<div class="sort_item">
    		</div>
    		<div class="sort_item">
    		</div>
        <div class="sort_item">
    		</div>
    	</section>

  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/head";
import { getHomeAddress } from "src/service/getData";
export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      headTitle: "", // msiet页面头部标题
      foodTitle: "", // 排序左侧头部标题
      restaurant_category_id: "", // 食品类型id值
      restaurant_category_ids: "" //筛选类型的id
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS"]), //
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
  components: {
    headTop
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.food_container {
  padding-top: 3.6rem;
}
.sort_container {
  background-color: #fff;
  border-bottom: 0.025rem solid #f1f1f1;
  position: fixed;
  top: 1.95rem;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 13;
  box-sizing: border-box;
  .sort_item {
    @include setSC(0.55rem, #444);
    @include setWH(33.3%, 1.6rem);
    text-align: center;
    line-height: 1rem;
  }
}
</style>
