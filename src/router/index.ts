import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import Home from '@/pages/home.vue'
import Setting from '@/pages/setting/index.vue'
import Done from '@/pages/task/done/index.vue'
import Todo from '@/pages/task/todo/index.vue'
import IndexLayout from "@/pages/indexLayout.vue"
import Document from '@/pages/document/index.vue'
import Message from '@/pages/message/index.vue'
import Calendar from '@/pages/calendar.vue'

const routes = [
    {
        path: '/',
        component: IndexLayout,
        children: [
            {
                path: '',
                name: 'index',
                component: Home,
                meta: { title: '仪表盘' }
            },
            {
                path: 'setting',
                name: 'setting',
                component: Setting,
                meta: { title: '设置' }
            },
            {
                path: 'folders',
                name: 'folders',
                component: Document,
                meta: { title: '文件' }
            },
            {
                path: 'done',
                name: 'done',
                component: Done,
                meta: { title: '已办' }
            },
            {
                path: 'todo',
                name: 'todo',
                component: Todo,
                meta: { title: '未办' }
            },
            {
                path: 'message',
                name: 'message',
                component: Message,
                meta: { title: '消息' }
            },
            {
                path: 'calendar',
                name: 'calendar',
                component: Calendar,
                meta: { title: '日历' }
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