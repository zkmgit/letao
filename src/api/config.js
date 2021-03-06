import axios from 'axios';
import {Toast} from "vant";
import router from "@/router/router.js"
import store from "@/store/carStore.js";
import { sleep } from '@/util/tool.js';


const instance = axios.create({
    baseURL: 'http://api.w0824.com/api',
    timeout: 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
    // 在发送请求之前做些什么
    var token = localStorage.getItem('token') || '';
    token && (config.headers['token'] = token);

    // config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据

    !store.state.isPending && store.commit('changeIsPending',true);
    // console.log(store.state.isPending);
    await sleep(800);

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    store.commit('changeIsPending',false);
    console.log(store.state.isPending);

    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    // console.log(error.response);
    store.commit('changeIsPending',false);
    var status = error.response.status;
    var message = error.response.data.message;

    switch(status) {
        case 401:
            Toast('用户信息过期，请重新登录');
            router.push('/login');
        break;
    default:
        Toast('网络错误，请稍后再试');

    }

    return Promise.reject(error);
  });

//导出变量
export default instance;
