<template>
  <div class="app-container">
      <van-sticky>
    <van-nav-bar
      id="nabber"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    </van-sticky>
    <van-sticky>
      <div class="header" id="header">
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
//按需引入vant组件
import { Search, Tabbar, TabbarItem, Sticky, NavBar } from "vant";

export default {
  data() {
    return {
      active: 0,
      //导航头的标题
      title: "",
      isShowFooter:true
    };
  },
  methods: {
      //显示和隐藏底部
    ShowFooter(){
        this.isShowFooter = true;
    },
    hideFooter(){
        this.isShowFooter = false;
    },

  },
  created() {
    this.ShowFooter();
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
  background-color: #F1F1F1;
  height: 100vh;

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
