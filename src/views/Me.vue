<template>
  <div>
    <div class="yidong">
      <div class="huan">
        <div class="login2" v-if="$store.state.islogin">
          <div class="gogo2">欢迎:{{ $store.state.name }}</div>
          <img
            :src="$store.state.pic"
            alt=""
            class="touxiang"
          />
        </div>

        <div v-else class="login">
          <div class="gogo2">
            <router-link to="/login" class="gogo">登录</router-link>
          </div>
          <img
            src="images/img/login/avatar-default.png"
            alt=""
            class="touxiang2"
          />
        </div>

        <div class="msg3">
          <div class="msg"><router-link to="/personal" class="people">查看个人主页并编辑简介</router-link></div>
          <div class="msg2">0粉丝 0发帖 0获赞</div>
          
        </div>
      </div>
    </div>

    <div class="yidongg">
      <div class="through">
        <div class="five">
          <div class="ten">
            <img src="images/img/login/浏览历史.png" alt="" class="hiss" />
          </div>
          <p class="oneo">浏览历史</p>
        </div>

        <div class="six">
          <div class="ten">
            <img src="images/img/login/book_0.png" alt="" class="his" />
          </div>
          <p class="twoo">我的书架</p>
        </div>

        <div class="seven">
          <div class="ten">
            <img src="images/img/login/我的关注.png" alt="" class="his" />
          </div>
          <p class="threee">我的关注</p>
        </div>

        <div class="eight">
          <div class="ten">
            <img src="images/img/login/钱包.png" alt="" class="his" />
          </div>
          <p class="fourr">我的钱包</p>
        </div>
      </div>

      <div class="mecard">
        <div class="sixsix">
          <div>
            <div class="one">快看vip</div>
          </div>
          <div class="two">
            <div class="money">
              开通会员每日领kk币
              <img src="images/img/login/皇冠.png" alt="" class="king" />
            </div>
          </div>
        </div>

        <div class="boot">
          <div class="shop">
            <div class="three">
              <div class="el-icon-price-tag">快看卡片</div>
            </div>
            <div class="four">
              <div class="card">解锁漫画独家卡片</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-shopping-cart-1">快看商城</div>
            </div>
            <div class="four">
              <div class="card">新年伊始 好物上新</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-mouse">游戏中心</div>
            </div>
            <div class="four">
              <div class="card2">国风恋爱新游</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-picture-outline">创作中心</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-thumb">免流服务</div>
            </div>
            <div class="four">
              <div class="card2">漫画免费任性看</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-position">青少年模式</div>
            </div>
            <div class="four">
              <div class="card3">未开启</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-service">帮助中心</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-setting">设置</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-turn-off">切换男女版</div>
            </div>
            <div class="four">
              <div class="card">发现不同的内容</div>
            </div>
          </div>
          <div class="shop">
            <div class="three">
              <div class="el-icon-warning-outline">关于快看</div>
            </div>
          </div>
        </div>
      </div>
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
      selected: "me", //指定底部选项卡默认选中项id
    };
  },
  methods: {
    choose() {
      sessionStorage.removeItem("name");
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    },
  },
  created: function () {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue == "faxian") {
        //用户点了底部选项:发现
        this.$router.push("/");
      }
      if (newValue == "tuijian") {
        //用户点了底部选项:推荐
        this.$router.push("/recom");
      }
      if (newValue == "shujia") {
        //用户点了底部选项:书架
        this.$router.push("/book");
      }
      this.selected = "me";
    },
  },
};
</script>

<style scoped src="../assets/css/me.css"></style>
<style>
</style>