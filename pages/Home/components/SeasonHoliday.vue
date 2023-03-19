<template>
  <div>
    <div class="home-title">
      <a
        :class="dataType == 'month' ? 'active' : ''"
        data-type="month"
        @click="changeDataType('month')"
        >当季热门度假</a
      >
      <a
        :class="dataType == 'today' ? 'active' : ''"
        data-type="today"
        @click="changeDataType('today')"
        >今日特惠度假</a
      >
    </div>

    <div
      class="holiday-cards"
      :style="{ display: [dataType == 'month' ? 'block' : 'none'] }"
    >
      <div class="holiday-card" v-for="item of monthHoliday" :key="item.id">
        <navigator url="/pages/Detail/Detail" open-type="redirect">
          <div class="holiday-top">
            <image class="holiday-img" :src="item.url" lazy-load="true"/>
            <div class="holiday-title">
              <div class="holiday-title-in">
                <p class="holiday-title-site">{{ item.titleSite }}</p>
                <p class="holiday-title-message">{{ item.titleMessage }}</p>
              </div>
            </div>
          </div>

          <div class="holiday-infor">
            <span class="holiday-name">{{ item.holidayName }}</span>
            <p class="holiday-price">
              <span>{{ item.priceUnit }}</span>
              <span>{{ item.priceNum }}</span>
            </p>
          </div>
        </navigator>
      </div>
    </div>

    <div
      class="holiday-cards"
      :style="{ display: [dataType == 'today' ? 'block' : 'none'] }"
    >
      <div class="holiday-card" v-for="item of todayHoliday" :key="item.id">
		  <navigator url="/pages/Detail/Detail" open-type="redirect">
			<div class="holiday-top">
			  <image class="holiday-img" :src="item.url" lazy-load="true"/>
			  
			</div>

			<div class="holiday-infor">
			  <span class="holiday-name">{{ item.holidayName }}</span>
			  <span class="holiday-desc">{{ item.holidayDesc }}</span>
			  <p class="holiday-price">
				<span>{{ item.priceUnit }}</span>
				<span>{{ item.priceNum }}</span>
				<span class="holiday-price-more">{{ item.priceMore }}</span>
			  </p>
			</div>
		</navigator>
		
      </div>
    </div>
  </div>
</template>

<script>
	import homeoliday from "@/api/homeHoliday.json"
//import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "SeasonHoliday",

  data() {
    return {
      dataType: "month",
      monthHoliday: homeoliday.data.monthHoliday,
      todayHoliday: homeoliday.data.todayHoliday,
      lastCity: "",
    };
  },
  computed: {
    ...mapState(["city"]), //使用mapState将state中的数据映射成为计算属性
  },
  // mounted() {
  //   // console.log("更新上一次获取的城市");
  //   this.lastCity = this.city; //执行完获取度假代码时更新上一次城市数据
  //   axios
  //     .get("/api/homeHoliday.json?city=" + this.city)
  //     .then((res) => {
  //       res = res.data;
  //       if (res.ret && res.data) {
  //         const { monthHoliday, todayHoliday } = res.data;
  //         this.monthHoliday = monthHoliday;
  //         this.todayHoliday = todayHoliday;
  //         // console.log("todayHoliday", todayHoliday);
  //       }
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // },
  // activated() {
  //   //页面重新显示时执行，router的生命周期,对于keep-alive的组件起到代替mounted的作用
  //   if (this.lastCity != this.city) {
  //     //当切换城市时，使用axios获取新的度假数据
  //     // console.log(this.lastCity);
  //     // console.log("city", this.city);
  //     this.lastCity = this.city; //执行完获取度假代码时更新上一次城市数据

  //     axios
  //       .get("/api/homeHoliday.json?city=" + this.city)
  //       .then((res) => {
  //         res = res.data;
  //         if (res.ret && res.data) {
  //           const { monthHoliday, todayHoliday } = res.data;
  //           this.monthHoliday = monthHoliday;
  //           this.todayHoliday = todayHoliday;
  //           // console.log("todayHoliday", todayHoliday);
  //         }
  //       })
  //       .catch((res) => {
  //         console.log(res);
  //       });
  //   }
  // },
  methods: {
    changeDataType(newDataType) {
      if (newDataType !== this.dataType) {
        this.dataType = newDataType;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/themeColor.less";
.home-title {
  height: 0.56rem;
  font-size: 0.25rem;
  padding-left: 0.2rem;
  a {
    margin-right: 0.12rem;
    display: inline-block;
    border: 1px solid #d7d7d7;
    font-size: 0.25rem;
    height: 0.56rem;
    line-height: 0.56rem;
    padding: 0 0.26rem;
    border-radius: 0.08rem;
    &.active {
      background-color: @bgColor;
      color: #fff;
    }
  }
}

.holiday-cards {
  width: auto;
  margin: 0.1rem 0.2rem;
  .holiday-card {
    width: 49%;
    font-size: 0.3rem;
    float: left;
    &:nth-child(2n) {
      padding-left: 2%;
    }
    .holiday-top {
      width: 100%;
      height: 2.15rem;
      overflow: hidden;
      position: relative;
      .holiday-img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
      .holiday-title {
        width: 100%;
        height: 40%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        overflow: hidden;
        .holiday-title-in {
          display: inline-block;
          height: 100%;
          padding: 0.1rem 0.44rem;
          background: rgba(0, 0, 0, 0.6);
          .holiday-title-site {
            color: #fff;
            font-size: 0.29rem;
            line-height: 0.4rem;
          }
          .holiday-title-message {
            font-size: 0.24rem;
            color: #ffde00;
            line-height: 0.31rem;
          }
        }
      }
    }

    .holiday-infor {
      width: auto;
      padding: 0.1rem;
      .holiday-name {
        display: block;
        white-space: nowrap; //设置文本不自动换行
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 0.43rem;
      }
      .holiday-desc {
        .holiday-name;
        color: #555555;
        font-size: 0.27rem;
        line-height: 0.41rem;
      }
      .holiday-price {
        color: #ff7400;
        font-size: 0.36rem;
        font-weight: 550;
        margin-top: 0.05rem;
        line-height: 0.42rem;
        .holiday-price-more {
          font-size: 0.29rem;
          font-weight: 400;
          margin-left: 0.06rem;
        }
      }
    }
  }
}
</style>
