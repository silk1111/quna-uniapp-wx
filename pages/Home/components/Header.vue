<template>
	<view class="header-wrapper">
		<view class="stateHeight"></view>
			
		<div class="header">
			  
		  <div class="header-left">
		    <i class="iconfont">&#xe600;</i>
		  </div>
		  <!-- <div class="header-input">
		    <i class="iconfont">&#xe601;</i>
		    输入景点/城市/游玩/主题
		  </div> -->
			<navigator url="/pages/City/City" open-type="redirect">
				  <div class="header-right">
				    <text>{{ city }}</text><icon class="iconfont">&#xe60a;</icon>
				  </div>
			</navigator>
		  
		</div>
		
		
	</view>
	
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeHeader",

  data() {
    return {
	};
  },
  computed: {
    ...mapState(['city']), //使用mapState将state中的数据映射成为计算属性
  },

  mounted() {
  },

  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";
	
.stateHeight {
	width: 100%;
	height: var(--status-bar-height);
}

.header {
  height: @headerHeight;
  line-height: @headerHeight;
  display: flex;
  background: @bgColor;
  color: #fff;
  font-size: 12px;
  .header-left {
    width: 0.64rem;
    float: left;
    text-align: center;
    .iconfont {
      font-size: 0.4rem;
    }
  }

  .header-input {
    flex: 1;
    background: #fff;
    border-radius: 0.1rem;
    height: 0.64rem;
    line-height: 0.64rem;
    margin: 0.12rem;
    padding-left: 0.2rem;
    color: #ccc;
    text-align: left;
  }

  .header-right {
    min-width: 1.04rem;
    max-width: 3rem;
    padding: 0 0.1rem;
    float: right;
    text-align: center;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
		
	
    .iconfont {
      font-size: 0.24rem;
    }
  }
}
</style>
