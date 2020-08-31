<template>
  <div class="home-containt">
    <van-swipe van-swipeclass="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunbo" :key="item.img">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="4">
      <van-grid-item to="/showlist">
        <img src="../../assets/images/menu10.png" alt />
        <div>数码电器</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu12.png" alt />
        <div>9.9拼单</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu13.png" alt />
        <div>超市</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu15.png" alt />
        <div>乐淘服饰</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu16.png" alt />
        <div>物流查询</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu17.png" alt />
        <div>全部</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu18.png" alt />
        <div>美图欣赏</div>
      </van-grid-item>
      <van-grid-item to="/newslist" >
        <img src="../../assets/images/menu19.png" alt />
        <div>乐淘头条</div>
      </van-grid-item>
    </van-grid>
    <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">为你推荐</van-divider>
    <div class="goodList">
      <router-link :to="'/shopdetail/' + item.id" class="item" v-for="item in recommend" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="price">
            ¥ {{ item.sell_price }}
            <span class="buy">{{ item.buy }}人已购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider } from "vant";
import { getLunBoImg, getRecommend } from "@/api/index.js";
export default {
  data() {
    return {
      lunbo: [],
      recommend: [],
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-divider": Divider,
  },

  methods: {
    async getLunBo() {
      var result = await getLunBoImg();
      this.lunbo = result.message;
    },
    async getrecommend() {
      var result = await getRecommend();
      this.recommend = result.message;
    },
  },
  created() {
    this.$parent.ShowHeader();
    this.getLunBo();
    this.getrecommend();
  },
};
</script>

<style lang="scss" scoped>
.home-containt {
  background-color: #eee;
  .van-swipe {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-grid {
    .van-grid-item {
      img {
        width: 50%;
      }
      div {
        color: #524949;
      }
    }
  }
  .goodList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 47%;
      margin: 5px 0;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      img {
        flex: 1;
        width: 100%;
      }
      .text {
        padding: 4px;
        .title {
          font-size: 12px;
          color: #333;
        }
        .price {
          margin-top: 6px;
          font-size: 14px;
          color: #ff5500;
          .buy {
            margin-left: 10px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
