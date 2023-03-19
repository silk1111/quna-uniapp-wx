<template>
  <div class="detail-footer">
    <div class="left-tag">
      <div class="iconfont customer">&#xe605;</div>
      <span class="tag-name">客服</span>
    </div>
    <div class="left-tag">
      <div class="iconfont">&#xe617;</div>
      <span class="tag-name">收藏</span>
    </div>
    <div class="left-tag">
      <div class="iconfont">&#xe602;</div>
      <span class="tag-name">店铺</span>
    </div>
    <button class="right-button orange">加入</button>
    <button class="right-button more-orange">立即</button>
  </div>
</template>

<script>
export default {
  name: "DetailFooter",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import "@/assets/styles/themeColor.less";

.detail-footer {
  z-index: 10;
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 0;
  height: @footerHeight;
  background-color: #fff;
  .left-tag {
    width: 13.33%;
    height: @footerHeight;
    line-height: @footerHeight;
    font-size: 0.24rem;

    .iconfont {
      padding-top: 0.1rem;

      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.4rem;
      &.customer {
        color: @bgColor;
      }
    }
    .tag-name {
      display: block;
      font-size: 0.24rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      padding-bottom: 0.1rem;
    }
  }
  .right-button {
    width: 28%;
    height: 90%;
    margin: 0.05rem 1%;
    font-size: 0.28rem;
    border: none;
    border-radius: 0.1rem;
    color: #fff;
    box-sizing: border-box;
    &.orange {
      background-color: orange;
    }
    &.more-orange {
      background-color: rgb(255, 107, 25);
    }
  }
}
</style>
