<template>
  <div
    class="container"
    :style="{ display: [isGallaryShow ? 'flex' : 'none'] }"
    @click="handleGallary"
  >
  <text>$attrs.isGallaryShow</text>
    <div class="wrapper">
      <!-- 轮播图开始 -->
	  <swiper :current="galleryIndex" ref="gallary" @change="changeIndex" style="height: 4rem;">
	    <!-- 轮播的图片 -->
	    <swiper-item v-for="item in swiperList" :key="item.id">
	      <img class="swiper-img" :src="item.url" />
	    </swiper-item>
	  
	  </swiper>
      <!-- 轮播图结束 -->
	  <div class="img-index">
		  <span>{{galleryIndex + 1}}</span>
		  <span>/</span>
		  <span>{{swiperList.length}}</span>
	  </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
//import "swiper/swiper.css"
// /*eslint-disable*/
export default {
  name: "Gallary",

  data() {
    return {
		galleryIndex: this.imgIndex//设置图片详情的页码，因为用户会翻页，因此不能与轮播图完全同步，只能同步最初进入时的页码
    };
  },
  props: {
    isGallaryShow: Boolean,
    imgIndex: Number,
    swiperList: Array,
  },
  mounted() {
  },
  updated() {
  },
  
  methods: {
		  
	  changeIndex (event){
		  this.galleryIndex = event.detail.current;
	  },
		  
	  handleGallary(){
		  this.$emit('handleGallary');
	  }
  },
};
</script>

<style lang="less" scoped>
.container {
  z-index: 20;
  position: fixed;
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  .wrapper {
    background-color: #000;
	
   uni-swiper {
   	width: 100%;
   	height: 66.66vw;
   	
   }
.swiper-img {
   		display: block;
   	  width: 100%;
   	  height: 100%;
   	}
	   
   .img-index {
	   background-color: #000;
	   height: .4rem;
	   font-size: .3rem;
	   color: #fff;
	   padding-top: .5rem;
	   text-align: center;
	  
	   
		   
	   span {
		 
	   }
   }
  }
}
</style>
