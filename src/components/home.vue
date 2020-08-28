<template>
  <div class="home-containt">
    <van-swipe van-swipeclass="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunbo" :key="item.img">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="4">
      <van-grid-item>
        <img src="../assets/images/menu10.png" alt />
        <div>数码电器</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu12.png" alt />
        <div>9.9拼单</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu13.png" alt />
        <div>超市</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu15.png" alt />
        <div>乐淘服饰</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu16.png" alt />
        <div>物流查询</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu17.png" alt />
        <div>全部</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu18.png" alt />
        <div>美图欣赏</div>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu19.png" alt />
        <div>乐淘头条</div>
      </van-grid-item>
    </van-grid>
    <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">为你推荐</van-divider>
    <div class="goodList">
      <div class="item-containt">
        <div class="item">
          <img src="../assets/images/item1.png" alt />
          <div class="text">
            <div class="title">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</div>
            <div class="price">
              ¥ 1899
              <span class="buy">54534人已购买</span>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="../assets/images/item2.png" alt />
          <div class="text">
            <div class="title">联想（Lenovo） G510AM 15.6英寸笔记本电脑</div>
            <div class="price">
              ¥ 2999
              <span class="buy">200人已购买</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-containt">
        <div class="item">
          <img src="../assets/images/item3.png" alt />
          <div class="text">
            <div class="title">飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器</div>
            <div class="price">
              ¥ 399
              <span class="buy">12人已购买</span>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="../assets/images/item4.png" alt />
          <div class="text">
            <div class="title">加湿器卧室轻音 5L大容量 家用办公室宿舍 香薰空气加湿 JSQ-A50U1</div>
            <div class="price">
              ¥ 49
              <span class="buy">34人已购买</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-containt">
        <div class="item">
          <img src="../assets/images/item5.png" alt />
          <div class="text">
            <div class="title">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</div>
            <div class="price">
              ¥ 4880
              <span class="buy">345人已购买</span>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="../assets/images/item6.png" alt />
          <div class="text">
            <div class="title">苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</div>
            <div class="price">
              ¥ 5780
              <span class="buy">34人已购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider } from "vant";
import { getLunBoImg } from "@/api/index.js";
export default {
  data() {
    return {
      lunbo: [],
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
  },
  created() {
    console.log("zttdsb");
    this.getLunBo();
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
    height: 620px;
    .item-containt {
      display: flex;
      justify-content: space-between;
      padding: 0 7px;
      margin-bottom: 10px;
      .item {
        width: 172px;
        height: 197px;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        img {
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
}
</style>