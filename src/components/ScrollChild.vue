<template>
  <div class="move-tabs">
    <div class="tabs-wrapper" ref="tabsWrapper">
      <ul ref="tab">
        <li v-for="(item, index) in tabs" :key="index">
          <div class="tab-item">
            <div class="expand-block">
              {{ item.name || "" }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  props: {
    data: Array,
  },
  data() {
    return {
      tabs: [],
      mX: 0,
      tabWidth: 60,
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.data);
      this.tabs = this.data;
      this._initMenu();
    });
  },
  methods: {
    _initMenu() {
      const tabsWidth = this.tabWidth;
      const width = this.tabs.length * tabsWidth;
      this.$refs.tab.style.width = `${width}vw`;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tabsWrapper, {
            scrollX: true,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
};
</script>
<style scoped>
* {
   touch-action: none;
}
.move-tabs {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100vw;
}
.tabs-wrapper {
  height: 30vw;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
}
.tab-item {
  float: left;
  width: 40vw;
  height: 10vw;
  padding: 10vw;
  margin-right: 1vw;
  margin-left: 2vw;
  background-image: url(/images/img/ip/轮播图2.png);
  box-shadow: 0 0 4vw 0 rgba(0, 0, 0, 0.1);
  border-radius: 3vw;
  background-size: 100vw;
}
.expand-block {
  font-size: 5vw;
  font-weight: bold;
  color: #333333;
  margin-top: -8vw;
  margin-left: -8vw
}
</style>