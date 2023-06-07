<template>
  <div>
    <div id="app">
      <h1>最新 最热</h1>
      <div>
        <!-- .trim去除内容中的空格 -->
        <!-- v-model绑定表单的(uname)值 -->
        <textarea
          rows="2"
          cols="23"
          placeholder="评论内容"
          v-model.trim="tarea"
          @keyup.enter="sendCont"
        ></textarea
        ><br />
        <!-- @click="",设置点击事件 -->
        <button class="send" @click="sendCont">发表</button>

        <!-- 遍历list数据 -->
        <div class="cont" v-for="val in list" :key="val.item">
          <div>
            <img :src="$store.state.pic" alt="" class="touxiang" />
            <div class="name">{{ $store.state.name }}说:</div>
            <p class="name2">{{ val.item }}</p>
            <p class="del" @click="delCont(val)">删除</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "", item: "这部漫画真不错" },
        { name: "", item: "下次继续看" },
      ],
      tarea: "",
    };
  },
  methods: {
    // "发表"按钮的点击事件
    sendCont() {
      // 创建一项清单
      var item = { name: this.uname, item: this.tarea };
      // 在list的前面添加item
      this.list.push(item);
      // 用户框，内容框清空
      this.uname = "";
      this.tarea = "";
    },
    // 评论最后的"删除"事件
    delCont(val) {
       this.$toast("删除成功");
      // 查找val在list下标
      // value遍历的元素 当value的item/name值等于val的item/name值
      var ind = this.list.findIndex((value) => value.item === val.item);
      // 删除list第ind个
      this.list.splice(ind, 1);
    },
  },
};
</script>

<style  scoped src="../assets/css/comment.css">
</style>