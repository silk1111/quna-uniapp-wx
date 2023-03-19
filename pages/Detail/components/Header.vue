<template>
  <div>
    <div :class="[isHeaderFull ? 'detail-header-full' : 'detail-header-simple']">
      
	  <navigator url="/pages/Home/Home" open-type="redirect">
		   <div class="header-left header-icon">
          <i class="iconfont">&#xe600;</i>
        </div>
		  
	  </navigator>
       

      <div class="header-right header-icon">
        <i class="iconfont">&#xe708;</i>
      </div>
      <div class="header-right header-icon">
        <i class="iconfont">&#xe62d;</i>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "detailHeader",

  data() {
    return {};
  },
  props: {
    isHeaderFull: Boolean,
	scrollDistance:Number
  },
  mounted() {},

  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
@import "@/assets/styles/themeColor.less";
.detail-header() {
  height: @headerHeight;
  line-height: @headerHeight;
  position: fixed;
  width: 100%;
  z-index: 10;
  .header-icon() {
    height: @headerHeight;
    line-height: @headerHeight;
    width: 0.88rem;
    text-align: center;
    font-size: 0.5rem;
    color: #fff;

    .iconfont {
      font-size: 0.5rem;
    }
  }
  .header-left {
    .header-icon;

    float: left;
  }
  .header-right {
    .header-icon;
    float: right;
    margin-left: 0.2rem;
  }
}
.detail-header-simple {
  .detail-header;
  .header-icon {
    background-color: rgba(56, 57, 57, 0.9);
    border-radius: 0.44rem;
  }
}

.detail-header-full {
  .detail-header;
  background-color: @bgColor;
}
</style>
