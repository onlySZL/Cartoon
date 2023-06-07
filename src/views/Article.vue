<template>
  <div>
    <div>
      <img :src="data.m_img" alt="" class="bjtp" />
    </div>
    <div class="js">
      <p>{{ data.m_title }}</p>
      <ul>
        <li>26.85人气值 | 11万总评论 | 159万关注</li>
      </ul>
    </div>
    <div class="guanzhu">
      <button
        @click="like"
        :style="{ color: likeColor }"
        v-html="text"
        class="you"
      ></button>
    </div>
    <div>
      <p class="qi">{{ data.m_kind }}</p>
    </div>
    <div>
      <p class="details">{{ data.m_details }}</p>
    </div>
    <div class="jianjie">
      <p class="xuanji">漫画选集</p>
      <p class="jishu">已更19集</p>
      <router-link to="/comment"><p class="pinlun">评论></p></router-link>
      <scroll-child :data="scrollList" />
    </div>
    <div>
      <p class="title">看完(({{ data.m_title }}))的还会看</p>
    </div>
    <div class="look">
      <ul>
        <li>
          <img src="/images/img/Home/1.1.png" alt="" class="bjtp2" />
          <p>默示录</p>
        </li>
        <li>
          <img src="/images/img/Home/1.2.png" alt="" class="bjtp2" />
          <p>秋风拂过</p>
        </li>
        <li>
          <img src="/images/img/Home/1.3.png" alt="" class="bjtp2" />
          <p>画具</p>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="top">
        <p class="first">{{ data.m_title }}</p>
        <button>开始阅读</button>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollChild from "../components/ScrollChild.vue";
export default {
  components: { ScrollChild },
  data() {
    return {
      ifLike: false,
      likeColor: "",
      data: "",
      m_id: "",
      text: "",
      token: "",
      scrollList: [
        { name: "第一话" },
        { name: "第二话" },
        { name: "第三话" },
        { name: "第四话" },
        { name: "第五话" },
        { name: "第六话" },
        { name: "第七话" },
        { name: "第八话" },
        { name: "第九话" },
        { name: "第十话" },
        { name: "第十一话" },
        { name: "第十二话" },
        { name: "第十三话" },
        { name: "第十四话" },
        { name: "第十五话" },
        { name: "第十六话" },
        { name: "第十七话" },
        { name: "第十八话" },
        { name: "第十九话" },
        { name: "第二十话" },
      ],
    };
  },
  methods: {
    getData() {
      window.scrollTo(0, 0);
      let m_id = this.$route.query.m_id;
      this.m_id = m_id;
      this.axios.get(`/detail?m_id=${m_id}`).then((res) => {
        console.log(res);
        this.data = res.data.result;
        this.text = "关注";
      });
      this.axios.get(`/true?m_id=${m_id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          this.likeColor = "red";
          this.text = "已关注";
          this.ifLike = true;
        }
      });
    },
    like() {
      if (this.ifLike === false) {
        this.axios
          .post(
            "/like",
            `m_id=${this.data.m_id}&m_img=${this.data.m_img}&m_title=${this.data.m_title}&m_kind=${this.data.m_kind}&m_remark=${this.data.m_remark}&m_details=${this.data.m_details}`
          )
          .then((res) => {
            if (res.data.code === 1) {
              this.likeColor = "red";
              this.text = "已关注";
              this.ifLike = true;
              this.$toast("关注成功");
            }
          });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style  scoped src="../assets/css/article.css">
</style>