<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="showcart">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: getCartNum }">
              <i
                class="iconfont icon-shopping_cart"
                :class="{ highlight: getCartNum }"
              ></i>
            </div>
            <div class="num" v-if="getCartNum">{{ getCartNum }}</div>
          </div>
          <div class="price" :class="{ highlight: getCartNum }">
            ￥{{ getCartPrice }}
          </div>
          <div class="desc">另需配送费￥{{ fee }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="isenough" @click="account">{{payinfo}}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="isshowlist">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearcart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(item, index) in cartfoods" :key="index">
              <span class="name">{{ item.foodname }}</span>
              <div class="price">
                <span>￥{{ item.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">{{item.count}}</div>
                  <div class="iconfont icon-add_circle"></div>
                </div> -->
                <!-- 加减食品组件 -->
                <CartControl :food="item" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 单击购物车后背景模糊显示 -->
    <div class="list-mask" v-show="isshowlist" @click="showcart"></div>
  </div>
</template>

<script>
//导入获取商家信息的方法
import { shopHeaders } from "../../api/index";

//导入vuex需要添加到购物车中的数据 ，getters里面的总数量
import { mapState, mapGetters } from "vuex";

//导入加减食品按钮组件
import CartControl from "../CartControl/CartControl.vue";

//导入弹出式提示框和简单提示框
import { MessageBox,Toast} from "mint-ui";
export default {
  data() {
    return {
      fee: "", //配送费
      isshow: false, //控制购物车添加食品信息的显示
    };
  },
  computed: {
    //获取vuex中添加到购物车内的数据,用户登录名
    ...mapState(["cartfoods","logined"]),
    //获取getters中食品总数量,价格
    ...mapGetters(["getCartNum", "getCartPrice"]),
    //对是否显示购物车食品数据进行进一步处理
    isshowlist() {
      if (this.getCartNum === 0) {
        this.isshow = false;
        return false;
      }
      return this.isshow;
    },
    //判断是否可以结算
    isenough(){
      //获取总价格
      const {getCartPrice} = this
      //获取配送费
      const fee = this.fee
      //通过总价格是否大于配送费判断显示不同样式
      return getCartPrice>=fee ? 'enough' : 'not-enough'
    },
    //价格多于/少于配送费时，显示不同的文字
    payinfo(){
       //获取总价格
      const {getCartPrice} = this
      //获取配送费
      const fee = this.fee
      if(getCartPrice === 0){
        return `￥${fee}元起送`
      }else if(getCartPrice < fee){
        return `还差￥${fee - getCartPrice}元起送`
      }else{
        return '结算'
      }
    }
  },
  //获取商家id
  props: ["shoplistsid"],

  //获取商家数据
  async mounted() {
    let res = await shopHeaders(this.shoplistsid);
    // console.log(res)
    this.fee = res.fee;
  },
  components: {
    //注册加减食品的组件
    CartControl,
  },
  methods: {
    //点击显示购物车中食品信息
    showcart() {
      if (this.getCartNum) {
        this.isshow = !this.isshow;
      }
    },
    //清空购物车
    clearcart() {
      //使用提示框
      MessageBox.confirm("确定要清空吗？").then(
        (action) => {
          // console.log("清空成功");
          //清除购物车食品信息信息，分发动作
          this.$store.dispatch("clearcarts");
        },
        (action) => {
          // console.log("清空失败");
        }
      );
    },
    //结算调用的函数
    account(){
      //获取总价格
      const {getCartPrice} = this
      //获取配送费
      const fee = this.fee
      if(getCartPrice === 0){
        Toast(`￥${fee}元起送`)
      }else if(getCartPrice < fee){
        Toast(`还差￥${fee - getCartPrice}元起送`)
      }else{
        //判断用户是否登录
       if(this.logined){
        //登陆后可跳转到结算页面 并传递用户给收获地址页面
        this.$router.push('/account/' + this.logined)
       }else{
        //否则跳转到登录页面
        this.$router.push('/login')
       }
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>