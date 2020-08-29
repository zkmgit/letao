# vueleotao项目笔记

- vuecli配置说明
配置：https://cli.vuejs.org/zh/config/

# 创建App组件

- 头部
- 中间 （中间内容不能写死，需要用`router-view`来存放路由匹配的组件内容）
- 底部


# 给Vue原型添加变量
```js
// 把变量可以直接设置Vue的原型上面，后续可以直接在组件中通过this.变量名获取即可
// 自定义的变量名要$符号，为了防止与data中的属性冲突。
import axios from 'axios';
Vue.prototype.$aaa = 11111;
Vue.prototype.$api = axios;

// 组件内部访问 
this.$aaa
this.$api
```



# Vue中原生js操作真实DOM

## 什么时候才可以操作真实DOM?

需要等到组件挂载到真实DOM节点后才可以操作。



## 常用的两种方式



- 在`mounted`生命周期中操作

- 或通过`this.$nextTick（fn）`来操作，此函数是异步的，会等到挂载到真实DOM之后才会执行fn回调

  ```js
  methods:{
      doDom(){
          this.$nextTick(() => {
              
            	// 挂载到真实DOM后，进行dom操作
            	var headerEl = document.getElementById("header");
            	var headerHeight = headerEl.offsetHeight;
        	
   		});
      }
  },
  created(){
      this.doDom();
  },
  mounted(){
      this.doDom();
  }
  
  ```



# 首页商品列表图片懒加载

- 基本原理：当图片到达可视区域后才把图片路径赋值给`src`属性，这时才会发送http请求获取图片资源

## Lazyload 懒加载

`Lazyload` 是 `Vue` 指令，使用前需要对指令进行注册

```js
// main.js

import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
```

基础用法

将`v-lazy`指令的值设置为你需要懒加载的图片

参考：<https://vant-contrib.gitee.io/vant/#/zh-CN/lazyload> 

```js

<img v-for="img in imageList"  v-lazy="img" />
export default {
  data() {
    return {
      imageList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
    };
  },
};
```





# router和route的区别

- router: 用来实现页面的跳转，前进或后退 
    - 跳转：`this.$router.push({'/login'})` 
    - 后退：`this.$router.go(-1)`
- route: 用来获取当前路由的相关信息，如何获取查询参数，或路由参数this.$route.params.username ,如果是在template模板中使用则可以省略this,直接 `$route.params.username`



## 声明式跳转和编程式跳转

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式                    |
| ------------------------- | ------------------------- |
| `<router-link :to="...">` | ` router.push('/login') ` |

详情：<https://router.vuejs.org/zh/guide/essentials/navigation.html> 





# 路由组件传参-props解耦

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。



使用 `props` 将组件和路由解耦：**取代与 $route 的耦合** 

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }
  ]
})
```



# 项目推送github中

1. 去github中创建仓库

2. 把本地根目录初始化为仓库

   ```
   git init 
   ```

3. 关联为远程仓库地址，push推送代码





# ssh实现自动部署

安装`node-ssh`

```
npm i node-ssh@8.0.0
```



项目根目录创建`deploy.js`

```js
var node_ssh, ssh, site_dir, static_dir, filename, path
node_ssh = require('node-ssh')
path = require('path')
ssh = new node_ssh()
site_dir = '/www/wwwroot/vue.w0824.com/'  // 改为自己站点部署目录
static_dir = './dist/'					// 指定上传静态目录中的文件
ssh.connect({
  host: 'ip地址',
  username: '用户名',
  privateKey: '私有路径'
}).then(function () {
  // ssh连接成功，上传本地目录static_dir中的文件到远程服务器
  uploadDist()
})

// 上传静态资源
function uploadDist () {
  console.log('静态资源上传中....')
  // 上传目录中的文件，到远程目录
  ssh.putDirectory(static_dir, site_dir, {
    recursive: true,	// 递归上传
    concurrency: 10,	// 并发数
    validate: function (itemPath) {
      console.log(itemPath)  // 打印上传的文件，方便查看
      const baseName = path.basename(itemPath)
      // 排除不上传的文件
      return baseName.substr(0, 1) !== '.' && // do not allow dot files
            baseName !== 'node_modules' // do not allow node_modules
    }
    // ^ WARNING: Not all servers support high concurrency
    // try a bunch of values and see what works on your server
  }).then(function () {
    console.log('上传成功')
    process.exit()	// 退出进程
  }, function (error) {
    console.error('错误信息：' + error.message)
  })
}

```

- package.json中scripts选项中配置自定义指令deploy

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "deploy": "npm run build && node ./deploy.js"
  },
```

- 实现自动部署

```
  npm run deploy
```

  

> 啾的一下，就部署成功了。

# 文本显示两行显示省略号
```css
// 限制两行文本，超出显示省略号 
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
```


