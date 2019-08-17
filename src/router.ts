import Vue from 'vue';
import Router from 'vue-router';

import IroHome from '@/components/IroHome.vue';

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
    ],
});
