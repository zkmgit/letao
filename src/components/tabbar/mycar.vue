<template>
  <div class="mycar_container">
      <van-submit-bar :price="300" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { SubmitBar } from 'vant';
export default {
    components:{
        "van-submit-bar":SubmitBar
    },
    methods:{
        onSubmit(){

        }
    },
  created() {
    this.$parent.ShowNavBar({ title: "我的购物车" });
  },
};
</script>

<style lang="scss" scoped>
    .mycar_container {
        .van-submit-bar {
            margin-bottom: 50px;
        }
    }
</style>
