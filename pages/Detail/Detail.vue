<template>
	<page-meta root-font-size="50px" style='display: block;'>
	</page-meta>
  <div class="detailWrapper">
    <Header :isHeaderFull="isHeaderFull" :scrollDistance="scrollDistance"></Header>
	<scroll-view scroll-y="true" @scroll="scrollEvent" :scroll-top="scrollDistance" class="detailWrapper">
		<Swiper  style="height: 4.05rem;"></Swiper>
    <Information></Information>
	<DivContent  :scrollDistance="scrollDistance" @changeScrollTop="changeScrollTop"></DivContent>
<!--    <Content :scrollDistance="scrollDistance" :changeScrollTop="changeScrollTop"></Content>
 -->		
	</scroll-view>
	<Footer></Footer>
		
		
    
  </div>
</template>

<script>
/* eslint-disable */
import Swiper from "../../common/Swiper/Swiper.vue";
import Header from "./components/Header.vue";
import Information from "./components/Information.vue";
import Footer from "./components/Footer.vue";
import DivContent from './components/DivContent.vue'
export default {
  name: "Detail",

  data() {
    return {
      isHeaderFull: false,
	  scrollDistance:0
    };
  },
	

  mounted() {
    //window.addEventListener("scroll", this.scrollEvent);
  },
  methods: {
    scrollEvent(event) {
		//let timer = null;
		//console.log('event',event)
		//console.log('滑动改变scrollDistance',event.detail.scrollTop)
			this.scrollDistance = event.detail.scrollTop;//距离顶部的滑动距离
						
				if (event.detail.scrollTop > 44 && !this.isHeaderFull) {
				  this.isHeaderFull = true;
				  console.log("显示全部顶部栏");
				} else if (event.detail.scrollTop < 44 && this.isHeaderFull) {
				  this.isHeaderFull = false;
				  console.log("显示部分顶部栏");
				}
		
		
	  
	  
    },
	changeScrollTop(newScrollTop){
		//当用户点击导航栏时，跳转滑动页面内容到对应位置
		//console.log('接收div详情内容的滚动位置',newScrollTop)
		
		this.scrollDistance = newScrollTop;
		//console.log('当前scrollDistance为',this.scrollDistance)
	}
  },
  components: {
    Header,
    Swiper,
    Information,
    Footer,
	DivContent
  },
};
</script>

<style lang="less" scoped>
	.detailWrapper {
		height: 100vh;
		min-height: 100vh;
	}
</style>
