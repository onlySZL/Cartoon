<template>
  <div>
    <div class="classifylist">
      <ul class="classify">
        <li
          @click="say($event, index)"
          :class="activeindex == index ? 'all' : ''"
          v-for="(item, index) in kindList"
          :key="index"
        >{{ item.name }}</li>
      </ul>
    </div>

    <div v-for="(item, index) in classlist" :key="index">
       <router-link :to="`/article?m_id=${item.m_id}`">
      <div class="no">
        <img :src="item.m_img" alt="" class="pic" />
        <p class="font">{{ item.m_title.substr(0, 10) }}</p>
        <p class="font">{{ item.m_kind }}</p>
      </div>
      </router-link>
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
    },
  },
  mounted() {
    this.axios.post("/page", `m_kind=${this.m_kind}`).then((res) => {
      console.log(res);
      this.classlist = res.data.data;
    });
  },
};
</script>

<style scoped src="../assets/css/classify.css">
</style>