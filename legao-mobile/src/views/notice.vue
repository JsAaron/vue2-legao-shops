<template>
  <div class="details-notice">
    <head-top title="读酷会员借还须知" class="white"></head-top>
    <section>
      <img src="../images/notice/notice.png"/>
    </section>
  </div>
</template>

<script>
import headTop from "@/views/common/head";
export default {
  components: { headTop },
  data() {
    return {
      checked: false
    };
  },
  created() {
    // console.log(this.$route.query);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.details-notice {
  // .head-top {
  //   background-color: #f7bf1f;
  //   color: #ffffff;
  //   .head-arrow .van-icon {
  //     color: #ffffff !important;
  //   }
  // }
  > section {
    padding: 50px 0;
    background-color: #dbdbdb;
    img {
      width: 667px;
      height: 1456px;
      background-size: 100% 100%;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
