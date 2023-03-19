<template>
  <div class="icons">
    <div
      :class="[item.type === 'up' ? 'up-icon' : 'down-icon']"
      v-for="item of icons"
      :key="item.id"
    >
      <div class="icon-img">
        <img :src="item.imgUrl" />
      </div>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import icons from  '@/api/icons.json'
export default {
  name: "HomeIcons",

  data() {
    return {
      icons: icons.data,
    };
  },

  mounted() {
 //   this.getIcons();
  },

  methods: {
    // getIcons() {
    //   axios.get("/api/icons.json").then((res) => {
    //     let { data } = res.data;
    //     console.log(data);
    //     this.icons = data;
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/themeColor.less";

.icon(@icon-height , @icon-img-height) {
  padding-bottom: @icon-height;
  width: 20%;
  margin: 0.07rem 0 0.07rem;
  height: 0;
  float: left;
  // background-color: antiquewhite;
  font-size: 0.24rem;
  color: @darkTextColor;
  text-align: center;
  .icon-img {
    width: @icon-img-height;
    height: 0;
    padding-bottom: @icon-img-height;
    overflow: hidden;
    margin: 0 auto 0.1rem;
	position: relative;
    img {
		position: absolute;
		top:0;
		left:0;
      width: 100%;
	  height: 100%;
    }
  }
}
.icons {
  overflow: hidden;
  height: 0;
  padding-bottom: 75%; //宽高比2：1
  // background-color: green;
  .up-icon {
    .icon(20%, 70%);
  }
  .down-icon {
    .icon(15%, 50%);
  }
}
</style>
