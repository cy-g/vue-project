<template>
  <div>
    <Header :title="title">
      <nav class="shop-nav" slot="left">
        <a href="javascript:void(0)" class="back" @click="$router.back()">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </Header>
    <div style="width: 100%; height: 50px"></div>
    <button
        class="btn btn-info marg"
        data-toggle="modal"
        data-target="#myModal"
      >
        添加收货地址
      </button>
    <div class="container">
      <form @submit.prevent="addaddress" method="post">
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">添加收货地址</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>姓名</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="请输入姓名"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    placeholder="请输入电话"
                    v-model="phone"
                  />
                </div>
                <div class="form-group">
                  <label>配送地址</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    placeholder="请输入配送地址"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-danger"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  取消
                </button>
                <button class="btn btn-success">添加</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <h4>配送地址</h4>
    <div>
      <ul class="list-group">
        <li
          class="list-group-item"
          style="width: 100%; height: 40px"
          v-for="(item,index) in alladdress" :key="index"
        >
          <input
            type="radio"
            v-model="address_id"
            :value='item.id'
          /> {{item.realname}} {{item.phone}} {{item.address}}
        </li>
      </ul>
    </div>
    <h4>所购食品</h4>
    <div class="list-content">
      <ul>
        <li class="food" v-for="(item,index) in cartfoods" :key="index">
          <span class="name">{{item.foodname}}</span>
          <div class="price">
            <span>￥{{item.price}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <!-- 使用加减食品组件并传递数据-->
            <CartControl :food="item"/>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <a href="javascript:void(0)">总计:{{getCartPrice}}元</a>
      <button
        type="button"
        class="btn btn-success"
        style="float: right"
        @click="order"
      >{{ordertext}}
      </button>
    </div>
  </div>
</template>
<script>
//导入头部组件
import Header from '../../components/Header/Header.vue'

//导入bs中相关js文件
import '../../../static/bs/js/jquery.min.js'
import '../../../static/bs/js/bootstrap.min.js'
import '../../../static/bs/js/holder.min.js'

//导入添加收货地址的方法,遍历收货地址的方法,生成订单的方法,生成订单详情的方法
import {insertaddress,getaddress,makeorder,makeorderinfo} from '../../api/index'

//导入vuex中的数据
import {mapState,mapGetters} from 'vuex'

//导入加减食品组件
import CartControl from '../../components/CartControl/CartControl.vue'

//导入提示框组件
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            title:'结算页',
            name:'',   //初始化姓名
            phone:'',  //初始化电话
            address:'',  //初始化地址
            alladdress:'',  //需要遍历的收获地址
            address_id:''  //选择的收货地址id
        }
    },
    computed:{
        //获得购物车中的食品数据
        ...mapState(['cartfoods']),
        //获得食品的总价格
        ...mapGetters(['getCartPrice']),
        //结算按钮的动态变化
        ordertext(){
          //获取总价格
          const {getCartPrice} = this
          //获取收货地址id
          const addressid = this.address_id
          if(getCartPrice === 0){
            return '请去添加食品'
          }else if(!addressid){
            return '请添加收货地址'
          }else{
            return '提交订单'
          }
        }

    },
    components:{
        //注册头部组件
        Header,
        //注册加减食品组件
        CartControl
    },
    //局部刷新
    inject: ['reload'], //注入
    methods: {
        //表单提交触发事件
        async addaddress(){
            //获取添加的收货人，电话，收货地址,用户名
            let name = this.name
            let phone = this.phone
            let address = this.address
            let username = this.$route.params.username
            //添加收货人，电话，收货地址,用户名
            let res = await insertaddress(name,phone,address,username)
            //添加成功后关闭模态框
            if(res.msg === 'ok'){
              //局部无刷新操作
                this.reload()
                //跳转到当前界面
                // this.$router.go(0)
                //手动关闭模态框
                $("#myModal").modal('hide')
            }
        },
        //提交订单的方法
        async order(){
          //获取总价格和选择的收货地址id
          const {getCartPrice} = this
          const addressid = this.address_id
          if(getCartPrice === 0){
            Toast('请去添加食品')
          }else if(!addressid){
            Toast('请添加收货地址')
          }else{
            //生成订单
            let order_num = Math.floor(Math.random()*1000)   //随机生成一个订单号
            let address_id = this.address_id          //获取收获地址id
            let food_totalprice = this.getCartPrice   //获取总价格
            let username = this.$route.params.username  //获取用户名
            let res = await makeorder(order_num,address_id,food_totalprice,username)
            //生成订单详情
            if(res.msg === 'ok'){
              let orders_id = res.insertid    //订单id
              //遍历购物车数据
              this.cartfoods.forEach(async (item,index)=>{
                let foodname = item.foodname   //食品名称
                let pic = item.foodpic         //食品图片
                let count = item.count        //食品数量
                //调用生成订单信息的方法
                let res = await makeorderinfo(foodname,pic,count,orders_id)
              })

            }
            //跳转到具体订单页面
            this.$router.push('/order')
            //清除购物车食品信息信息，分发动作
            this.$store.dispatch("clearcarts");
          }
        }
    },
    async mounted(){
      //对收获地址进行遍历操作
      let username = this.$route.params.username
      let res = await getaddress(username)
      this.alladdress = res
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
// 导入bs相关css样式
@import '../../../static/bs/css/bootstrap.css'
@import '../../common/stylus/mixins.styl';

.marg {
  margin: 10px 2px
}
.shop-nav {
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #02A774;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 0;

    .icon-arrow_left {
      display: block;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
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
</style>