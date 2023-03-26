<template>
  <div class="cartcontrol">
    <!-- 过渡动画 -->
    <transition name="move">
    <!-- 减 -->
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click="updata(false)"></div>
    </transition>
    <!-- 数量 -->
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <!-- 加 -->
    <div class="iconfont icon-add_circle" @click="updata(true)"></div>
</div>
</template>

<script>
// import Vue from 'vue'
export default {
    props:['food'],
    methods: {
        // //添加操作
        // add(){
        //     //利用set方法设置一个响应式数据  Vue.set(响应式的对象，'增加的响应属性名',值)
        //     if(!this.food.count){
        //         Vue.set(this.food,'count',1)
        //     }else{
        //         this.food.count++
        //     }
        //     // console.log(this.food)
        // },
        // //减少操作
        // minus(){
        //     if(this.food.count){
        //         this.food.count--
        //     }
        // }

        //合并增加，减少操作
        updata(isadd){
            //利用vuex更新数据
            this.$store.dispatch('updataCount',{isadd,food:this.food})
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
.cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all 2s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(360deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>