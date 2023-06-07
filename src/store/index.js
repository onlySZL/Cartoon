import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin:sessionStorage.getItem("islogin"), //用于标识用户是否已经登录
    name:sessionStorage.getItem("name"), //用于标识用户名
    pwdname:sessionStorage.getItem("pwdname"), //用于表示密码
    emailname:sessionStorage.getItem("emailname"), //用于标识邮箱
    phonename:sessionStorage.getItem("phonename"), //用于标识手机号
    pic:sessionStorage.getItem("pic") //用于标识头像
  },
  mutations: {
    //登录成功后,修改state中的相关状态
    loginOK(state,newname) {
      state.islogin = true;
      state.name = newname;
      //向sessionStorage中存储islogin与name
      sessionStorage.setItem("islogin", true);
      sessionStorage.setItem("name", newname);
    },
  },
  actions: {},
  modules: {},
});
