<template>
  <div id="#app">
    <Header />
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 底部组件 -->
    <Footer v-if="$route.meta.isshowfooter" />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  //实现局部刷新
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    //提供
    return {
      reload: this.reload, //加载局部刷新的操作
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  components: {
    Footer,
  },

  mounted() {
    // 分发商家列表请求
    this.$store.dispatch("shoplists");
    // 分发获取登录cookie的值
    this.$store.dispatch("getcookie");
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" >
* {
  touch-action: pan-y;
}

#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;

  .content { // 每个页面的内容
    >div { // 决定哪个页面显示
      display: none;

      &.on {
        display: block;
      }
    }
  }
}
</style>
