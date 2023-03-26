<template>
  <div id="app">
    <footer class="footer_guide border-1px" style="height:60px">
    <a href="javascript:;" class="guide_item " @click="skip('/msite')" :class="{on:$route.path ==='/msite'}">
      <span class="item_icon">
        <i class="iconfont icon-fuwu"></i>
      </span>
      <span>首页</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="skip('/search')" :class="{on:$route.path ==='/search'}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>

    <!-- 法一： -->
    <!-- <router-link to="/search" class="guide_item">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link> -->

    <a href="javascript:;" class="guide_item" @click="skip('/order')" :class="{on:$route.path ==='/order'}">
      <span class="item_icon">
        <i class="iconfont icon-shopping_cart"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="skip('/profile')" :class="{on:$route.path ==='/profile'}">
      <span class="item_icon">
        <i class="iconfont icon-person"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
  </div>
</template>

<script>
export default {
    name:'Footer',
    methods:{
      skip(url){
        this.$router.push(url)
      }
    },
    // mounted(){
    //   console.log(this)
    // }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
// 去除滑动或多次点击导致的错误
  *{
    touch-action: pan-y
  }

  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
