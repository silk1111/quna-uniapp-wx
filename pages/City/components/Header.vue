<template>
	<view class="city-header-wrapper">
		<view class="stateHeight"></view>
		
		 <div class="city-header">
	<navigator url="/pages/Home/Home" open-type="redirect">
		<span class="iconfont return">&#xe600;</span>
	</navigator>

    <div class="city-header-title">境内 境外港澳台</div>
  </div>
		
	</view>
 
</template>

<script>
export default {
  name: "CityHeader",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";
.stateHeight {
	width: 100%;
	height: var(--status-bar-height);
}
.city-header {
  height: @headerHeight;
  width: 100%;
  background-color: @bgColor;
  font-size: 0.36rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  z-index: 10;
  .return {
    display: inline-block;
    color: #fff;
    line-height: @headerHeight;
    width: 0.4rem;
    font-size: 0.36rem;
    padding-left: 0.22rem;
    font-weight: 600;
  }
  .city-header-title {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: @headerHeight;
    color: #fff;
    text-align: center;
  }
}
</style>
