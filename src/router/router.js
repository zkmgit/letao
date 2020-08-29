import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import home from '@/components/tabbar/home.vue';
import mycar from '@/components/tabbar/mycar.vue';
import user from '@/components/tabbar/user.vue';
import news from '@/components/news/news.vue';

const router = new Router({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/mycar",component:mycar},
        {path:"/user",component:user},
        {path:"/newslist",component:news},
    ]
})

export default router;
