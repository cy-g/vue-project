<template>
  <!--我的-->
  <div>
    <section class="profile">
      <Header :title="title"/>
      <section class="profile-number">
        <router-link :to="logined  ? `/logininfo/${logined}` : '/login'" class="profile-link">
          <div class="profile_image">
            <p v-show="false">{{profile}}</p>
            <img v-if="message.pic" :src="`https://cyvue2.oss-cn-beijing.aliyuncs.com/${message.pic}`" alt="" style="width:100px;height:100px">
            <i v-else class="iconfont icon-person"></i>
          </div>
          <div class="user-info">
            <p class="user-info-top" @click="gologin" v-if="!logined">登录/注册</p>
            <p class="user-info-top" @click="gologin" v-else>{{logined}}</p>
            <p>
              <span class="user-icon">
                <i class="iconfont icon-shouji icon-mobile"></i>
              </span>
              <span v-if="message.phone" class="icon-mobile-number">{{message.phone}}</span>
              <span v-else class="icon-mobile-number">暂无绑定手机号</span>
            </p>
          </div>
          <span class="arrow">
            <router-link :to="logined  ? `/logininfo/${logined}` : '/login'" class="iconfont icon-jiantou1"></router-link>
          </span>
        </router-link>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0.00</span>元</span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>个</span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>分</span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 我的订单 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-order-s"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 起点外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-vip"></i>
          </span>
          <div class="my_order_div">
            <span>起点外卖会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-fuwu"></i>
          </span>
          <div class="my_order_div">
            <span>服务中心</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>
    </section>
    <mt-button type="danger" size="large" v-if="logined" @click="loginquit">退出</mt-button>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'

//导入获取会员详情的方法
import {getusermessage} from '../../api/index'

//导入弹出式提示框
import { MessageBox } from 'mint-ui';

//导入mapState快速生成计算属性
import {mapState} from 'vuex'
export default {
  data(){
    return{
      title:'个人中心',
      message:[]  //个人详情数据
  }
},
  components:{
    Header
  },
  methods: {
    gologin(){
      this.$router.push('/login')
    },
    //退出登录事件
    loginquit(){
      //使用提示框
      MessageBox.confirm('确定要退出吗？').then(action => {
        console.log('退出成功')
        //清除cookie信息
        //分发动作
        this.$store.dispatch('clearcookies')
      },action =>{
        console.log('退出失败')
      })
    }
  },
  computed:{
    //获取登录成功后的用户名
    ...mapState(['logined']),
    async profile(){
      let name = this.logined
      let res = await getusermessage(name)
      this.message = res
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';
&.profile { // 我的
  width: 100%;

  .profile-number {
    margin-top: 40px;

    .profile-link {
      clearFix();
      position: relative;
      display: block;
      background: #02a774;
      padding: 20px 10px;

      .profile_image {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;

        .icon-person {
          background: #e4e4e4;
          font-size: 62px;
        }
      }

      .user-info {
        float: left;
        margin-top: 8px;
        margin-left: 15px;

        p {
          font-weight: 700;
          font-size: 18px;
          color: #fff;

          &.user-info-top {
            padding-bottom: 8px;
          }

          .user-icon {
            display: inline-block;
            margin-left: -15px;
            margin-right: 5px;
            width: 20px;
            height: 20px;

            .icon-mobile {
              font-size: 30px;
              vertical-align: middle;
            }
          }

          .icon-mobile-number {
            font-size: 14px;
            color: #fff;
          }
        }
      }

      .arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 40%;

        .icon-jiantou1 {
          color: #fff;
          font-size: 5px;
        }
      }
    }
  }

  .profile_info_data {
    bottom-border-1px(#e4e4e4);
    width: 100%;
    background: #fff;
    overflow: hidden;

    .info_data_list {
      clearFix();

      .info_data_link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;

        .info_data_top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;

          span {
            display: inline-block;
            font-size: 30px;
            color: #f90;
            font-weight: 700;
            line-height: 30px;
          }
        }

        .info_data_bottom {
          display: inline-block;
          font-size: 14px;
          color: #666;
          font-weight: 400;
          padding-bottom: 10px;
        }
      }

      .info_data_link:nth-of-type(2) {
        .info_data_top {
          span {
            color: #ff5f3e;
          }
        }
      }

      .info_data_link:nth-of-type(3) {
        border: 0;

        .info_data_top {
          span {
            color: #6ac20b;
          }
        }
      }
    }
  }

  .profile_my_order {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .my_order {
      display: flex;
      align-items: center;
      padding-left: 15px;

      >span {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;

        >.iconfont {
          margin-left: -10px;
          font-size: 30px;
        }

        .icon-order-s {
          color: #02a774;
        }

        .icon-jifen {
          color: #ff5f3e;
        }

        .icon-vip {
          color: #f90;
        }

        .icon-fuwu {
          color: #02a774;
        }
      }

      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }

        .my_order_icon {
          width: 10px;
          height: 10px;

          .icon-jiantou1 {
            color: #bbb;
            font-size: 10px;
          }
        }
      }
    }
  }
}

</style>