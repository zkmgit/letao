import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import home from '@/components/home.vue';
import mycar from '@/components/mycar.vue';
import user from '@/components/user.vue';

const router = new Router({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/mycar",component:mycar},
        {path:"/user",component:user},
    ]
})

export default router;