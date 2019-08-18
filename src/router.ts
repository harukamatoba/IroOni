import Vue from 'vue';
import Router from 'vue-router';

import IroHome from '@/components/IroHome.vue';
import Lunking from '@/components/Lunking.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
        },
        {
            path: '/irocheck',
            name: 'IroHome',
            component: IroHome,
        },
        {
            path: '/lunking',
            name: 'Lunking',
            component: Lunking,
        },
    ],
});
