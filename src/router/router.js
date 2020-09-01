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
    ]
})

export default router;
