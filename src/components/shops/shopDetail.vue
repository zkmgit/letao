<template>
  <div class="shopdetail_container">
    <div class="item">
      <!-- {{id}} -->
      <div class="Img">
        <van-swipe van-swipeclass="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in lunboImg" :key="item.img">
            <img :src="item.src" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="text">
        <p class="title">{{ goodInfo.title }}</p>
        <div class="price">
          <span class="left">
            <del>市场价：￥{{ goodInfo.market_price }}</del>
          </span>
          本店价：
          <span class="right">￥{{ goodInfo.sell_price }}</span>
        </div>
        <van-field name="stepper" label="购买数量">
          <template #input>
            <van-stepper v-model="stepper" />
          </template>
        </van-field>
      </div>
      <div class="info">
        <div class="title">其他信息</div>
        <div>商品货号：{{ goodInfo.goods_no }}</div>
        <div>库存情况：{{ goodInfo.stock_quantity }}</div>
        <div>上架时间：{{ goodInfo.add_time | dateFormat }}</div>
      </div>
      <div class="introduce">
        <div class="title">介绍</div>
        <div v-html="goodInfo.content" class="content"></div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" to="/mycar" text="购物车" :badge="this.$store.getters.getCount" />
        <van-goods-action-button @click="addCar" type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import {
  Field,
  Stepper,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
} from "vant";
import { getGoodsInfo, getThumBimages } from "@/api/index.js";
export default {
  props: ["id"],
  data() {
    return {
      stepper: 1,
      goodInfo: {},
      lunboImg: [],
      count: 0,
      carInfo: [],
    };
  },
  methods: {
      addCar(){
          var goods = {
              id:this.id,
              number:this.stepper,
              flag:true,
              price:this.goodInfo.sell_price
          }
          this.$store.commit('addCar',goods);
      },
    // addCar() {
    //   //统计加入购物车的数量
    //   this.count = this.count + this.stepper;
    //   //加入本地存储
    //   var item = {
    //     id: this.id,
    //     number: this.stepper,
    //     flag: false,
    //   };
    //   // 加入到购物车之前判断是否有相同商品
    //   var index = this.carInfo.findIndex((obj) => obj.id == this.id);
    //   if (index !== -1) {
    //     // 找到，数量累加
    //     this.carInfo[index].number += this.stepper;
    //   } else {
    //     // 没有找到相同商品
    //     this.carInfo.push(item);
    //   }
    //   localStorage.setItem("carData", JSON.stringify(this.carInfo));
    // },
    async getGoodInfo() {
      //获取商品的详细信息
      var { message } = await getGoodsInfo(this.id);
      this.goodInfo = message;
    },
    async getthumbimages() {
      //获取商品的轮播图
      var { message } = await getThumBimages(this.id);
      this.lunboImg = message;
    },
  },
  created() {
    //初始化
    this.carInfo = JSON.parse(localStorage.getItem("carData") || "[]");
    //给count赋值
    if (this.carInfo.length > 0) {
      var index = this.carInfo.findIndex((obj) => obj.id == this.id);
      if (index !== -1) {
        this.count = parseInt(this.carInfo[index].number);
      }
    }

    this.$parent.title = "商品详情";
    this.$parent.hideFooter();
    this.getGoodInfo();
    this.getthumbimages();
  },
  components: {
    "van-field": Field,
    "van-stepper": Stepper,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-goods-action": GoodsAction,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action-button": GoodsActionButton,
  },
};
</script>

<style lang="scss" scoped>
.shopdetail_container {
  background-color: #f4f4f4;
  padding: 0 5px;
  .item {
    .Img {
      margin: 10px 0;
      background-color: #f4f4f4;
      img {
        width: 100%;
        height: 240px;
      }
    }
    .text {
      background-color: #fff;
      font-size: 16px;
      padding: 10px 4px 0px;
      .title {
        color: #333;
        margin: 0;
      }
      .price {
        margin-top: 30px;
        color: #333;
        .left {
          margin-right: 30px;
        }
        .right {
          color: red;
        }
      }
      .van-field {
        padding: 10px 0;
        font-size: 16px;
      }
    }
    .info {
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      padding: 5px 5px;
      color: #333;
      .title {
        text-align: center;
        font-size: 14px;
        color: #ccc;
        margin: 15px 0;
      }
    }
    .introduce {
    //   overflow: hidden;
      background-color: #fff;
      .title {
        margin: 16px 0px;
        text-align: center;
        color: #969799;
        font-size: 14px;
      }
      /deep/ .content {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
