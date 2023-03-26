<template>
  <!--订单-->
  <div>
    <section class="order">
      <Header :title="title"> </Header>
      <section class="order_no_login" v-if="!logined">
        <img src="./images/order/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="login">立即登陆</button>
      </section>
      <div v-else>
        <div style="width: 100%; height: 50px"></div>
        <h4>您当前的订单为:</h4>
        <div class="container">
          <table class="table table-striped">
            <tr>
              <th>订单号</th>
              <th>总价格</th>
              <th>购买人</th>
              <th>操作</th>
            </tr>
            <p v-show="false">{{ orders }}</p>
            <tr v-for="(item, index) in orderinfo" :key="index" style="height:40px">
              <td>{{ item.order_num }}</td>
              <td>{{ item.food_totalprice }}</td>
              <td>{{ item.username }}</td>
              <td>
                <router-link :to="`/orderinfo/` + item.id"
                  class="btn btn-info"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  查看详情
                </router-link>
              </td>
              <td><button class="btn btn-success">评价</button></td>
            </tr>
          </table>
          <!-- 显示订单详情 -->
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../../components/Header/Header.vue";

//导入vuex用户登录信息
import { mapState } from "vuex";

//导入bs中相关js文件
import "../../../static/bs/js/jquery.min.js";
import "../../../static/bs/js/bootstrap.min.js";
import "../../../static/bs/js/holder.min.js";

//导入获取当前登录用户信息的方法
import { getuserorder } from "../../api/index";
export default {
  data() {
    return {
      title: "我的订单",
      orderinfo: "", //会员订单信息
    };
  },
  components: {
    Header,
  },
  computed: {
    //获取vuex登录用户信息
    ...mapState(["logined"]),
    //获取订单信息的方法
    async orders() {
      let res = await getuserorder(this.logined);
      this.orderinfo = res;
    },
  },
  methods: {
    //登录操作
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
// 导入bs相关css样式
@import '../../../static/bs/css/bootstrap.css';
@import '../../common/stylus/mixins.styl';

&.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>