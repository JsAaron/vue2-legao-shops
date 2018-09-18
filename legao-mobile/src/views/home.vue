<template>
  <div class="home-container">
    <header>
      <p>长沙市-喜盈门范城店</p>
    </header>
    <div class="home-main">
      <header>
        <div>
          <p>我的卡包</p>
          <p>0</p>
        </div>
        <div>
          <img src="../images/home/icon.png"/>
          <h3>张三</h3>
        </div>
        <div>
          <p>我的余额</p>
          <p>0</p>
        </div>  
      </header>
      <nav>
        <div class="home-card">
          <img src="../images/home/card.png"/>
          <h3>我的会员卡</h3>
        </div>
        <div calss="home-qr">
          <img src="../images/home/qr.png"/>
          <h3>扫码下单</h3>
        </div>
        <div class="home-order">
          <img src="../images/home/order.png"/>
          <h3>我的订单</h3>
        </div>
        <div class="home-query">
          <img src="../images/home/query.png"/>
          <h3>清点查询</h3>
        </div>
      </nav>
      <section>
        <header>
          <span></span>
          <h1>会员卡商城</h1>
          <span></span>
        </header>
        <ul>
          <li v-for="item in this.cardListData" :key="item.id">
            <figure>
              <img :src="item.img_url" />
              <div>
                <figcaption><span>{{item.description}}</span></figcaption>
                <p><span>669元</span></p>
                <div class="arrows"></div> 
              </div>
            </figure>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { getCardList } from "@/api/home";
export default {
  data() {
    return {
      //====列表======
      cardListData: []
    };
  },
  mounted() {
    this.getCardList();
  },
  methods: {
    getCardList() {
      getCardList().then(response => {
        this.cardListData = [...response.data.data.list];
        console.log(this.cardListData);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  > header {
    height: 251px;
    background-color: #f7bf1f;
    p {
      position: absolute;
      left: 85.73px;
      top: 77.92px;
      font-size: 24px;
    }
  }
  .home-main {
    background-color: #ffffff;
    > header {
      position: absolute;
      left: 41px;
      top: 214px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: #ffffff;
      width: 669px;
      height: 164px;
      display: flex;
      justify-content: space-around;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > img {
          width: 116.27px;
          height: 116.27px;
          position: relative;
          top: -70px;
        }
        > h3 {
          position: relative;
          font-size: 30px;
          color: #f7bf1f;
          top: -50px;
        }
        p:first-child {
          font-size: 24px;
          color: #b4b4b4;
          line-height: 32px;
        }
        p:last-child {
          font-size: 39px;
          color: #000000;
          line-height: 61px;
        }
      }
    }
    > nav {
      margin-top: 130px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-bottom: 50px;
      > div {
        flex: 1;
        img {
          height: 51px;
        }
        h3 {
          margin-top: 15px;
          font-size: 24px;
          color: #000000;
          line-height: 33px;
          font-weight: bold;
        }
      }
      .home-card {
        width: 50px;
      }
      .home-qr {
        width: 33px;
      }
      .home-order {
        width: 42.81px;
      }
      .home-query {
        width: 68px;
        height: 46px;
      }
    }
    > section {
      > header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        h1 {
          font-size: 40px;
          color: #f7bf1f;
          height: 42px;
          text-align: center;
        }
        span {
          width: 25%;
          height: 2px;
          background-color: #f7bf1f;
          display: inline-block;
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          width: 692px;
          height: 295px;
          background-image: url("../images/home/type.png");
          background-size: 100% 100%;
          overflow: hidden;
          figure {
            height: 100%;
            display: flex;
            align-items: center;
            img {
              float: left;
              width: 392px;
              height: 257px;
              margin-left: 25px;
            }
            div {
              float: left;
              width: 280px;
              height: 257px;
              position: relative;
              figcaption {
                width: 80%;
                margin: 10px auto 0 auto;
                font-size: 19px;
                line-height: 30px;
                height: 150px;
                display: table;
                span {
                  display: table-cell;
                  vertical-align: middle;
                }
              }
              p {
                font-size: 28px;
                color: #ffffff;
                text-align: center;
                width: 200px;
                height: 45px;
                margin: 0 auto;
                background-color: #f7bf1f;
                @include borderRadius(20px);
                display: table;
                span {
                  display: table-cell;
                  vertical-align: middle;
                }
              }
              .arrows {
                width: 31px;
                height: 17px;
                background-image: url("../images/home/arrows.png");
                background-size: 100% 100%;
                position: absolute;
                right: 45px;
                bottom: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
