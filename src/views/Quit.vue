<template>
  <div>
    <div>
      <van-cell title="相关许可证" is-link class="zt" />
      <van-cell title="问题反馈" is-link class="zt" />
    </div>
    <div v-if="$store.state.islogin">
      <el-row>
        <el-button @click="choose" type="primary" size="medium" class="quit"
          >退出登录</el-button
        >
      </el-row>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  methods: {
    choose() {
      sessionStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.van-cell__title {
  font-size: 5vw;
}
.van-icon {
  height: 8vw;
}
.quit {
  width: 90vw;
  height: 10vw;
  margin-top: 130vw;
  text-align: center;
  font-size: 4.5vw;
  margin-left: 5.5vw;
  border-radius: 5vw;
}
</style>