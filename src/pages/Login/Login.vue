<template>
  <!-- 登录注册页面 on表示显示，off表示关闭-->
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">起点外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: ifLogin }"
              @click="ifLogin = true"
              >注册</a
            >
            <a
              href="javascript:;"
              :class="{ on: !ifLogin }"
              @click="ifLogin = false"
              >登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <!-- prevent阻止表单的默认行为 -->
          <form @submit.prevent="register">
            <!-- 注册 -->
            <div :class="{ on: ifLogin }">
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="请输入注册的用户名"
                  v-model="username"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="18"
                  placeholder="请输入注册的密码"
                  v-if="!ifBtn"
                  v-model="userpass"
                />
                <input
                  type="text"
                  maxlength="18"
                  placeholder="请输入注册的密码"
                  v-if="ifBtn"
                  v-model="userpass"
                />
                <!-- off时密码是password形式，按钮颜色是白色；on时密码是text形式，按钮是绿色  -->
                <div
                  class="switch_button"
                  @click="ifBtn = !ifBtn"
                  :class="ifBtn ? 'on' : 'off'"
                >
                  <div class="switch_circle" :class="{ right: ifBtn }"></div>
                  <span class="switch_text"></span>
                </div>
              </section>
              <button class="login_submit">注册</button>
            </div>
          </form>
          <!-- 登录 -->
          <form @submit.prevent="doLogin">
            <div :class="{ on: !ifLogin }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="请输入登陆用户名"
                    v-model="loginName"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="password"
                    maxlength="18"
                    placeholder="请输入登录的密码"
                    v-if="!ifBtn"
                    v-model="loginPass"
                  />
                  <input
                    type="text"
                    maxlength="18"
                    placeholder="请输入登录的密码"
                    v-if="ifBtn"
                    v-model="loginPass"
                  />
                  <div
                    class="switch_button"
                    @click="ifBtn = !ifBtn"
                    :class="ifBtn ? 'on' : 'off'"
                  >
                    <div class="switch_circle" :class="{ right: ifBtn }"></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <button class="login_submit">登录</button>
            </div>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="goback">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
    <!-- 提示框组件 -->
    <AlertTip v-show="tipShow" :tipText="tipText" @closeTips="closeTips" />
  </div>
</template>

<script>
// 导入注册方法,登陆方法
import { addUser, userLogin } from "../../api/index";

//导入登录提示框组件
import AlertTip from "../../components/AlertTip/AlertTip.vue";
export default {
  data() {
    return {
      ifLogin: true, //true时是注册，false时是登录
      ifBtn: false, //false时密码不显示，true时密码明文显示
      username: "", //注册用户名
      userpass: "", //注册用户密码
      tipShow: false, //是否显示提示框
      tipText: "", //提示框显示内容

      loginName: "", //登录用户名
      loginPass: "", //登陆密码
    };
  },
  //挂载提示框组件
  components: {
    AlertTip,
  },
  methods: {
    // 回退按钮
    goback() {
      this.$router.back();
    },
    // 注册操作
    async register() {
      console.log("执行注册操作");
      //获取用户名和密码
      let name = this.username;
      let pass = this.userpass;
      // console.log(name,pass)

      //校验注册的用户名和密码
      if (!/^\w{6,8}$/.test(name)) {
        // console.log('请输入6-8位任意字母,数字,下划线组合')
        //不符合时显示提示框
        this.tipShow = true;
        //提示框提示内容
        this.tipText = "请输入6-8位任意字母,数字,下划线组合";
        return;
      }
      if (!/^\w{8,18}$/.test(pass)) {
        // console.log('请输入8-18位任意字母,数字,下划线组合')
        this.tipShow = true;
        this.tipText = "请输入8-18位任意字母,数字,下划线组合";
        return;
      }
      //调用后端注册接口
      let res = await addUser(name, pass);
      // console.log(res)
      if(res.msg === "ok"){
        //验证成功后显示登陆用户名
        this.$store.dispatch('gologin',name)
        //注册成功后跳转
        this.$router.push("/profile");
      }
    },
    //点击确认关闭提示框
    closeTips() {
      this.tipShow = false;
    },

    //登陆操作
    async doLogin() {
      //获取登陆的用户名和密码
      let name = this.loginName;
      let pass = this.loginPass;
      // console.log(name,pass)

      //调用登录接口
      let res = await userLogin(name, pass);
      // console.log(res);
      if (name) {
        if (pass) {
          if (res.msg === "usernameiserror") {
            //不符合时显示提示框
            this.tipShow = true;
            //提示框提示内容
            this.tipText = "用户名不存在";
            return;
          }
          if (res.msg === "userpassiserror") {
            //不符合时显示提示框
            this.tipShow = true;
            //提示框提示内容
            this.tipText = "密码错误";
            return;
          }
          if (res.msg === "ok") {
            //验证成功后显示登陆用户名
            this.$store.dispatch('gologin',name)
            //登录验证成功后跳转
            this.$router.push("/profile");
          }
        }else{
          this.tipShow = true;
            //提示框提示内容
          this.tipText = "密码不能为空";
        }
      }else{
        this.tipShow = true;
            //提示框提示内容
        this.tipText = "用户名不能为空";
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>