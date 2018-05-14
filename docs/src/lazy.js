import Global from './modules/global'

function createErrorPage(page, error) {
    return {
        template: '<div class="alert alert-warning alert-light lazy-error">页面{{page}}加载失败！<pre>{{error.message}}<br>{{error.stack}}</pre></div>',
        data() {
            return {
                page: page,
                error: error
            }
        }
    };
}

Global.LazyPagePromise = Global.LazyPagePromise || {}

export default function lazy(page) {
    return () => {
        if (!Global.LazyPagePromise[page] || Global.LazyPagePromise[page].status === 'reject') {
            Global.LazyPagePromise[page] = {
                promise: new Promise((resolve, reject) => {
                    Global.emit('lazyPage.start', {
                        name: page
                    })
                    //会打包为一个单独的文件，名称格式：page-view-Index
                    import(/* webpackChunkName: "[request]" */`${page}`).then(component => {
                        Global.LazyPagePromise[page].status = 'resolve';
                        Global.emit('lazyPage.end.then', {
                            name: page,
                            component: component
                        })
                        return resolve(component)
                    }).catch(error => {
                        Global.LazyPagePromise[page].status = 'reject';
                        Global.emit('lazyPage.end.catch', {
                            name: page,
                            error: error
                        })
                        return resolve(createErrorPage(page, error))
                    })
                }),
                status: 'pending'
            }
        }
        return Global.LazyPagePromise[page].promise;
    }
}
