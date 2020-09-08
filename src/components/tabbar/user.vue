<template>
  <div class="user-container">
    <div class="top">
      <div class="img">
        <img src="../../assets/images/logo.png" alt />
      </div>
      <div class="title">
        <span class="text">用户名：{{ username }}</span>
      </div>
    </div>
    <div class="menu">
      <van-cell title="修改密码" is-link to="index" />
      <van-cell title="我的订单" is-link to="index" />
      <van-cell title="地址管理" to="/addrmanager" is-link />
    </div>
    <div class="back">
      <van-cell title="提交反馈" is-link to="index" />
      <van-cell title="关于乐淘" value="v1.0.0" />
      <van-cell value-class="blue" value="weixin h5 pay" />
    </div>
    <van-button type="default" block @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { isLogin } from "@/api/index.js";
import { Cell, Button, Dialog, Toast } from "vant";
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.$parent.title = "个人中心";
    isLogin();
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.username = userInfo.username;
    this.$parent.hideFooter();
  },
  methods: {
    //   退出登录
    logout() {
      Dialog.confirm({
        message: "退出登录",
      })
        .then(() => {
          // on confirm
          // console.log("确认");
          Toast("确认");

        })
        .catch(() => {
          Toast("取消");
        });
    },
  },
  components: {
    "van-cell": Cell,
    "van-button": Button,
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  // height: 100vh;
  .top {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    .img {
      width: 76px;
      height: 76px;
      margin-right: 100px;
      img {
        width: 100%;
      }
    }
    .title {
      color: #5d5555;
      .text {
        font-size: 18px;
      }
    }
  }
  .menu {
    margin-bottom: 15px;
  }
  .back {
    .blue {
      color: blue;
    }
  }
  .van-button {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
