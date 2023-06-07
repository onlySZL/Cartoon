<template>
  <div>
    <!-- 第一部分 -->
    <div class="guding">
      <div>
        <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      </div>

      <input
        @keyup.enter="Selectiones"
        v-model="Selection"
        type="text"
        class="login"
        placeholder="请输入您要查询的内容"
      />

      <!-- 第二部分 -->
      <div>
        <h1 class="second">搜索历史</h1>
        <div @click="Unkonw" class="el-icon-delete delete"></div>
        <div class="history">
          <div v-for="(item, index) in datas" :key="index" class="youxuan">
            <p @click="say($event, index)" class="xuan">{{ item.i_title }}</p>
          </div>
        </div>
      </div>
      <!-- 第三部分 -->
      <div class="third">
        <h1>热门搜索</h1>
        <div class="cartoon2">
          <div class="cartoon" v-for="(item, index) in data" :key="index">
            <router-link :to="`/article?m_id=${item.m_id}`">
              <div class="cartoon3">
                <div>
                  <img :src="`${item.m_img}`" alt="" class="logo2" />
                </div>
                <div>
                  <p>{{ item.m_title.substr(0, 4) }}...</p>
                  <p>{{ item.m_kind }}</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- <div class="cartoon3">
              <div>
                 <img src="/images/img/Home/logo2.png" alt="" class="logo2">
              </div>
              <div>
                <p>难哄</p>
                <p>恋爱</p>
              </div>
          </div> -->
        </div>
      </div>
       
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Selection: "",
      data: "",
      datas: "",
    };
  },
  methods: {
    Selectiones() {
      this.$router.push({
        path: "/selectes",
        query: {
          Selection: this.Selection,
        },
      });
    },
    checklist() {
      this.axios.get("/classify").then((res) => {
        console.log(res);
        var arr = res.data.data;
        var arr2 = arr;
        var arr3 = arr2.slice(0, 6);
        this.data = arr3;
      });
    },
    getdata() {
      this.axios.get("/histroys").then((res) => {
        // console.log(res)
        var arr = res.data.data;
        console.log(arr)
        var arr2 = []
        arr.forEach(item=>{
          if(!arr2.some(items=>items.i_title===item.i_title)){
            arr2.push(item)
          }
        })
        console.log(arr2)
        this.datas = arr2
      });
    },
    say($event, index) {
      console.log($event.target.innerHTML);
      let select = $event.target.innerHTML;
      this.Selection = select;
    },
    Unkonw() {
      this.datas = [];
      this.axios.get("/delsearch").then((res) => {
        if (res.data.code == 1) {
          alert("清空历史记录成功");
        }
      });
    },
  },
  mounted() {
    this.checklist();
    this.getdata();
  },
};
</script>

<style scoped src="../assets/css/select.css">
</style>