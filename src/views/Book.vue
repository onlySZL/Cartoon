<template>
  <div>
    <div class="zuofloat">
      <div class="shujia" v-if="$store.state.islogin">
        <img :src="$store.state.pic" alt="" class="logo" />
        <p class="login">{{ $store.state.name }}的书架</p>
      </div>
      <div v-else class="shujia">
        <img src="images/img/login/avatar-default.png" alt="" class="logo" />
        <p class="login">我的书架</p>
      </div>
    </div>
    <div class="ours">
      <p class="yuedu">我的关注</p>
      <p class="guanzhu" @click="clear">一键清空</p>
      <div class="shezhi el-icon-setting">
        <router-link to="/quit" class="quit">设置</router-link>
      </div>
    </div>
    <div class="dibu" v-if="$store.state.islogin">
      <div v-for="(item, index) in data" :key="'item.m_id' + index">
        <div class="no">
          <router-link :to="`/article?m_id=${item.m_id}`">
            <img :src="item.m_img" alt="" class="pic" />
            <p class="font">{{ item.m_title }}</p>
            <p class="font">{{ item.m_kind }}</p>
          </router-link>

          <button @click="dellike(index, item.m_id)" class="you">取消</button>
        </div>
      </div>

      <div v-for="(item, index) in lovelist" :key="'item.i_id' + index">
        <div class="no">
          <router-link :to="`/cooperation?i_id=${item.i_id}`">
            <img :src="item.i_img" alt="" class="pic" />
            <p class="font">{{ item.i_title }}</p>
            <p class="font">{{ item.i_kind }}</p>
          </router-link>

          <button @click="dellove(index, item.i_id)" class="you">取消</button>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="images/img/Original/查询不到.png" alt="" class="nothing" />
    </div>
    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="tuijian"
        >推荐
        <img
          slot="icon"
          :src="
            require(`../assets/common/cart_${
              selected == 'tuijian' ? '1' : '0'
            }.png`)
          "
          alt=""
        />
      </mt-tab-item>
      <mt-tab-item id="faxian"
        >发现
        <img
          slot="icon"
          :src="
            require(`../assets/common/main_${
              selected == 'faxian' ? '1' : '0'
            }.png`)
          "
          alt=""
        />
      </mt-tab-item>
      <mt-tab-item id="shujia"
        >书架
        <img
          slot="icon"
          :src="
            require(`../assets/common/book_${
              selected == 'shujia' ? '1' : '0'
            }.png`)
          "
          alt=""
        />
      </mt-tab-item>
      <mt-tab-item id="me"
        >我的
        <img
          slot="icon"
          :src="
            require(`../assets/common/me_${selected == 'me' ? '1' : '0'}.png`)
          "
          alt=""
        />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "shujia", //指定底部选项卡默认选中项id
      data: "",
      lovelist: "",
      token: "",
    };
  },
  methods: {
    getData() {
      this.axios.get("/selectlike").then((res) => {
        console.log(res);
        this.data = res.data.data;
      });
    },
    init() {
      this.axios.get("/selectlove").then((res) => {
        console.log(res);
        this.lovelist = res.data.data;
      });
    },
    dellike(index, e) {
      this.data.splice(index, 1);
      this.axios.get(`/del?m_id=${e}`).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          console.log("删除成功",e);
        }
      });
    },
    dellove(index, e) {
      this.lovelist.splice(index, 1);
      this.axios.get(`/lovedel?i_id=${e}`).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          console.log("删除成功",e);
        }
      });
    },
    clear() {
      this.lovelist = [];
      this.data = [];
      this.axios.get("/likedel").then((res) => {
        if (res.data.code == 1) {
          console.log("一键清空成功");
        }
      });
      this.axios.get("/ipdel").then((res) => {
        if (res.data.code == 1) {
          console.log("一键清空成功");
        }
      });
    },
  },
  mounted() {
    this.getData();
    this.init();
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue == "me") {
        //用户点了底部选项:我的
        this.$router.push("/me");
      }
      if (newValue == "tuijian") {
        //用户点了底部选项:推荐
        this.$router.push("/recom");
      }
      if (newValue == "faxian") {
        //用户点了底部选项:发现
        this.$router.push("/");
      }
      this.selected = "shujia";
    },
  },
};
</script>

<style scoped src="../assets/css/book.css">
</style>