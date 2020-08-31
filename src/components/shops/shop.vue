<template>
  <div class="shop_container">
    <div class="shopList">
      <router-link :to="'/shopdetail/' + item.id" class="item" v-for="item in shoplist" :key="item.id">
        <div class="Img">
          <img v-lazy="item.img_url" />
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="price">
            ¥ {{ item.sell_price }}
            <span class="buy"><del>￥{{ item.market_price }}</del></span>
          </div>
          <div class="hot">
              <span>热卖中</span>
                <span>剩{{ item.stock_quantity }}件</span>
          </div>
        </div>
      </router-link>
    </div>
    <van-button @click="getNextPage" type="danger" block>加载更多</van-button>
  </div>
</template>

<script>
import { getGoods } from "@/api/index.js";
import { Button,Toast  } from 'vant';
export default {
  data() {
    return {
      shoplist: [],
      page:1
    };
  },
  components:{
      "van-button":Button
  },
  methods: {
    async getgoods() {
      var { message } = await getGoods(this.page);
      if(message.length == 0){
          Toast("亲，已经到底了!")
          return ;
      }
      this.shoplist = this.shoplist.concat(message);

    },
    getNextPage(){
        this.page ++;
        this.getgoods();
    }
  },
  created() {
    this.$parent.ShowNavBar({ title: "商品列表" });
    this.getgoods();
  },
};
</script>

<style lang="scss" scoped>
.shop_container {
  background-color: #e2e2e2;
  .shopList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 5px;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 47%;
      margin: 4px 0;
      padding: 4px;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      .Img {
          width: 100%;

            img {
                flex: 1;
                width: 100%;
                height: 160px;
            }
      }

      .text {
        padding: 4px;
        .title {
          font-size: 12px;
          color: #333;
        }
        .price {
          margin-top: 6px;
          font-size: 16px;
          color: #ff5500;
          .buy {
            margin-left: 10px;
            font-size: 12px;
            color: #999;
          }
        }
        .hot {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #565252;
        }
      }
    }
  }
}
</style>
