<template>
  <div>

    <div v-for="(item, index) in data" :key="index">
          <img :src="item.m_img" alt="" class="bjtp">
      </div>

    <div class="topnumber">

    

      <div class="classifylist">
        <ul   class="classify">
          <li
            @click="say($event, index)"
            :class="activeindex == index ? 'all' : ''"
            v-for="(item, index) in kindList"
            :key="index"
          >{{ item.name }}</li>
        </ul>
      </div>
  
      
    <div class="dibulist">
      <p class="xuanze"></p>

      <div class="selectlist" v-for="(item, index) in classlist" :key="index">
        <router-link :to="`/article?m_id=${item.m_id}`">
          <div>
            <img :src="`${item.m_img}`" alt="" class="bikan" />
          </div>
          <div class="fd">
            <p class="biaoti">{{ item.m_title }}</p>
            <p class="yuanzhu">漫画《{{ item.m_title }}》原著</p>
            <p class="jieshao">{{ item.m_details.substr(0, 60) }}...</p>
          </div>
        </router-link>
      </div>
    </div>
    </div>

    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      kindList: [
        { name:"全部"},
        { name:"恋爱"},
        { name:"校园"},
        { name:"强剧情"},
        { name:"古风"},
        { name:"奇幻"},
        { name:"热血"},
        { name:"原创"},
        { name:"日漫"},
        { name:"韩漫"},
      ],
      activeindex: "",
      classlist: "",
      m_kind: "",
      data:''
    };
  },
  methods: {
    say($event, index) {
      //获取点击对象
      this.activeindex = index;
      console.log($event.target.innerHTML);
      let classify = $event.target.innerHTML;
      this.m_kind = classify;
      console.log(this.m_kind);
      if (this.m_kind == "全部") {
        this.m_kind = "";
      }
      this.axios.post("/page", `m_kind=${this.m_kind}`).then((res) => {
        console.log(res);
        this.classlist = res.data.data;
      });
      this.axios.post("/page", `m_kind=${this.m_kind}`).then((res) => {
        console.log(res);
        var arr = res.data.data
        var arr2 = arr
        var arr3 = arr2.slice(0,1)
        this.data = arr3
        console.log(this.data)
      });
    },
  },
  mounted() {
    this.axios.post("/page", `m_kind=${this.m_kind}`).then((res) => {
      console.log(res);
      this.classlist = res.data.data;
    });
    this.axios.post("/page", `m_kind=${this.m_kind}`).then((res) => {
        console.log(res);
        var arr = res.data.data
        var arr2 = arr
        var arr3 = arr2.slice(0,1)
        this.data = arr3
        console.log(this.data)
      });
  },
};
</script>
  


<style scoped src="../assets/css/topnumber.css">
</style>