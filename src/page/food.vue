<template>
  <div class="food_container">
      <!-- 头部信息 -->
    	<head-top :head-title="headTitle" goBack="true"></head-top>

      <!-- 下拉排序 -->
    	<section class="sort_container">
        <!-- 左边美食 -->
    		<div class="sort_item" :class="{choose_type:sortBy == 'food'}">
          <!-- 按钮内容 -->
          <div class="sort_item_container" @click="chooseType('food')">
    				<div class="sort_item_border">
              <!-- 名字 -->
    					<span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
              <!-- 图标 -->
		    			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    			<polygon points="0,3 10,3 5,8"/>
			    		</svg>
    				</div>
    			</div>
          <!-- 内容 -->
          <section v-show="sortBy == 'food'">
            <section class="category_left">
	    					<ul>
	    						<li v-for="(item, index) in category" :key="index" class="category_left_li" >
									<section>
										<!-- <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon"> -->
										<span>{{item.name}}</span>
									</section>
									<!-- <section>
	    								<span class="category_count">{{item.count}}</span>
	    								<svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    			<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    		</svg>
									</section> -->
	    						</li>
	    					</ul>
            </section>
            <section class="category_right"></section>
          </section>
    		</div>
        <!-- 中间 -->
    		<div class="sort_item">
    		</div>
        <!-- 右边 -->
        <div class="sort_item">
    		</div>
    	</section>

      <!-- 默认分类的详细列表 -->
    	<section class="shop_list_container">
	    	<shop-list :geohash="geohash" ></shop-list>
    	</section>

  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/head";
import shopList from "src/components/shoplist";
import { getHomeAddress, getFoodCategory } from "src/service/getData";

export default {
  data() {
    return {
      category: null, // category分类左侧数据
      sortBy: "", // 筛选的条件
      foodTitle: "", // 排序左侧头部标题
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
      this.foodTitle = this.headTitle;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      if (!this.latitude) {
        //获取位置信息
        let res = await getHomeAddress(this.geohash);
        // 记录当前经度纬度进入vuex
        this.RECORD_ADDRESS(res);
      }

      //获取category分类左侧数据
      this.category = await getFoodCategory(this.latitude, this.longitude);
    },
    // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
    chooseType(type) {
      if (this.sortBy !== type) {
        this.sortBy = type;
        //food选项中头部标题发生改变，需要特殊处理
        if (type == "food") {
          this.foodTitle = "分类";
        } else {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = "";
        if (type == "food") {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      }
    }
  },
  components: {
    headTop,
    shopList
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
    height: 1.6rem;
    flex: 1;
    text-align: center;
    line-height: 1rem;
    .sort_item_container {
      @include setWH(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.3rem;
      .sort_item_border {
        height: 1rem;
        border-right: 0.025rem solid $bc;
      }
    }
  }
  // 列表点击选
  .choose_type {
    .sort_item_container {
      .category_title {
        color: $blue;
      }
      .sort_icon {
        transform: rotate(180deg);
        fill: $blue;
      }
    }
  }
}
</style>
