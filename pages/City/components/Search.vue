<template>
  <div>
    <div class="search">
      <input
        class="search-input"
        type="text"
        :placeholder="isChecked != false ? '' : '输入城市名或拼音'"
        :style="{ textAlign: [isChecked == true ? 'left' : 'center'] }"
        v-on:focus="changeCheckedTrue"
        v-on:blur="changeCheckedFalse"
        v-model="keyWord"
      />
    </div>
    <div class="search-content" v-if="keyWord">
      <a
        class="search-content-item"
        v-for="item of list"
        :key="item.id"
        @click="handleCityClick(item.name)"
        >{{ item.name }}</a
      >
      <!-- 实现搜索框有内容并且无对应查询结果时提示 -->
      <a class="search-content-item" v-if="isNoData">无搜索匹配城市</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "CitySearch",

  data() {
    return {
      isChecked: false,
      keyWord: "",
      list: [],
      timer: null,
    };
  },
  props: {
    cities: Object,
  },
  computed: {
    isNoData() {
      return !this.list.length && this.keyWord;
    },
  },
  watch: {
    keyWord() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const result = [];
        if (!this.keyWord) {
          this.list = result; //为空时返回空
          //仿官网逻辑，实现跨组件通信，原项目逻辑是使用绝对定位覆盖原城市选择页面内容，而官网逻辑是控制原内容是否显示
          this.$emit('changeAllCityShow',true) //显示城市选择页面内容
          return;
        }
        for (let item in this.cities) {
          for (let innerItem of this.cities[item]) {
            if (
              innerItem.spell.indexOf(this.keyWord) > -1 ||
              innerItem.name.indexOf(this.keyWord) > -1
            ) {
              result.push(innerItem);
            }
          }
        }
        this.$emit('changeAllCityShow',false); //隐藏城市选择页面内容
        this.list = result; //不为空时返回查询结果
      }, 100);
    },
  },
  mounted() {},

  methods: {
    changeCheckedTrue() {
      this.isChecked = true;
    },
    changeCheckedFalse() {
      this.isChecked = false;
    },
    handleCityClick(cityName) {
      //this.$store.commit("changeCity", cityName);
      this.changeCity(cityName); //使用mapMutations
	  uni.navigateTo({
	  	url:'/pages/Home/Home'
	  })
    },
    ...mapMutations(["changeCity"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";

.search {
  background-color: @bgColor;
  padding: 0 0.2rem 0.1rem 0.2rem;
  font-size: 0.26rem;
  // margin-top: 0.88rem;
  z-index: 10;

  .search-input {
    z-index: 10;
	background-color: #fff;
    display: block;
    width: 100%;
	min-height: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    padding: 0.16rem 0 0.16rem 0.1rem;
    border: none;
    border-radius: 0.1rem;
    font-weight: 300;
    font-family: "宋体", "楷体_GB2312";
    outline: none;
  }
}
.search-content {
  width: 100%;
  background: #fff;
  z-index: 1;
  .search-content-item {
    display: block;
    border: 0.01rem solid #c9cccd;
    border-top: none;
    line-height: 0.76rem;
    font-size: 0.28rem;
    color: #212121;
    padding-left: 0.2rem;
  }
}
</style>
