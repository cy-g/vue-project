<template>
    <div class="collapse" id="collapseExample">
      <div class="well">
        <li
          class="food-item bottom-border-1px"
          v-for="(item, index) in orderinfo"
          :key="index"
        >
          <div class="icon">
            <img
              width="57"
              height="57"
              :src="`https://cyfirst.oss-cn-beijing.aliyuncs.com/${item.pic}`" 
            />
          </div>
          <div class="content">
            <h2 class="name">{{ item.foodname }}</h2>
            <div class="cartcontrol-wrapper">
              数量:{{item.count}}
            </div>
          </div>
        </li>
      </div>
    </div>
</template>

<script>
//导入获取订单详情的方法
import {getorderinfo} from '../../api/index'
export default {
    data(){
        return {
            orderinfo:[]  //订单信息
        }
    },
    async mounted() {
        //获取订单id(mounted只执行一次，所以只能获取到第一次，需要用到侦听器)
        let orders_id = this.$route.params.orders_id
        let res = await getorderinfo(orders_id)
        this.orderinfo = res
    },
    watch:{
      //侦听订单id变化($route:侦听的对象,value:变化后的数据)
      $route:async function(value){
        let orders_id = value.params.orders_id
        let res = await getorderinfo(orders_id)
        this.orderinfo = res
      }  
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>