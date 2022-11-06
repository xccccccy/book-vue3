import { createRouter, createWebHistory } from 'vue-router'

const router =  createRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: () =>
            import('@/components/home.vue')
    },
    {
        path: '/hello',
        name: 'hello',
        component: () =>
            import('@/components/HelloWorld.vue')
    },
    {
        path: '/book',
        name: 'book',
        component: () =>
            import('@/components/book/book.vue')
    },
    {
        path: '/book/:book_id(\\d+)',
        name: 'bookinfo',
        component: () =>
            import('@/components/book/bookinfo.vue')
    },
    {
        path: '/book/:book_id(\\d+)/:content_id(\\d+)',
        name: 'bookcontent',
        component: () =>
            import('@/components/book/bookcontent.vue')
    },
    {
        path: '/music',
        name: 'Muscic',
        component: () =>
            import('@/components/music.vue')
    },
    {
        path: '/video',
        name: 'Video',
        component: () =>
            import('@/components/video/watch.vue')
    },
    {
        path: '/like',
        name: 'Like',
        component: () =>
            import('@/components/like.vue')
    },
    {
        path: '/spy',
        name: 'Spy',
        component: () =>
            import('@/components/game/spy.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () =>
            import('@/components/admin/admin.vue'),
        children: [
            {
                path: 'globalsetting',
                component: () => import('@/components/admin/globalsetting.vue'),
            },
            {
                path: 'appversionmanage',
                component: () => import('@/components/admin/scm/appversionmanage.vue'),
            },
            {
                path: 'subrepossetting',
                component: () => import('@/components/admin/scm/subrepossetting.vue'),
            },
            {
                path: 'cms',
                component: () => import('@/components/admin/cms.vue'),
            }
        ]
    },
    {
        path: '/scmlogin',
        name: 'ScmLogin',
        component: () =>
            import('@/components/admin/scm/scmlogin.vue')
    },
    {
        path: '/template',
        name: 'Template',
        component: () => import('@/components/template/template.vue'),
        children: [
            {
                path: 'BorderAnimation',
                component: () => import('@/components/template/BorderAnimation.vue'),
            },
            {
                path: 'GradientBGAnimation',
                component: () => import('@/components/template/GradientBGAnimation.vue'),
            },
            {
                path: 'PhotoFrame',
                component: () => import('@/components/template/PhotoFrame.vue'),
            },
            {
                path: 'Parallax',
                component: () => import('@/components/template/Parallax.vue'),
            },
        ]
    },
    {
        path: '/404',
        name: 'notFound',
        component: () =>
            import('@/components/foundation/notfound.vue')
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
    ],
    history: createWebHistory()
})

export default router