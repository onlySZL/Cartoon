<template>
  <div>
    <div class="guding">
      <div>
        <img src="/images/img/Home/logo2.png" alt="" class="logo" />
      </div>
      <router-link to="/select">
      <input :disabled='true' type="text" class="login" placeholder="请输入您要查询的内容" />
      </router-link>
    </div>
    <!-- 轮播图 -->
    <mt-swipe class="lunbo" :style="{ height: h }">
      <mt-swipe-item>
        <img src="/images/img/Home/轮播图8.png" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/img/Home/轮播图7.png" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/img/Home/轮播图4.png" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/img/Home/轮播图10.png" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/img/Home/轮播图5.png" alt="" />
      </mt-swipe-item>
    </mt-swipe>

    <div class="eight">
      <div>
        <router-link to="/classify">
          <div class="one">
            <div class="img">
              <img src="../assets/common/作品分类.png" alt="" />
            </div>
            <p class="fenlei">作品分类</p>
          </div>
        </router-link>
      </div>
      <div>
      <router-link to="/topnumber">
      <div class="two">
        <div class="img">
          <img src="../assets/common/排行榜.png" alt="" />
        </div>
        <p class="topnumber">排行榜</p>
      </div>
    </router-link>
  </div>
      <div class="three">
        <div class="img">
          <img src="../assets/common/会员中心.png" alt="" />
        </div>
        <p>嗨Fun</p>
      </div>
      <div class="four">
        <div class="img">
          <img src="../assets/common/签到福利.png" alt="" />
        </div>
        <p>签到福利</p>
      </div>
    </div>

    <div class="oooo">
      <div class="lunbo">
        <img src="/images/img/Home/1.1.png" alt="" class="oneone" />

        <div class="bjys">
          <div class="bjysone">私享定制分类</div>
          <div>
            <ul class="twotwo">
              <li>为你推荐</li>
              <li>校园</li>
              <li>强剧情</li>
              <li>古风</li>
              <li>奇幻</li>
              <li>原创</li>
            </ul>
          </div>
          <div class="fourfour">
            <div>
              <img src="/images/img/Home/2.3.png" alt="" class="trtr" />
              <p class="font">热血 剧情</p>
              <p class="hou">缚龙为后</p>
              <p class="guanzhu">1024万关注</p>
            </div>
            <div>
              <img src="/images/img/Home/2.4.png" alt="" class="trtr" />
              <p class="font">剧情 玄幻</p>
              <p class="hou">再度与你</p>
              <p class="guanzhu">720万关注</p>
            </div>
            <div>
              <img src="/images/img/Home/2.5.png" alt="" class="trtr" />
              <p class="font">惊悚 古风</p>
              <p class="hou">我能复制天赋</p>
              <p class="guanzhu">320万关注</p>
            </div>

            <div>
              <img src="/images/img/Home/2.6.png" alt="" class="trtr" />
              <p class="font">惊悚 玄幻</p>
              <p class="hou">孤王寡女</p>
              <p class="guanzhu">1048万关注</p>
            </div>
            <div>
              <img src="/images/img/Home/2.7.png" alt="" class="trtr" />
              <p class="font">悬疑 玄幻</p>
              <p class="hou">魔道祖师</p>
              <p class="guanzhu">420万关注</p>
            </div>
            <div>
              <img src="/images/img/Home/2.8.png" alt="" class="trtr" />
              <p class="font">恋爱 奇幻</p>
              <p class="hou">欺星客栈</p>
              <p class="guanzhu">640万关注</p>
            </div>
          </div>
          <div class="look">
            <button class="cat">查看更多</button>
            <button>换一换</button>
          </div>
        </div>
      </div>
    </div>
    <div class="guanggao">
      <img src="/images/img/Home/星期五.png" alt="" class="firday" />
    </div>

    <div class="guanggao">
      <h1 class="remen">近期热门</h1>
      <div class="liebiao">
        <div>
          <img src="/images/img/Home/列表3.png" alt="" class="jinqi" />
          <p class="fontt">21万关注</p>
          <p class="fuzhii">恶役王女</p>
          <p class="guanzhu">复仇盛宴 华丽开幕</p>
        </div>
        <div>
          <img src="/images/img/Home/列表4.png" alt="" class="jinqi" />
          <p class="fontt">12万关注</p>
          <p class="fuzhii">契约者们</p>
          <p class="guanzhu">小神父x冷酷侦探</p>
        </div>
        <div>
          <img src="/images/img/Home/列表1.png" alt="" class="jinqi" />
          <p class="fontt">21万关注</p>
          <p class="fuzhii">非友人关系</p>
          <p class="guanzhu">傲娇精英x邪魅乐手</p>
        </div>
        <div>
          <img src="/images/img/Home/列表2.png" alt="" class="jinqi" />
          <p class="fontt">11万关注</p>
          <p class="fuzhii">元帅们同时闹离婚</p>
          <p class="guanzhu">百变军师x戏精元帅</p>
        </div>
      </div>
      <div class="lookk">
        <button>查看更多</button>
        <button>换一换</button>
      </div>
    </div>

    <div class="dibulist">
      <p class="xuanze">入站精选必看</p>

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
      data: [], //渲染分类列表
      selected: "faxian", //指定底部选项卡默认选中项id
      h: "60vw", //轮播图的默认高度
    };
  },
  methods: {
    checklist() {
      this.axios.get("/classify").then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
  },
  mounted() {
    this.checklist(); //初始化列表
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
      if (newValue == "shujia") {
        //用户点了底部选项:书架
        this.$router.push("/book");
      }
      this.selected = "faxian";
    },
  },
};
</script>

<style scoped src="../assets/css/home.css">
</style>