<template>
  <div class="app-container">
    <div class="header">
      <img src="./assets/images/logo.png" alt />
      <van-search placeholder="请输入搜索关键词" />
    </div>
    <router-view></router-view>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/mycar" icon="cart-o">我的购物车</van-tabbar-item>
        <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem } from "vant";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    "van-search": Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
  },
};
</script>

<style lang="scss" scoped>

.app-container {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding: 3px;
    img {
      width: 44px;
      height: 44px;
    }
    div {
      flex: 1;
    }
  }
}
</style>