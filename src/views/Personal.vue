<template>
  <div>
    <div class="bj">
      <img src="/images/img/login/bjbj.png" alt="" class="bj" />
    </div>
    <div v-if="$store.state.islogin">
      <img :src="$store.state.pic" alt="" class="user2" />
      <p class="come">欢迎:{{ $store.state.name }}</p>
    </div>
    <div v-else>
      <img src="/images/img/login/avatar-default.png" alt="" class="user" />
      <p class="come">请先登录！</p>
    </div>
    <div>
      <img src="/images/img/login/男.png" alt="" class="boy" />
    </div>
    <div>
      <img src="/images/img/login/王冠.png" alt="" class="king" />
    </div>
    <div class="xuan">戳这里,添加我的人设标签</div>
    <div class="jieshao">木有简介,可能在世界角落游荡</div>
    <div>
        <ul class="guanzhu">
            <li>9关注</li>
            <li>0粉丝</li>
            <li>0获赞</li>
        </ul>
    </div>
    <div class="zi">
        <router-link to="/myself">
        <button class="ziliao">编辑资料</button>
        </router-link>
    </div>
    <div>
        <img src="/images/img/login/名片.png" class="card" alt="">
    </div>
    <div>
        <img src="/images/img/login/其它.png" class="qita" alt="">
    </div>
    <div>
        <ul class="gengxin">
            <li>更新</li>
            <li>赞过</li>
            <li>收藏</li>
        </ul>
    </div>
    <div>
        <img src="/images/img/login/nothing.png" alt="" class="bjtp">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped src="../assets/css/personal.css">
</style>