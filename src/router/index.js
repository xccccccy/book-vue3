import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/components/home.vue')
        },
        {
            path: '/hello',
            name: 'hello',
            component: () =>
                import ('@/components/HelloWorld.vue')
        },
        {
            path: '/book',
            name: 'book',
            component: () =>
                import ('@/components/book/book.vue')
        },
        {
            path: '/book/:book_id(\\d+)',
            name: 'bookinfo',
            component: () =>
                import ('@/components/book/bookinfo.vue')
        },
        {
            path: '/book/:book_id(\\d+)/:content_id(\\d+)',
            name: 'bookcontent',
            component: () =>
                import ('@/components/book/bookcontent.vue')
        },
        {
            path: '/music',
            name: 'Muscic',
            component: () =>
                import ('@/components/music.vue')
        },
        {
            path: '/like',
            name: 'Like',
            component: () =>
                import ('@/components/like.vue')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () =>
                import ('@/components/manage/admin.vue')
        },
        {
            path: '/spy',
            name: 'Spy',
            component: () =>
                import ('@/components/game/spy.vue')
        },
        {
            path: '/scm',
            name: 'Scm',
            component: () =>
                import ('@/components/scm/scm.vue')
        },
        {
            path: '/scmlogin',
            name: 'ScmLogin',
            component: () =>
                import ('@/components/scm/scmlogin.vue')
        },
        {
            path: '/404',
            name: 'notFound',
            component: () =>
                import ('@/components/notfound.vue')
        }, {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        }
    ],
    history: createWebHistory()
})