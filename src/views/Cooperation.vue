<template>
  <div>
    <div>
      <img :src="data.i_img" alt="" class="bjtp" />
    </div>
    <div class="js">
      <p>{{ data.i_title }}</p>
      <ul>
        <li>26.85人气值 | 11万总评论 | 159万关注</li>
      </ul>
    </div>
    <div class="guanzhu">
      <button @click="like" :color="likeColor" class="you">关注</button>
    </div>
    <div>
      <p class="qi">{{ data.i_kind }}</p>
    </div>
    <div>
      <p class="details">{{ data.i_remark }}</p>
    </div>
    <div class="jianjie">
      <p class="xuanji">漫画选集</p>
      <p class="jishu">已更19集</p>
      <router-link to="/comment"><p class="pinlun">评论></p></router-link>

      <scroll-child :data="scrollList" />
    </div>
    <div>
      <p class="title">看完(({{ data.i_title }}))的还会看</p>
    </div>
    <div class="look">
      <ul>
        <li>
          <img src="/images/img/Home/1.4.png" alt="" class="bjtp2" />
          <p>默示录</p>
        </li>
        <li>
          <img src="/images/img/Home/1.5.png" alt="" class="bjtp2" />
          <p>秋风拂过</p>
        </li>
        <li>
          <img src="/images/img/Home/1.6.png" alt="" class="bjtp2" />
          <p>画具</p>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="top">
        <p class="first">{{ data.i_title }}</p>
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
      data: "",
      ifLike: false,
      i_id: "",
      likeColor: "black",
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
      let i_id = this.$route.query.i_id;
      this.i_id = i_id;
      this.axios.get(`/cooperation?i_id=${i_id}`).then((res) => {
        console.log(res);
        this.data = res.data.result;
        console.log(this.data);
        Object.keys(this.data).forEach((item) => {
          if (item.id == this.i_id) {
            this.likeColor = "red";
            this.ifLike = true;
          }
        });
      });
    },
    like() {
      if (this.ifLike === false) {
        this.axios
          .post(
            "/love",
            `i_id=${this.data.i_id}&i_img=${this.data.i_img}&i_title=${this.data.i_title}&i_kind=${this.data.i_kind}&i_remark=${this.data.i_remark}`
          )
          .then((res) => {
            if (res.data.code === 1) {
              this.likeColor = "red";
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

<style  scoped  src="../assets/css/article.css">
</style>