<template>
   <!-- <div
      class="alphabet-item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      v-on:click="handleLetterClick"
      @touchstart="handlleTouchStart"
      @touchmove="handlleTouchMove"
      @touchend="handlleTouchEnd"
    >
      {{ item }}
    </div> -->
	<view class="alphabet" :style="{ display: [isAllCItyShow ? 'block' : 'none'] }"
	 @touchstart.prevent="handlleTouchStart"  @touchmove="handlleTouchMove"  @touchend="handlleTouchEnd">
	    <view class="alphabet-item" v-for="item of letters" :key="item" :id="item" @click="handleLetterClick">
			{{item}}
		</view>
	</view>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "CityAlphabet",

  data() {
    return {
      touchStatus: false,
      timer: null,
      nowLetter: "", 
    };
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    },
  },
  mounted() {},

  methods: {
    handleLetterClick(e) {
      this.nowLetter = e.target.id;
      pubsub.publish("cityFirstLetter", this.nowLetter);
    },
    handlleTouchStart(e) {
      this.touchStatus = true; //标记正在滑动
      //实现在按下还未拖动时，首字母就已改变
      const moveY = e.touches[0].clientY - 238;
      const movenum = Math.floor(moveY / 16);
      this.nowLetter = this.letters[movenum];
      pubsub.publish("cityFirstLetter", this.nowLetter);
    },
    handlleTouchMove(e) {
      if (this.touchStatus) {
        //if (this.timer) clearTimeout(this.timer);
			
		//节流
		if(!this.timer){
			this.timer = setTimeout(() => {
			    //提高效率
			    const moveY = e.touches[0].clientY - 238;//获取当前滑动的元素相对于字母表顶部的位置
			    const movenum = Math.floor(moveY / 16);//根据高度计算当前位于哪个字母，注意由于是数组所以要取floor
			    if (
			      this.nowLetter != this.letters[movenum] && //首字母只在修改时触发
			      0 <= movenum && //防止超出数组范围
			      movenum < this.letters.length
			    ) {
			      this.nowLetter = this.letters[movenum];
			      pubsub.publish("cityFirstLetter", this.nowLetter);
			    }
			    if (this.nowLetter != this.letters[movenum] && movenum < 0 && movenum >= -1) {
			      //提高效率且划过头时返回首页
						console.log("return header")
			      this.nowLetter = this.letters[movenum];
			      pubsub.publish("cityFirstLetter", "wrapper");
			    }
				this.timer = null;
			  }, 50);
			}
		}
        
    },
    handlleTouchEnd() {
      this.touchStatus = false;
    },
  },
  props: {
    cities: Object,
    isAllCItyShow: Boolean,
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";

.alphabet {
  position: fixed;
  top: 4.76rem;
  right: .1rem;
  z-index: 10;
  //float: right;
  width: .52rem;
  .alphabet-item {
    color: @bgColor;
    font-size: 0.24rem;
    width: 0.32rem;
    line-height: 0.32rem;
    padding-left: 0.2rem;
    text-align: center;
  }
}
</style>
