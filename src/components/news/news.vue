<template>
  <div class="new-containt">
    <div class="menu">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="item"  v-for="item in newslist"  :key="item.id" @click="getNewById(item.id)">
          <div class="left">
            <img v-lazy="item.img_url" />
          </div>
          <div class="right">
            <h4>{{ item.title }}</h4>
            <div class="text">
              <span>发布时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </div>
          </div>
        </div>
      </van-pull-refresh>
      <van-button
        :loading="isMore"
        type="info"
        @click="loadMore"
        block
        loading-text="loading...."
      >点击更多</van-button>
    </div>
  </div>
</template>

<script>
import { getNewsList } from "@/api/index.js";
import { PullRefresh, Toast, Button } from "vant";
export default {
  data() {
    return {
      newslist: [],
      //下拉刷新的状态
      isLoading: false,
      //用于计算当前页数
      page: 1,
      //每页的条数
      pagesize: 10,
      //当数据还没有加载成功，底部的按钮转圈圈
      isMore: false,
    };
  },
  methods: {
    async getnewslist() {
      //底部按钮显示为原始状态
      this.isMore = false;
      var { message } = await getNewsList(this.page, this.pagesize);
      //当没有获取到数据时，提示无数据
      if (message.length == 0) {
        Toast("亲，到底了哦！");
        return;
      }
      this.newslist = this.newslist.concat(message);
    },
    getNewInfoById(id){

    },
    onRefresh() {
      //下拉刷新获取首页的数据
      setTimeout(() => {
        //当页面向上拉时，重新获取第一页的新闻
        this.page = 1;
        this.newslist = [];

        this.isLoading = false;
        this.getnewslist();
        Toast("刷新成功");
      }, 1000);
    },
    loadMore() {
      //当点击了更多数据，当前页数加1,  按钮提示为加载中...
      this.page++;
      this.isMore = true;
      this.getnewslist();
    },
    getNewById(id){
        this.$router.push(`/newdetails/${id}`);
    }
  },
  created() {
    this.$parent.ShowNavBar({ title: "新闻列表" });
    this.getnewslist();
  },
  components: {
    "van-pull-refresh": PullRefresh,
    "van-button": Button,
  },
};
</script>

<style lang="scss" scoped>
.new-containt {
  .menu {
    .item {
      display: flex;
      height: 100px;
      border-bottom: 1px solid #ccc;
      .left {
        display: flex;
        width: 100px;
        height: 100px;
        img {
          flex: 1;
          width: 100%;
        }
      }
      .right {
        flex: 1;
        height: 100px;
        padding: 0 3px;
        background-color: #eee;
        h4 {
          font-size: 13px;

          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .text {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}
</style>
