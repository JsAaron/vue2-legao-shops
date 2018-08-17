<template>
  <div class="sell-container">
    <div class="sell-left">
      <ul>
        <li><img src="../../images/menber-sell/1-1.png" /></li>
        <li><img src="../../images/menber-sell/1-2.png" /></li>
        <li><img src="../../images/menber-sell/1-3.png" /></li>
      </ul>
      <ul>
        <li><img src="../../images/menber-sell/2-1.png" /></li>
        <li><img src="../../images/menber-sell/2-2.png" /></li>
        <li><img src="../../images/menber-sell/2-3.png" /></li>
      </ul>
      <ul>
        <li><img src="../../images/menber-sell/3-1.png" /></li>
        <li><img src="../../images/menber-sell/3-2.png" /></li>
        <li><img src="../../images/menber-sell/3-3.png" /></li>
      </ul>
      <ul>
        <li><img src="../../images/menber-sell/4-1.png" /></li>
        <li class="sell-account">
          <p>共1件商品</p>
          <p>
            <laber>应收:</laber><span>899.00</span>
            <laber>实收:</laber><span>899.00</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="sell-right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sell-container {
  margin-top: 0.2rem;
  display: flex;
  .sell-left {
    margin-left: 0.5rem;
    ul {
      display: flex;
      li {
        margin-top: 0.15rem;
        margin-left: 0.15rem;
      }
      img {
        @include setWH(2.786rem, 1.75rem);
        @include borderRadius(0.26rem);
      }
      .sell-account {
        width: 200%;
        @include borderRadius(0.26rem);
        border: 1px solid #707070;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        p {
          font-size: 0.2rem;
        }
      }
    }
  }
  .sell-right {
    margin-left: 0.5rem;
    @include setWH(5.52rem, 7.8rem);
    border: 1px solid #707070;
    @include borderRadius(0.26rem);
  }
}
</style>

