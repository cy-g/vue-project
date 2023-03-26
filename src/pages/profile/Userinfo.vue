<template>
  <div>
    <header>
      <a href="javascript:void(0)" class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <p>个人中心</p>
    </header>

    <div class="content">
      <div class="detail">
        <img
          v-if="usermessage.pic"
          :src="`https://cyvue2.oss-cn-beijing.aliyuncs.com/${usermessage.pic}`"
          alt=""
        />
        <img v-else :src="imgStr" alt="" />
        <ul class="block">
          <li>
            昵称：{{ usermessage.realname ? usermessage.realname : "暂无昵称" }}
          </li>
          <li>
            电话：{{ usermessage.phone ? usermessage.phone : "暂无电话" }}
          </li>
          <li>
            邮箱：{{ usermessage.email ? usermessage.email : "暂无邮箱" }}
          </li>
        </ul>
      </div>
      <!-- 判断详细信息是否更新完毕，更新完毕出现更换头像按钮 -->
      <div v-if="usermessage.realname != ''">
        <div class="form-group">
          <div class="col-sm-2 col-xs-offset-4">
            <label for="file" class="btn btn-default">更换头像</label>

            <input
              id="file"
              type="file"
              style="display: none"
              @change="onchangeImgFun"
            />
          </div>
        </div>
      </div>

      <div class="edit">
        <!-- <a href="###">编辑</a> -->
        <!-- <button style="backgroundColor:blue;width:100%;height:40px">编辑</button> -->
        <!-- 使用mintui -->
        <mt-button
          type="primary"
          size="large"
          data-toggle="modal"
          data-target="#myModal"
          >编辑</mt-button
        >
      </div>
      <form @submit.prevent="updatemessage" method="post">
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
                <h4 class="modal-title">编辑个人详情</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>昵称</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加你的昵称"
                    v-if="!usermessage.realname"
                    v-model="realname"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改你的昵称"
                    v-else
                    v-model="realname1"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加你的电话"
                    v-if="!usermessage.phone"
                    v-model="phone"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改你的电话"
                    v-else
                    v-model="phone1"
                  />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请添加你的邮箱"
                    v-if="!usermessage.email"
                    v-model="email"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改你的邮箱"
                    v-else
                    v-model="email1"
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
                <button class="btn btn-success">编辑</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="login-out">
        <!-- <a href="###">退出</a> -->
        <!-- <button style="backgroundColor:red;width:100%;height:40px">退出</button> -->
        <mt-button type="danger" size="large" @click="loginquit"
          >退出</mt-button
        >
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
//导入阿里OSS
import OSS from "ali-oss";
//配置阿里OSS
const client = new OSS({
  accessKeyId: "xxx", // 查看你自己的阿里云KEY
  accessKeySecret: "xxx", // 查看自己的阿里云KEYSECRET
  bucket: "xxx", // 你的 OSS bucket 名称
  region: "xxx", // bucket 所在地址，我的是 华北2 北京
  // cname: true // 开启自定义域名上传
  // endpoint:"file.xxxx.live" // 自己的域名
});

//导入弹出式提示框
import { MessageBox } from "mint-ui";

//导入mapState快速生成计算属性
import { mapState } from "vuex";

//导入获取用户详情的方法,插入用户信息的方法,修改用户信息的方法,修改用户头像信息的方法
import {
  getusermessage,
  addusermessage,
  updateusermessage,
  updateuserpic,
} from "../../api/index";

//导入bs中相关js文件
import "../../../static/bs/js/jquery.min.js";
import "../../../static/bs/js/bootstrap.min.js";
import "../../../static/bs/js/holder.min.js";
import "../../../static/bs/css/bootstrap.css";
export default {
  data() {
    return {
      usermessage: "", //存储个人详细信息的数据
      realname: "", //添加的昵称
      phone: "", //添加的电话
      email: "", //添加的邮箱
      realname1: "", //修改的昵称
      phone1: "", //修改的电话
      email1: "", //修改的邮箱
      imgStr: require("./images/avatar.jpg"), //存放头像的数据
    };
  },
  computed: {
    //获取登录成功后的用户名
    ...mapState(["logined"]),
  },
  methods: {
    loginquit() {
      //使用提示框
      MessageBox.confirm("确定要退出吗？").then(
        (action) => {
          console.log("退出成功");
          //清除cookie信息
          //分发动作
          this.$store.dispatch("clearcookies");
          this.$router.push("/login");
        },
        (action) => {
          console.log("退出失败");
        }
      );
    },
    //更新，添加用户信息操作
    async updatemessage() {
      //有则修改
      if (this.usermessage.realname !== "") {
        let username = this.realname1;
        let phone = this.phone1;
        let email = this.email1;
        let userinfo_name = this.$route.params.name;
        let res = await updateusermessage(
          username,
          phone,
          email,
          userinfo_name
        );
        if (res.msg === "ok") {
          //修改成功后跳转到本界面
          this.$router.go(0);
        }
      } else if (this.usermessage.realname === "") {
        //没有则添加
        //获取昵称，电话，电子邮箱,用户名
        let username = this.realname;
        let phone = this.phone;
        let email = this.email;
        let userinfo_name = this.$route.params.name;
        let res = await addusermessage(username, phone, email, userinfo_name);
        if (res.msg === "ok") {
          //添加成功后跳转到本界面
          this.$router.go(0);
        }
      }
    },
    //更换头像操作
    async onchangeImgFun(e) {
      var file = e.target.files[0];
      var fileNames = file.name;
      console.log(file);
      console.log(fileNames);
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      // console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0]);
        // console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息
        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
        //阿里oss上传头像
        // 上传文件,这里是上传到OSS
        await client.put(fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            // options.onSuccess(res);
            console.log("上传成功");
          } else {
            options.onError("上传失败");
          }
        });
        //调用后端接口代码位置
        let res = await updateuserpic(fileNames, this.$route.params.name);
        if (res.msg === "") {
          this.$router.go(0);
        }
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    },
  },
  async mounted() {
    //获取登陆的用户名
    let name = this.$route.params.name;
    //获取用户信息
    let res = await getusermessage(name);
    // console.log(res)
    //如果没有用户信息
    if (res.realname === "") {
      this.usermessage = res;
    } else {
      //有详细信息
      this.usermessage = res;
      this.realname1 = res.realname;
      this.phone1 = res.phone;
      this.email1 = res.email;
    }
  },
};
</script>
<style scoped>
@charset "utf-8";
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: 微软雅黑;
}

ul {
  list-style: none;
  margin: 0 0 0 7.5em;
  padding: 0;
}

header {
  width: 100%;
  height: 3em;
  background-color: #02a774;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  width: 100%;
  background-color: #ffffff;
}

.detail {
  background-color: #ffffff;
  height: auto;
  margin-top: 1em;
  padding: 10px;
  position: relative;
}

.edit {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 10em;
  clear: both;
}

.login-out {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  margin-bottom: 0.5em;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

img {
  width: 100%;
  height: 100%;
  height: 7em;
  width: 7em;
  border: 1px solid grey;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.block {
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  width: 50%;
}
.back {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: left;
}
.icon-arrow_left {
  display: block;
  padding: 5px;
  font-size: 20px;
  color: #fff;
}
</style>