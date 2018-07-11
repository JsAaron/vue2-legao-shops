<template>
  <!-- 附近商家 -->
  <div class="shoplist_container">
    <!-- 数据局没出来的时候显示等待动画 -->
    <ul v-if="shopListArr.length">
      <router-link :to="{path: 'shop'}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
        <!-- 左图 -->
        <figure> <img :src="imgBaseUrl + item.image_path" class="shop_img"> </figure>
        <!-- 右边标题信息组合 -->
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <!-- 如果是品牌 -->
            <h4 :class="item.is_premium? 'premium': ''" class="shop_title">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>
          <!-- 评分，销量 -->
          <h5 class="rating_order_num">
            <!-- 评分 -->
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating='item.rating'></rating-star>
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">月售{{item.recent_order_num}}单</section>
            </section>

          </h5>
        </hgroup>
      </router-link>
    </ul>
    <!-- 等待背景 -->
    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="../../images/shopback.svg" class="list_back_svg">
      </li>
    </ul>
    <!-- 忙绿动画 -->
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
import loading from './loading'
import ratingStar from './ratingStar'
import { getShopList } from '../service/getData'
export default {
  props: ['restaurantCategoryId'],
  data() {
    return {
      imgBaseUrl: 'http://elm.cangdu.org/img/',
      showLoading: true, //显示加载动画
      shopListArr: [], // 店铺列表数据
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      'latitude': 28.19031, //纬度
      'longitude': 113.00131 //经度
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      //获取商品列表数据
      let res = await getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.shopListArr = [...res];
      this.hideLoading();
    },
    hideLoading() {
      this.showLoading = false;
    }
  },
  components: {
    loading,
    ratingStar
  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.shoplist_container {
  background-color: #fff;
  margin-bottom: 2rem;
}

.shop_li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}

.shop_img {
  @include setWH(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
}

//右边信息
.shop_right {
  flex: auto;
  .shop_detail_header {
    @include setFJ;
    align-items: center;
    .shop_title {
      width: 8.5rem;
      color: #333;
      padding-top: .01rem;
      @include setFont(0.65rem, 0.65rem, 'PingFangSC-Regular');
      font-weight: 700;
    }
    .premium::before {
      content: '品牌';
      display: inline-block;
      font-size: 0.5rem;
      line-height: .6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.2rem;
    }
    .shop_detail_ul {
      display: flex;
      transform: scale(.8);
      margin-right: -0.3rem;
      .supports {
        @include setSC(0.5rem, #999);
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
}


.rating_order_num {
  @include setFJ(space-between);
  height: 0.6rem;
  margin-top: 0.52rem;
  .rating_order_num_left {
    @include setFJ(flex-start);
    .rating_section {
      display: flex;
      .rating_num {
        @include setSC(0.4rem, #ff6000);
        margin: 0 0.2rem;
      }
    }
    .order_section {
      transform: scale(.8);
      margin-left: -0.2rem;
      @include setSC(0.4rem, #666);
    }
  }
  .rating_order_num_right {
    display: flex;
    align-items: center;
    transform: scale(.7);
    min-width: 5rem;
    justify-content: flex-end;
    margin-right: -0.8rem;
    .delivery_style {
      font-size: 0.4rem;
      padding: 0.04rem 0.08rem 0;
      border-radius: 0.08rem;
      margin-left: 0.08rem;
      border: 1px;
    }
    .delivery_left {
      color: #fff;
      background-color: $blue;
      border: 0.025rem solid $blue;
    }
    .delivery_right {
      color: $blue;
      border: 0.025rem solid $blue;
    }
  }
}


//商铺忙绿
.list_back_li {
  height: 4.85rem;
  .list_back_svg {
    @include setWH(100%, 100%)
  }
}

//忙绿动画
.loading-enter-active,
.loading-leave-active {
  transition: opacity 1s
}

.loading-enter,
.loading-leave-active {
  opacity: 0
}

</style>
