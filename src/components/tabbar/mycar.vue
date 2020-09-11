<template>
  <div class="mycar_container">
    <div class="content" v-if="hasGoods">
      <van-divider>收获地址</van-divider>

      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @edit="onEdit"
      />

      <van-divider>购买的商品</van-divider>

      <div class="car">
        <div class="item" v-for="(item,index) in carData" :key="item.id">
          <div class="switch">
            <van-switch
              @change="changGoodSelected(item.id,$store.getters.getGoodsSelected[item.id])"
              v-model="$store.getters.getGoodsSelected[item.id]"
            />
          </div>
          <div class="Img">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <span class="left">￥{{ item.sell_price }}</span>
              <van-stepper
                @change="changGoodNumber(item.id,$store.getters.getGoodsNumber[item.id])"
                v-model="$store.getters.getGoodsNumber[item.id]"
              />
              <van-button @click="delGood(item.id,index)" type="danger">删除</van-button>
            </div>
          </div>
        </div>
      </div>

      <van-cell icon="cash-back-record" title="微信支付" />

      <van-submit-bar :price="$store.getters.getTotalPrice" button-text="提交订单" @submit="onSubmit">
        <template #default>共{{ $store.getters.getCountGoods }}件商品</template>
      </van-submit-bar>
    </div>
    <div class="empty" v-else>
      <div class="title">
        亲，你的购物车为空，去
        <router-link to="/home">首页</router-link>逛逛吧！
      </div>
      <div class="Img">
        <img src="../../assets/images/car.png" alt />
      </div>
      <div class="login">
        <router-link to="/login">登录</router-link>后可以同步电脑与手机购物车中的商品
      </div>
    </div>
  </div>
</template>

<script>
import { getCarData, commitOrder } from "@/api/index.js";
import { userInfo, genOrderId } from "@/util/tool.js";
import {
  Divider,
  AddressList,
  Toast,
  Switch,
  Stepper,
  Button,
  SubmitBar,
  Cell,
} from "vant";
export default {
  data() {
    return {
      chosenAddressId: "1",
      carData: [],
      list: [
        {
          id: "1",
          name: "ztt",
          tel: "13434792579",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
      ],
    };
  },
  computed: {
    hasGoods() {
      return this.carData.length > 0;
    },
    number() {
      return this.$store.getters.getCountGoods;
    },
    price() {
      return this.$store.getters.getTotalPrice;
    },
    ids() {
      return this.$store.getters.getGoodsIds;
    },
  },
  methods: {
    //编辑收货地址
    onEdit() {
      console.log("编辑地址");
      this.$router.push("/addr");
    },
    delGood(id, index) {
      //删除当前的元素
      this.carData.splice(index, 1);
      this.$store.commit("delGood", id);
    },
    changGoodNumber(good_id, number) {
      this.$store.commit("changGoodNumber", { good_id, number });
    },
    changGoodSelected(good_id, flag) {
      this.$store.commit("changGoodSelected", { good_id, flag });
    },
    async onSubmit() {
      var user = userInfo();
      if (!user) {
        this.$router.push("/login");
      }
      // 拼接生成订单的参数
      var orderData = {
        user_id: user.id,
        order_id: genOrderId(),
        address_id: this.list[0].id,
        total_price: this.price,
        number: this.number,
        goods_ids: this.ids,
      };

      // 提交订单 返回一个url
      var res = await commitOrder(orderData);
      let weixinurl = res.data;
      // 跳转
      location.href = weixinurl;
      // 删除购物车，清空本地的购物车
      localStorage.removeItem("carData");
    },
    async getCarList() {
      //获取所有的商品信息
      let ids = this.$store.getters.getIds;
      if (ids) {
        var { message } = await getCarData(ids);
        this.carData = message;
      }
    },
  },
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-submit-bar": SubmitBar,
    "van-cell": Cell,
  },
  created() {
    this.$parent.title = "我的购物车";
    this.$parent.ShowFooter();
    this.getCarList();
  },
};
</script>

<style lang="scss" scoped>
.mycar_container {
  .van-submit-bar {
    margin-bottom: 50px;
  }
  .van-address-list__bottom {
    visibility: hidden;
  }
  .van-divider {
    text-align: center;
    color: #6f7370;
    font-size: 16px;
    border-color: #545e6c;
    margin: 2px;
  }
  .van-address-list {
    padding-bottom: 20px;
  }

  .car {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px;
      border-radius: 5px;
      padding: 10px;
      background-color: #fff;
      .switch {
        margin-right: 5px;
      }

      .Img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        margin: 0 4px;
        img {
          width: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          margin: 0;
          font-size: 16px;
          color: #000;
          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            color: #ff0000;
          }
        }
      }
    }
  }

  .van-cell {
    width: auto;
    margin: 20px 10px 0px;
    border-radius: 5px;
  }
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
