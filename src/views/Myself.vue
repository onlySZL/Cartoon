<template>
  <div>
    <div>
      <p class="my">用户信息修改</p>
    </div>
    <div class="map">
      <van-form>
        <van-field
          @blur.native.capture="checkoldphone"
          v-model="oldphone"
          label="旧手机号"
          name="旧手机号"
          placeholder="旧手机号"
          :rules="[{ required: true, message: '请填写旧手机号' }]"
        />
        <van-field
          @blur.native.capture="checkName"
          v-model="name"
          label="用户名"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          :attr="{ maxlength: '11' }"
          @blur.native.capture="checkPwd"
          v-model="pwdname"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          @blur.native.capture="checkPhone"
          v-model="phonename"
          type="password"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          @blur.native.capture="checkEmail"
          v-model="emailname"
          type="password"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />

        <div>
          <p class="upp">头像修改</p>
        </div>
        <div class="ava">
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
        </div>
        <div style="margin: 16px">
          <van-button round block type="info" @click="checkForm"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "", //绑定用户名文本框输入的内容
      pwdname: "", //绑定密码文本框输入的内容
      emailname: "", //绑定邮箱文本框输入的内容
      phonename: "", //绑定手机号文本框输入的内容
      imageUrl: "", //图片地址
      image: "", //图片数据
      oldphone: "", //绑定旧手机文本框输入的内容
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
    checkName() {
      let reg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (reg.test(this.name)) {
        console.log("格式正确", this.name);
      } else {
        console.log("格式错误");
      }
    },
    checkPwd() {
      let pwd = /^1[3-9]\d{9}$/;
      if (pwd.test(this.pwdname)) {
        console.log("格式正确", this.pwdname);
      } else {
        console.log("格式错误");
      }
    },
    checkPhone() {
      let phone =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (phone.test(this.phonename)) {
        console.log("格式正确", this.phonename);
      } else {
        console.log("格式错误");
      }
    },
    checkoldphone() {
      let old =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (old.test(this.oldphone)) {
        console.log("格式正确", this.oldphone);
      } else {
        console.log("格式错误");
      }
    },
    checkEmail() {
      let email =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.test(this.emailname)) {
        console.log("格式正确", this.emailname);
      } else {
        console.log("格式错误");
      }
    },
    //验证表单
    checkForm() {
      //发送put请求,执行修改业务
      this.axios
        .put(
          "/edit",
          `u_names=${this.name}&u_pwd=${this.pwdname}&u_phone=${this.phonename}&u_email=${this.emailname}&u_pic=${this.image}&oldphone=${this.oldphone}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
          this.$router.push("/login");
          } else if (res.data.code == 0) {
            //修改错误
            this.$messagebox("提示", "修改错误");
          }
        });
    },
  },
};
</script>

<style  scoped src="../assets/css/myself.css">
</style>