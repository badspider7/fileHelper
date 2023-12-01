import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import Home from '@/pages/home.vue'
import Setting from '@/pages/setting/index.vue'
import Done from '@/pages/done/index.vue'
import IndexLayout from "@/pages/indexLayout.vue"

const routes = [
    {
        path: '/',
        component: IndexLayout,
        children: [
            {
                path: '',
                name: 'index',
                component: Home,
                meta: { title: '主页' }
            },
            {
                path: 'setting',
                name: 'setting',
                component: Setting,
                meta: { title: '设置' }
            },
            {
                path: 'done',
                name: 'done',
                component: Done,
                meta: { title: "完成任务" }

            }
        ]
    }
] as RouteRecordRaw[];

// export const flatRoutes = flatMap(routes, (value, key, collection) => {
// 	return value?.children || value;
// });

const router = createRouter({
    //hash 模式
    history: createWebHashHistory(),
    routes
});

// router.afterEach((to) => {
// 	const navStore = useNavStore();
// 	navStore.updateActiveKey(to.name as string);
// });

export default router;