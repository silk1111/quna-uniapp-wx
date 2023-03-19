<template>
	<page-meta root-font-size="50px" style='display: block;'>
	</page-meta>
  <div>
	  
    <HomeHeader></HomeHeader>
    <!-- <HommeSwiper ></HommeSwiper> -->
    <HommeIcons></HommeIcons>
    <HomeHoliday></HomeHoliday>
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue";
// import HommeSwiper from './components/Swiper.vue'
import HommeIcons from "./components/Icons.vue";
import HomeHoliday from "./components/Holiday.vue";
/* eslint-disable */
export default {
  name: "Home",

  data() {
    return {};
  },
  methods: {},
  components: {
    HomeHeader,
    // HommeSwiper,
    HommeIcons,
    HomeHoliday,
  },
  mounted() {
  },
};
</script>

<style scoped></style>
