import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// 缓存
import {
    local,
    utils
} from '@/utils/index'

import { routes } from './routes'

Vue.use(Router)


// 命名路由
const router = new Router({
  routes: routes,
  linkActiveClass: 'active'
})

// 路由变化之前
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    console.info('路由开始', to, from);

    // to.matched （router自身提供的方法） 数组，包含当前路由的所有嵌套路径片段的 路由记录
    // some 用于检测数组中的元素是否满足指定条件
    // next();  可以让路由继续走下去
    // if (to.matched.some(r => r.meta.auth)) {
    //     // Object.keys es6语法 返回对象可枚举属性组成的数组
    //     if (Object.keys(store.state.user).length) {
    //         next();
    //     } else {
    //         next({
    //             name: 'login'
    //         })
    //     }
    // } else {
    //     if (Object.keys(store.state.user).length) {
    //         next({
    //             name: 'recommend'
    //         })
    //     } else {
    //         next();
    //     }
    // }
    next();
})
// 路由变化之后
router.afterEach((to, from) => {
    console.info('路由完成', to);
    //百度统计
    setTimeout(()=>{
                var _hmt = _hmt || [];
                (function() {
                    //每次执行前，先移除上次插入的代码
                    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?xxxx";
                    hm.id = "baidu_tj"
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
        },0);
    // ...
})
// router.onError(err => {
//     console.info('12312', err);
// })

export default router
