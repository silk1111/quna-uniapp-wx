<template>
  <div class="information">
    <div class="all-price">
      <div class="price">
        <span class="normal-size orange">¥</span>
        <span class="big-size orange">4545</span>
        <span class="normal-size gray">起/人</span>
      </div>
      <div class="price">
        <span class="normal-size gray">儿童价</span>

        <span class="normal-size orange">¥</span>
        <span class="normal-size orange">4545</span>
        <span class="normal-size gray">起/人</span>
      </div>
    </div>
    <div class="name">
      <span>💎纯玩半自由行🔥丽江进出『丽江+香格里拉+束河古镇』💕网红旅拍+打卡</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInformation",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.information {
  // height: 20rem;

  z-index: 5;
  position: relative;
  top: -0.14rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  background-color: #fff;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  .all-price {
    height: 0.8rem;
    .price {
      display: inline-block;
      position: relative;
      top: -0.14rem;
      height: 0.7rem;
      margin-right: 0.2rem;
    }
    .normal-size {
      font-size: 0.3rem;
    }
    .big-size {
      font-size: 0.5rem;
      font-weight: bold;
    }
    .orange {
      color: rgb(250, 130, 9);
    }
    .gray {
      color: rgb(153, 153, 153);
    }
  }
  .name {
    margin-top: 0.1rem;
    font-size: 0.38rem;
    color: rgb(35, 35, 35);
  }
}
</style>
