<template>
  <div>
    <!-- 第一部分 -->
    <div class="guding">
      <div>
        <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      </div>

      <input
        @keyup.enter="checklist"
        v-model="m_title"
        type="text"
        class="login"
        placeholder="请输入您要查询的内容"
      />
    </div>

    <!-- 第二部分 -->
    <div class="dibulist">
      <div class="selectlist" v-for="(item, index) in data.data" :key="index">
        <router-link :to="`/article?m_id=${item.m_id}`">
          <div>
            <img :src="`${item.m_img}`" alt="" class="bikan" />
          </div>
          <div class="fd">
            <p class="biaoti">{{ item.m_title }}</p>
            <p class="yuanzhu">漫画《{{ item.m_title }}》原著</p>
            <p class="jieshao">{{ item.m_details.substr(0, 80) }}...</p>
            <button class="you">+关注</button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
  
  <script>
import merge from "webpack-merge";

export default {
  data() {
    return {
      m_title: "",
      data: [], //用于存储所有的文章信息
    };
  },
  methods: {
    checklist() {
      if (this.$route.query.Selection !=='') {
        this.axios
          .post("/pages", `m_title=${this.$route.query.Selection }`)
          .then((res) => {
            console.log(res);
            this.data = res.data;
            this.$router.push({
          query: merge(this.$route.query, { Selection: this.m_title }),
        });
          });
      } else {
        this.axios
          .post("/pages", `m_title=${this.m_title}`)
          .then((res) => {
            console.log(res);
            this.data = res.data;

          });
      }
  
    },
    getData(){
      this.axios.post("/histroy",`i_title=${this.$route.query.Selection}`).then((res)=>{
          console.log(res)        
      })
    }
  },

  mounted() {
    this.checklist();
    this.getData();
   
  },
 
};
</script>
  
  <style scoped src="../assets/css/selectes.css">
</style>