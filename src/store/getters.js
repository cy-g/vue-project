//数据复用，类似于计算属性
export default{
    //计算购物车食品总数量
    getCartNum(state){
        //返回总数量  reduce(累计器) preTotal(起始总数量) food(所购的食品) 0(初始化数量)
        return state.cartfoods.reduce((preTotal,food)=>preTotal + food.count,0)
    },
    //计算总价格
    getCartPrice(state){
        //返回总价格  reduce(累计器) preTotal(起始总价格) food(所购的食品价格) 0(初始化价格)
        return state.cartfoods.reduce((preTotal,food)=>preTotal +food.price*food.count,0)
    },
}