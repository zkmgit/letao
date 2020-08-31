<template>
  <div class="app-container">
    <van-nav-bar
      v-show="isNabShow"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-sticky>
      <div class="header" v-show="isHeaderShow">
        <img src="@/assets/images/logo.png" alt />
        <van-search placeholder="请输入搜索关键词" />
      </div>
    </van-sticky>
    <router-view></router-view>
    <div class="footer" v-show="isShowFooter">
      <van-tabbar v-model="active" :route="true">
        <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/mycar" icon="cart-o">我的购物车</van-tabbar-item>
        <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem, Sticky, NavBar } from "vant";

export default {
  data() {
    return {
      active: 0,
      isHeaderShow: true,
      isNabShow: false,
      title: "",
      isShowFooter:true
    };
  },
  methods: {
    ShowNavBar(options) {
      this.title = options.title;
      this.isHeaderShow = false;
      this.isNabShow = true;
      if(options.flag){
          this.isShowFooter = false;
      }
    },
    ShowHeader() {
      this.isHeaderShow = true;
      this.isNabShow = false;
      this.isShowFooter = true;
    },
  },
  created() {
    this.ShowHeader();
    this.$nextTick(function () {
      //会挂载到DOM才执行
    });
  },
  components: {
    "van-nav-bar": NavBar,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-sticky": Sticky,
    "van-search": Search,
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 50px;
  .header {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding: 3px;
    background-color: #fff;
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
