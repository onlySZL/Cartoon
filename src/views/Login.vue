<template>
  <div>
    <div class="zuofloat">
      <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      <p class="login">登录</p>
    </div>

    <div class="reg">
      <!-- 输入框 -->
      <mt-field
        class="fit"
        type="text"
        label="用户名"
        @blur.native.capture="checkName"
        v-model="name"
        :state="nameState"
        placeholder="请输入用户名"
      ></mt-field>
      <mt-field
        class="fit"
        type="password"
        label="密码"
        @blur.native.capture="checkPwd"
        placeholder="请输入密码"
        :attr="{ maxlength: '11' }"
        v-model="pwdname"
        :state="pwdState"
      ></mt-field>
      <mt-button :disabled="!agree" class="btn" @click="checkForm" size="large"
        >登录</mt-button
      >
    </div>

    <div>
      <p class="way">其它登录方式</p>
      <router-link to="/register" class="go">去注册</router-link>
   
   </div>
   

    <div class="login-auto1">
      <input
        v-model="agree"
        type="checkbox"
        class="agreement"
        id="yes1"
        style="width: 4vw; height: 4vw"
      />
      <label for="yes1">同意《快看隐私协议》《用户服务协议》</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agree: false, //同意与否,
      name: "", //绑定用户名文本框输入的内容
      nameState: "", //绑定用户名文本框的状态
      pwdname: "", //绑定密码文本框输入的内容
      pwdState: "", //绑定密码文本框输入的状态
      data:''
    };
  },
  methods: {
    //验证用户名文本框
    checkName() {
      let reg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (reg.test(this.name)) {
        //验证成功
        this.nameState = "success";
        return true;
      } else {
        //验证失败
        this.nameState = "error";
        return false;
      }
    },
    checkPwd() {
      let pwd = /^1[3-9]\d{9}$/;
      if (pwd.test(this.pwdname)) {
        //验证成功
        this.pwdState = "success";
        return true;
      } else {
        //验证失败
        this.pwdState = "error";
        return false;
      }
    },

    //验证表单
    checkForm() {
      if (this.checkName() && this.checkPwd()) {
        console.log("验证成功,执行登录业务...");
        //发送post请求,执行登录业务
        this.axios
          .post("/login", `u_names=${this.name}&u_pwd=${this.pwdname}`)
          .then((res) => {
            console.log(res);
            this.data = res.data.data;
            console.log(this.data);
            if (res.data.code == 1) {
              //向sessionStorage中存储
              window.sessionStorage.setItem("name",this.data[0].u_names);
              window.sessionStorage.setItem("pwdname",this.data[0].u_pwd );
              window.sessionStorage.setItem("emailname",this.data[0].u_email);
              window.sessionStorage.setItem("phonename",this.data[0].u_phone);
              window.sessionStorage.setItem("pic",this.data[0].u_pic);
              //登录成功
              this.$toast("登录成功");
              //调用mutations中的loginOK,修改vuex用户状态
              this.$store.commit("loginOK", this.name);
              window.sessionStorage.setItem("islogin", true);
              var toPtah = window.sessionStorage.getItem("toPath");
              this.$router.push({ path: toPtah });
              this.$router.push("/me");
            } else if (res.data.code == 0) {
              //登录失败
              this.$toast("账号密码输入错误");
            }
          });
      }
    },
  },
};
</script>

<style scoped src="../assets/css/login.css">
</style>

<style>
.mint-msgbox {
  position: fixed;
  top: 40% !important;
  left: 40% !important;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85vw !important;
  border-radius: 3px;
  font-size: 4vw !important;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: 0.2s;
}
.mint-toast {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  max-width: 80vw !important;
  border-radius: 5px;
  background: rgba(153, 108, 108, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  -webkit-transition: opacity 0.3s linear;
  transition: opacity 0.3s linear;
}
.mint-cell-wrapper {
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 120% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-origin: content-box;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 4vw !important;
  line-height: 1 !important;
  min-height: inherit;
  overflow: hidden;
  padding: 0 20px !important;
  width: 100vw !important;
}
.mint-field-state .mintui {
  font-size: 5vw !important;
}
.mint-cell-text {
  line-height: 2 !important;
  vertical-align: middle !important;
}
.mint-field .mint-cell-title {
  width: 20vw !important;
  flex: none !important;
}
</style>