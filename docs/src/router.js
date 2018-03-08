import Router from 'vue-router'
import Global from './modules/global'
import MainLayout from './components/MainLayout'
import ArtRoutes from './posts-route';
import lazy from './lazy';

var router = new Router({
    routes: [{
        name: 'layout',
        path: '/',
        component: MainLayout,
        children: [
            {
                name: 'index',
                path: '/',
                component: lazy('./views/Index.vue'),
                meta: {
                    title: '首页'
                }
            }
        ].concat(ArtRoutes)
    },
    {
        name: 'notfound',
        path: '*',
        component: lazy('./views/NotFound.vue'),
        meta: {
            title: '页面未找到',
            auth: false
        }
    }]
})
router.beforeEach((to, from, next) => {
    Global.emit('page.before', {
        to,
        from
    })
    if (router.app && router.app.$Progress) {
        router.app.$Progress.start()
    }
    to.meta.from = from
    //页面未找到时，像全局发送事件
    if (to.name === 'notfound') {
        Global.emit('page.notfound', {
            to: to,
            form: from
        })
    }
    //判断form为空，并且url是子页面，条件为真时，push history
    var nextPath;
    if (!from.name && from.matched.length == 0) {
        var arr = to.path.split('/')
        if (arr.length > 2) {
            while (arr.pop()) {
                let path = arr.join('/'),
                    fullPath = to.fullPath,
                    loc = router.matcher.match(path)
                if (loc.name != 'notfound') {
                    loc.meta.following = fullPath
                    nextPath = path
                    break
                }
            }
        }
    }
    if (nextPath) {
        next(nextPath)
    } else {
        next()
    }
})
router.afterEach(route => {
    if (router.app && router.app.$Progress) {
        router.app.$Progress.finish()
    }
    Global.emit('page.navigated', route)
    Global.view.setTitle(Global.view.getTitle(route.meta))
    if (route.meta.following) {
        var path = route.meta.following
        delete route.meta.following
        setTimeout(() => {
            router.push(path)
        })
    }
})

export default router
