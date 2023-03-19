<template>
	
  <scroll-view ref="wrapper" class="wrapper" scroll-y="true" :scroll-into-view="alphabetLetter">
    <div id="wrapper">
      <CitySearch :cities="cities" @changeAllCityShow="changeAllCityShow"></CitySearch>
      <div class="user-position" :style="{ display: [isAllCItyShow ? 'block' : 'none'] }">
        <div class="list-title">您的位置</div>
        <div class="hot-list">
          <div class="city-item">
            <a class="city-item-name active">{{ city }}</a>
          </div>
        </div>
      </div>
      <div class="hot-city" :style="{ display: [isAllCItyShow ? 'block' : 'none'] }">
        <div class="list-title">热门城市</div>
        <div class="hot-list">
          <div
            class="city-item"
            v-for="item of hotCities"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <a class="city-item-name">{{ item.name }}</a>
          </div>
        </div>
      </div>

      <div
        class="all-city-group"
        v-for="(item, key) of cities"
        :key="key"
        :ref="key"
		:id="key"
        :style="{ display: [isAllCItyShow ? 'block' : 'none'] }"
      >
        <div class="list-title">{{ key }}</div>
        <div class="all-city-list">
          <a
            class="all-city-item"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleCityClick(innerItem.name)"
            >{{ innerItem.name }}</a
          >
        </div>
      </div>
    </div>
    <CityAlphabet :cities="cities" :isAllCItyShow="isAllCItyShow"></CityAlphabet>
  </scroll-view>
</template>

<script>
import CityAlphabet from "./Alphabet.vue";
import pubsub from "pubsub-js";
import Bscroll from "better-scroll";
import CitySearch from "./Search.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CityList",
  data() {
    return {
      // cityFirstLetter: "",
      isAllCItyShow: true,
	  alphabetLetter:''
    };
  },
  computed: {
    ...mapState(["city"]), //使用mapState将state中的数据映射成为计算属性
  },

  mounted() {
    pubsub.subscribe("cityFirstLetter", (name, cityFirstLetter) => {
	this.alphabetLetter = cityFirstLetter;
    });
  },

  methods: {
    changeAllCityShow(isShow) {
      this.isAllCItyShow = isShow;
    },
    handleCityClick(cityName) {
      //this.$store.commit("changeCity", cityName);
      this.changeCity(cityName); //使用mapMutations
	  uni.navigateTo({
	  	url:'/pages/Home/Home'
	  });
    //   this.$router.push("/"); //编程式路由导航
     },
    ...mapMutations(["changeCity"]),
  },
  components: {
    CityAlphabet,
    CitySearch,
  },
  props: {
    hotCities: Array,
    cities: Object,
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";
.wrapper {
  // height: 12rem;
  position: fixed;
  top: calc(0.88rem + var(--status-bar-height));
  //让所有内容都能显示在页面中，页面总高为100%，而列表高度应该是页面总高除去头部的高度
  height: calc(100%  - 0.88rem - var(--status-bar-height));
  z-index: 1;
  width: 100%;
  background-color: #f5f5f5;
}

.list-title {
  line-height: 0.54rem;
  font-size: 0.26rem;
  color: #616161;
  padding-left: 0.3rem;
  border: 0.01rem solid #c9cccd;
  background-color: #f9f7f7;
}

.hot-list {
  z-index: 1;

  padding: 0.04rem 0.5rem 0.26rem 0.2rem;
  overflow: hidden;
  width: auto;
  .city-item {
    float: left;
    width: 33.33%;
    padding: 0.2rem 0.14rem 0 0.1rem;
    box-sizing: border-box;

    .city-item-name {
      display: block;
      border: 0.02rem solid #c9cccd;
      border-radius: 0.06rem;
      font-size: 0.28rem;
      color: #212121;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      box-sizing: border-box;

      overflow: hidden; //超出部分隐藏
      text-overflow: ellipsis; //超出部分显示为...
      white-space: nowrap; //设置文本不自动换行

      &.active {
        color: @bgColor;
        border-color: @bgColor;
      }
    }
  }
}

.all-city-list {
  width: 100%;
  background: #fff;
  z-index: 1;

  .all-city-item {
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
