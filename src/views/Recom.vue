<template>
  <div>
    <div class="guding">
      <div>
        <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      </div>
      <input
        v-model="i_title"
        type="text"
        class="login"
        placeholder="请输入您要查询的内容"
        @keyup.enter="checklist"
      />
    </div>

    <div class="xuanran" v-for="(item, index) in data.data" :key="index">
      <router-link :to="`/cooperation?i_id=${item.i_id}`">
        <div class="zuo">
          <h1 class="zuozuo">{{ item.i_title }}</h1>
          <button class="you">关注</button>
        </div>
        <div class="kuai">
          <div class="youxuan">
            <p class="xuan">优选推荐</p>
            <p class="qi">奇幻 治愈 剧情</p>
          </div>
          <img :src="`${item.i_img}`" alt="" class="liebiao" />
          <p class="first">{{ item.i_remark.substr(0, 20) }}...</p>
        </div>
      </router-link>
    </div>
    

    <div class="dibu"></div>
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
      data: [], //用于存储所有的文章信息
      selected: "tuijian", //指定底部选项卡默认选中项id
      i_title: "",
    };
  },
  methods: {
    checklist() {
      this.axios.post("/oriori", `i_title=${this.i_title}`).then((res) => {
        console.log(res);
        this.data = res.data;
        this.i_title = ''
        if (res.data.code == 201) {
          alert("查询失败");
        }
      });
    
    },


  },
  mounted() {
    this.checklist();
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue == "me") {
        //用户点了底部选项:我的
        this.$router.push("/me");
      }
      if (newValue == "faxian") {
        //用户点了底部选项:推荐
        this.$router.push("/");
      }
      if (newValue == "shujia") {
        //用户点了底部选项:书架
        this.$router.push("/book");
      }
      this.selected = "tuijian";
    },
  },
};
</script>

<style scoped src="../assets/css/recom.css">
</style>