<template>
  <div class="details-container">
    <head-top></head-top>
    <section class="details-top van-hairline--bottom">
      <van-swipe :autoplay="3000" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <p class="details-text">有效期内门店乐高产品任玩+线上商城600元以内免押金租金任玩有效期内门店乐高产品任玩+线上商城600元以内免押金租金任玩1文本溢出显示省略号,文本溢出显示省略号,文本溢出显示省略号,文本溢出显示省略</p>
      <p class="details-price"><span>&yen;</span>899</p>
    </section>
    <section class="details-middle van-hairline--bottom">
      <van-row>
        <van-col span="8">
          <label>运费:</label><span>免运费</span>
        </van-col>
        <van-col span="8">
          <label>销量:</label><span>92</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="21">
          <label>选择:</label><span>92</span>
        </van-col>
        <van-col span="2">
          <van-icon name="arrow" color="#999999" />
        </van-col>
      </van-row>
    </section>

  </div>
</template>

<script>
import headTop from "@/views/common/head";
export default {
  components: { headTop },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg",
        "https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg"
      ]
    };
  },
  created() {
    // console.log(this.$route.query);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.sectionWidth {
  width: 90%;
  margin-left: 5%;
}
.details-container {
  .details-top {
    @extend .sectionWidth;
    padding-bottom: 20px;
    &::after {
      border-color: #b5b5b5;
    }
    .van-swipe {
      margin: 47px auto;
      width: 645px;
      height: 432px;
      img {
        width: 645px;
        height: 432px;
        background-size: 100% 100%;
      }
    }
    .details-text {
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-indent: 2em;
    }
    .details-price {
      width: 152px;
      height: 50px;
      color: #ff4444;
      font-size: 35.66px;
      margin-top: 30px;
    }
  }
  .details-middle {
    padding-left: 5%;
    height: 144px;
    &::after {
      border-color: #b5b5b5;
    }
    .van-row {
      &:first-child {
        margin-top: 15.9px;
        color: #999999;
        font-size: 24px;
      }
      &:last-child {
        margin-top: 50px;
        color: #000000;
        font-size: 28px;
      }
    }
  }
}
</style>
