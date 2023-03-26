// 导入映射动作
import {SHOPLISTS,GOLOGIN,GETCOOKIE, CLEARCOOKIES,UPDATACOUNTADD,UPDATACOUNTMINUS,CLEARCARTS} from './mutations-types'

import Vue from 'vue'
export default {
    //商家列表展示
    [SHOPLISTS](state,{shoplistinfo}){
        state.shoplists = shoplistinfo
    },
    //登录成功后用户名显示
    [GOLOGIN](state,{name}){
        // console.log(name)
        state.logined = name
    },
    //登录成功后显示cookie值
    [GETCOOKIE](state,{cookiename}){
        state.logined = cookiename
    },
    //清楚cookie值
    [CLEARCOOKIES](state){
        state.logined = ''
    },
    //实现点餐界面的加操作
    [UPDATACOUNTADD](state,{food}){
        //  利用set方法设置一个响应式数据  Vue.set(响应式的对象，'增加的响应属性名',值)
            if(!food.count){
                Vue.set(food,'count',1)
                //把添加的食品数据加入到购物车当中
                state.cartfoods.push(food)
            }else{
                food.count++
            }
    },
    //实现点餐界面的减操作
    [UPDATACOUNTMINUS](state,{food}){
        if(food.count){
            food.count--
            if(food.count === 0){
                 //购物车食品数为零时移除
                state.cartfoods.splice(state.cartfoods.indexOf(food),1)
            }
        }
    },
    //清空购物车操作
    [CLEARCARTS](state){
        //清空加减组件中的数字
        state.cartfoods.forEach(food=> {
            food.count = 0
        });
        //清空购物车中的数据
        state.cartfoods = []
    }
}