<template>
  <div>
    <div class="zuofloat">
      <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      <p class="login">注册</p>
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
        type="text"
        label="手机号"
        @blur.native.capture="checkPhone"
        placeholder="请输入手机号"
        v-model="phonename"
        :state="phoneState"
      ></mt-field>
      <mt-field
        class="fit"
        type="text"
        label="邮箱"
        @blur.native.capture="checkEmail"
        placeholder="请输入邮箱"
        v-model="emailname"
        :state="emailState"
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
      <mt-field
        class="fit"
        type="password"
        label="确认密码"
        @blur.native.capture="checkRepwd"
        placeholder="请再次输入密码"
        :attr="{ maxlength: '11' }"
        v-model="repwdname"
        :state="repwdState"
      ></mt-field>
      <div>
        <p class="up">头像上传</p>
      </div>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/upload"
        name="uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <mt-button :disabled="!agree" class="btn" @click="checkForm" size="large"
        >注册</mt-button
      >
    </div>
    <div>
      <p class="way">其它登录方式</p>
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
import Upload from "../components/Upload.vue";
export default {
  components: { Upload },
  data() {
    return {
      agree: false, //同意与否,
      name: "", //绑定用户名文本框输入的内容
      nameState: "", //绑定用户名文本框的状态
      pwdname: "", //绑定密码文本框输入的内容
      pwdState: "", //绑定密码文本框输入的状态
      repwdname: "", //绑定确定密码文本框输入的内容
      repwdState: "", //绑定确定密码文本框输入的状态
      emailname: "", //绑定邮箱文本框输入的内容
      emailState: "", //绑定邮箱文本框输入的状态
      phonename: "", //绑定手机号文本框输入的内容
      phoneState: "", //绑定手机号文本框输入的状态
      imageUrl: "", //图片地址
      image: "", //图片数据
    };
  },
  methods: {
    handleAvatarSuccess(res, files) {
      this.imageUrl = URL.createObjectURL(files.raw);
      console.log(res);
      this.image = res.urls[0];
    },
    beforeAvatarUpload(files) {
      const isJPG = files.type === "image/jpeg";
      const isLt2M = files.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
    checkPhone() {
      let phone =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (phone.test(this.phonename)) {
        //验证成功
        this.phoneState = "success";
        return true;
      } else {
        //验证失败
        this.phoneState = "error";
        return false;
      }
    },
    checkEmail() {
      let email =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.test(this.emailname)) {
        this.emailState = "success";
        return true;
      } else {
        this.emailState = "error";
        return false;
      }
    },
    checkRepwd() {
      let repwd = /^1[3-9]\d{9}$/;
      //验证密码和确认密码是否一致
      if (repwd.test(this.repwdname) && this.pwdname == this.repwdname) {
        //验证成功
        this.repwdState = "success";
        return true;
      } else {
        //验证失败
        this.repwdState = "error";
        return false;
      }
    },
    //验证表单
    checkForm() {
      if (
        this.checkName() &&
        this.checkPwd() &&
        this.checkRepwd() &&
        this.checkEmail() &&
        this.checkPhone()
      ) {
        console.log("验证成功,执行注册业务...");
        //发送post请求,执行注册业务
        this.axios
          .post(
            "/reg",
            `u_names=${this.name}&u_pwd=${this.pwdname}&u_email=${this.emailname}&u_phone=${this.phonename}&u_pic=${this.image}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.code == 1) {
              //注册成功
              this.$router.push("/login");
            } else if (res.data.code == 0) {
              //用户已存在
              this.$messagebox("提示", "用户已存在");
            }
          });
      }
    },
  },
};
</script>

<style scoped src="../assets/css/register.css">
</style>

