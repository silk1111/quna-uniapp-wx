<template>
	<page-meta root-font-size="50px" style='display: block;'>
	</page-meta>
  <div>
    <Gallary
      :isGallaryShow="isGallaryShow"
      :imgIndex="imgIndex"
      @handleGallary="handleGallary"
      :swiperList="swiperList"
    ></Gallary>
    <!-- 轮播图开始 -->
    <div class="swiperWrapper">
      <swiper autoplay=true @change="changeNowIndex"
	     ref="mySwiper" style="height: 4rem;">
        <!-- 轮播的图片 -->
        <swiper-item @click="handleClickImg" v-for="item in swiperList" :key="item.id">
          <img class="swiper-img" :src="item.url" />
        </swiper-item>

      </swiper>
       <div class="swiper-bottom"><span>产品编号</span><span>3478261432784686</span></div> 
    </div>
    <!-- 轮播图结束 -->
  </div>
</template>

<script>
 import Gallary from "../Gallary/Gallary.vue";
export default {
  name: "MySwiper",

  data() {
    return {
      imgIndex: 0,
	  nowIndex: 0,
      isGallaryShow: false,
      swiperList: [
        {
          id: "0001",
          url:
            "http://n.sinaimg.cn/sinacn16/300/w1620h1080/20180317/7cc0-fyshfuq8223482.jpg",
        },
        {
          id: "0002",
          url:
            "http://n.sinaimg.cn/sinacn16/300/w1620h1080/20180317/ed9b-fyshfuq8221806.jpg",
        },
        {
          id: "0003",
          url:
            "http://n.sinaimg.cn/sinacn16/298/w1620h1078/20180317/af1a-fyshfuq8222255.jpg",
        },
      ],
    };
  },
  components: {
    Gallary,
  },
  mounted() {
  },

  methods: {
    handleClickImg(e) {
		console.log(this.nowIndex)
		this.imgIndex = this.nowIndex;
		//console.log('点击轮播图',e)
		//this.imgIndex = this.$refs.mySwiper.currentSync;//获取点击时要传给图片详情的页码
		//console.log('index',this.$refs.mySwiper.currentSync)
      this.isGallaryShow = true;
	  
    },
    handleGallary() {
      this.isGallaryShow = false;
    },
		
	changeNowIndex(event){
		this.nowIndex = event.detail.current;
	}
	
  },
};
</script>

<style lang="less" scoped>
.swiperWrapper {
  width: 100%;
  overflow: hidden;
  height: 0;
  padding-bottom: 66.66%;
  background-color: #eee;
  position: relative;
  box-sizing: border-box;
	  
  

  /deep/ .uni-swiper-dots {
		position: absolute;
		bottom: 20px ;
  }
  
  
}
.swiper-img {
	display: block;
  width: 100%;
  height: 100%;
}

uni-swiper {
	width: 100%;
	height: 66.66vw;
	
}
swiper {
	  height: 4rem;
	  min-height: 4rem;
  }
.swiper-bottom {
  z-index: 2;
  color: #fff;
  font-size: 0.26rem;
  position: absolute;
  bottom: 0.31rem;
  width: 100%;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  box-sizing: border-box;
  span {
    margin-left: 0.1rem;
  }
}
</style>
