<template>
  <div>
    <div class="holiday-tag">特惠度假</div>
    <SeasonHoliday></SeasonHoliday>
  </div>
</template>

<script>
import SeasonHoliday from "./SeasonHoliday.vue";
export default {
  name: "HomeHoliday",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  components: {
    SeasonHoliday,
  },
};
</script>

<style lang="less" scoped>
.holiday-tag {
  font-size: 0.36rem;
  font-weight: 700;
  margin: 0.17rem 0 0.17rem 0.3rem;
}
</style>
