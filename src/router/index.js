import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由懒加载
const Msite = () => import('../pages/msite/Msite.vue')
const Search = () => import('../pages/search/Search.vue')
const Order = () => import('../pages/order/Order.vue')
const Profile = () => import('../pages/profile/Profile.vue')
const Login = () => import('../pages/Login/Login.vue')
const Logininfo = () => import('../pages/profile/Userinfo.vue')
const Shop = () => import('../pages/shop/Shop.vue')
const ShopGoods = () => import('../pages/shop/ShopGoods/ShopGoods.vue')
const ShopRatings = () => import('../pages/shop/ShopRatings/ShopRatings.vue')
const Account = () => import('../pages/account/Account.vue')
const OrderInfo = () => import('../pages/order/OrderInfo.vue')

const router = new VueRouter({
    routes: [
        //首页
        {
            path: '/msite',
            component: Msite,
            meta: {
                title: '首页',
                isshowfooter: true
            },
        },
        //搜索页
        {
            path: '/search',
            component: Search,
            meta: {
                title: "搜索",
                isshowfooter: true
            },
        },
        //订单页
        {
            path: '/order',
            component: Order,
            meta: {
                title: '我的订单',
                isshowfooter: true
            },
            children: [
                //订单详情页
                {
                    path: '/orderinfo/:orders_id',
                    component: OrderInfo,
                    meta: {
                        isshowfooter: true
                    }
                },
            ]
        },
        //个人页
        {
            path: '/profile',
            component: Profile,
            meta: {
                title: '个人中心',
                isshowfooter: true,
            },
        },
        //个人信息页面
        {
            path: '/logininfo/:name',
            component: Logininfo,
            meta: {
                title: '个人信息',
                isshowfooter: true,
            },
        },
        //登录页
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                isshowfooter: false,
            },
        },
        //商家具体页
        {
            path: '/shop',
            component: Shop,
            meta: {
                title: '商家食品',
                isshowfooter: true,
            },
            children: [
                //商家食品
                {
                    path: '/shop/goods/:id',
                    component: ShopGoods,
                    meta: {
                        title: '商家食品',
                        isshowfooter: false,
                    },
                },
                //商家评价
                {
                    path: '/shop/ratings/:id',
                    component: ShopRatings,
                    meta: {
                        title: '商家评价',
                        isshowfooter: false,
                    },
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]
        },
        //结算页面
        {
            path: '/account/:username',
            component: Account,
            meta: {
                isshowfooter: false,
            }
        },
        //默认跳转页
        {
            path: '/',
            redirect: '/msite'
        }
    ]
})
//设置全局后置路由守卫显示不同页面
// router.afterEach((to,from)=>{
//     if(to.meta){
//         document.title = to.meta.title
//     }else{
//         document.title = to.children.meta.title
//     }
// })

export default router