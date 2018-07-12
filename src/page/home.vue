<template>
  <div>
    <!-- 头部 -->
    <head-top>
      <router-link to="/home" slot="home-title" class="home_title">
        <span class="title_text">{{homeTitle}}</span>
      </router-link>
    </head-top>
    <!-- 分类 -->
    <nav class="home_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food'}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!-- 详细产品列表 -->
    <div class="shop_list_container">
      <!-- 标题 -->
      <header class="shop_header">
        <icon class="shop_icon" name="shop"></icon>
        <span class="shop_header_title">附近商家</span>
      </header>
      <!-- 商品列表 -->
      <shop-list :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import headTop from 'src/components/head'
import shopList from 'src/components/shoplist'
import footGuide from 'src/components/footGuide'
import { getFoodTypes } from '../service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
export default {
  data() {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      geohash: '28.19031,113.00131',
      homeTitle: '长沙中国城戴斯酒店',
      foodTypes: [], // 食品分类列表
    }
  },
  mounted() {
    // 通过坐标，获取视频分类
    getFoodTypes(this.geohash).then(res => {
      let resLength = res.length;
      let resArr = [...res]; // 返回一个新的数组
      let foodArr = [];
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8);
      }
      this.foodTypes = foodArr;
    }).then(() => {
      //初始化swiper
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true
      });
    })
  },
  components: {
    headTop,
    shopList,
    footGuide
  }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';
.home_title {
  @include setUDRLCenter;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include setSC(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}

.home_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include setWH(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include setWH(100%, 100%);
  }
}

.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include setFJ(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include setWH(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include setSC(0.55rem, #666);
      }
    }
  }
}


.shop_list_container {
  margin-top: .4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include setWH(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include setFont(0.55rem, 1.6rem);
    }
  }
}

</style>
