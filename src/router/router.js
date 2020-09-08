import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import home from '@/components/tabbar/home.vue';
import mycar from '@/components/tabbar/mycar.vue';
import user from '@/components/tabbar/user.vue';
import news from '@/components/news/news.vue';
import shows from '@/components/shops/shop.vue';
import newDetails from '@/components/news/newDetails.vue';
import shopDetail from '@/components/shops/shopDetail.vue';
import photo from '@/components/photo/photo.vue';
import addr from '@/components/addr/addr.vue';
import login from '@/components/user/login.vue';
import register from '@/components/user/register.vue';

const router = new Router({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/mycar",component:mycar},
        {path:"/user",component:user},
        {path:"/newslist",component:news},
        {path:"/showlist",component:shows},
        {path:"/newdetails/:id",component:newDetails},
        {path:"/shopdetail/:id",component:shopDetail,props:true},
        {path:"/photo",component:photo},
        {path:"/addr",component:addr},
        {path:"/login",component:login},
        {path:"/register",component:register},
    ]
})
//全局前置导航
router.beforeEach((to, from, next) => {
    if(to.path == '/home'){
        Vue.nextTick(function(){
            document.getElementById('header').style.display = '';
            document.getElementById('nabber').style.display = 'none';
        })
    }else {
        Vue.nextTick(function(){
            document.getElementById('header').style.display = "none";
            document.getElementById('nabber').style.display = "";
        })
    }
    next();
});

export default router;
