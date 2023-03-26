import {getShopLists,getUserCookie,clearCookie} from '../api/index'

//导入映射的动作
import {SHOPLISTS,GOLOGIN,GETCOOKIE, CLEARCOOKIES,UPDATACOUNTADD,UPDATACOUNTMINUS,CLEARCARTS} from './mutations-types'
export default {
    async shoplists(context){
        // 调用后端获取数据方法
        let shoplistinfo = await getShopLists()
        // console.log(shoplistinfo)
        context.commit(SHOPLISTS,{shoplistinfo})
    },

    //获取登录成功后提交的数据和动作
    gologin(context,name){
        // console.log(name)
        context.commit(GOLOGIN,{name})
    },

    //响应登录后的cookie值
    async getcookie(context){
        //调用获取cookie值的方法
        let cookienameed =await getUserCookie()
        // console.log(cookiename)
        let cookiename =  cookienameed.msg

        context.commit(GETCOOKIE,{cookiename})
    },

    //退出登录，清除cookie信息
    async clearcookies(context){
        //调用清除cookie值方法
        let res =await clearCookie()
        // console.log(res)
        //清空成功
        if(res.msg === 0){
            context.commit(CLEARCOOKIES)
        }
    },

    //食品添加，减少购物车操作更新count
    updataCount(context,{isadd,food}){
        // 加
        if(isadd){
            context.commit(UPDATACOUNTADD,{food})
        }else{
        // 减 
            context.commit(UPDATACOUNTMINUS,{food})
        }
    },
    //清空购物车
    clearcarts(context){
        context.commit(CLEARCARTS)
    }
}