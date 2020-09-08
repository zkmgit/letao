import axios from 'axios';
import {Toast} from "vant";
import router from "@/router/router.js"


const instance = axios.create({
    baseURL: 'http://api.w0824.com/api',
    timeout: 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token = localStorage.getItem('token') || '';
    token && (config.headers['token'] = token);

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    // console.log(error.response);
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
