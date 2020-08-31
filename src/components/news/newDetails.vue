<template>
  <div class="newdetails">
    <!-- {{ $route.params.id }} -->
    <h3 class="title">{{ newDetails.title }}</h3>
    <div class="text">
      <span class="add_time">发布时间:{{ newDetails.add_time | dateFormat("YYYY:MM:DD hh:mm:ss") }}</span>
      <span class="click">阅读 {{ newDetails.click }}次</span>
    </div>
    <hr />
    <div class="content" v-html="newDetails.content"></div>
    <div class="comment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="有爱评论，说点好听的~"
        show-word-limit
      />
      <van-button type="info" block @click="addDetali">评论</van-button>
    </div>
    <div class="list-item">
        <div class="tempItem" v-for="item in tempNewDets" :key="item.id">
            <div>{{ item.user_name }}：{{ item.content }}</div>
            <div>评论时间：{{ item.add_time | dateFormat("YYYY-MM-DD hh:mm:ss") }}</div>
        </div>
        <div class="item" v-for="item in details" :key="item.id">
            <div>{{ item.user_name }}：{{ item.content }}</div>
            <div>评论时间：{{ item.add_time | dateFormat("YYYY-MM-DD hh:mm:ss") }}</div>
        </div>
        <van-button color="#FF2121" plain block @click="getDetails">获取更多</van-button>
    </div>
  </div>
</template>

<script>
import { getNew,getComments,postComment } from "@/api/index.js";
import { Button,Field,Toast   } from "vant";
export default {
  data() {
    return {
      //新闻详情
      newDetails: "",
      message:'',
      //评论页数
      page:1,
      details:[],
      //用于存放新评论
      tempNewDets:[]

    };
  },
  methods: {
    async getnew() {
      //获取新闻详情
      var { message } = await getNew(this.$route.params.id);
      this.newDetails = message[0];
    },
    async addDetali(){
        //获取评论的内容
        var content = {
            content:this.message
        }

        //新增评论
        var res = await postComment(this.$route.params.id,content);

        if(res.status == 0){
            Toast(res.message);

            //新增成功时，把新数据存放在新数组，展示在第一行
            var newDet = {
                'id': this.tempNewDets.length + 1,
                'user_name': '匿名用户',
                'add_time': new Date(),
                'content': this.message
            }
            this.tempNewDets.unshift(newDet);
            this.message = '';
        }

    },
    getDetails(){
        //获取评论
        this.page ++;
        this.getcomments();
    },
    async getcomments(){
        //获取对应新闻的评论，默认从首页开始
        var { message } = await getComments(this.$route.params.id,this.page);
        //当没有评论的时候进行提示
        if(message.length == 0){
            Toast('亲,没有更多的评论...');
            return;
        }

        this.details = this.details.concat(message);
    }
  },
  created() {
      //进行初始化
    this.$parent.ShowNavBar({ title: "新闻详情" });
    this.getnew();
    this.getcomments();
  },
  components: {
    "van-button": Button,
    "van-field":Field
  },
};
</script>

<style lang="scss" scope>
.newdetails {
  padding: 0 10px;
  background-color: #faf9f9;
  .title {
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
  }
  .text {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #888;
  }
  .comment {
      img {
          width: 100%;
      }
    #text {
      width: auto;
      border: 0;
      padding: 10px 15px;
    }
  }
  .list-item {
      font-size: 12px;
      .item,.tempItem {
          background-color: #E8E8E8;
          margin: 10px 0;
      }
  }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>
