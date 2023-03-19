<template>
	<div class="content-wrapper">
    <div :class="'content-header ' + [isHeaderTop ? 'header-top' : '']" ref="header">
      <div :class="'choose-tag ' + [partIndex == 0 ? 'active' : '']" @click="toPart(0)">
        线路特色
      </div>
      <div :class="'choose-tag ' + [partIndex == 1 ? 'active' : '']" @click="toPart(1)">
        5日行程
      </div>
      <div :class="'choose-tag ' + [partIndex == 2 ? 'active' : '']" @click="toPart(2)">
        费用说明
      </div>
      <div :class="'choose-tag ' + [partIndex == 3 ? 'active' : '']" @click="toPart(3)">
        预订须知
      </div>
    </div>
    <div :class="'content-part ' + [isHeaderTop ? 'content-all' : '']">
      <div :class="'part-detail ' + [partIndex == 0 ? 'active' : '']" ref="0">
        <img src="@/assets/detail-img/21eb9feaaedb3693a489ea3c55840f2.jpg" />
        <img src="@/assets/detail-img/e92b71fcecaee35548467f2e02d7e44.jpg" />
      </div>

      <div :class="'part-detail ' + [partIndex == 1 ? 'active' : '']" ref="1">
        <h2>第1天丽江</h2>
        <h2>第1天丽江</h2>
        <h2>第1天丽江</h2>
        <h2>第1天丽江</h2>
        <h2>第1天丽江</h2>
      </div>
      <div :class="'part-detail ' + [partIndex == 2 ? 'active' : '']" ref="2">
        <p>
          1、交通：含起始地至丽江往返机票（含税），全程空调旅游车，按我社拼团人数选择车型，每人确保正座，
        </p>
        <p>
          2、门票：已含行程中景点首道大门票，此产品为半自由行产品，第四天不含门票，不用车，自由活动
        </p>
        <p>
          3、住宿：全程指定酒店，每个成人一个床位，每两个成人一个普通标间，若指定大床房在标单同价的情况下可以满足，
          若酒店标单有差价或指定升级房型的情况需额外补足差价
        </p>
        <p>4、餐饮：全程4早餐0正餐。早餐均为酒店含早</p>
        <p>5、导游：本行程为半自由行产品，8人以上安排优秀地陪导游服务低于人司机兼导游</p>
        <p>6、购物：不进店；（云南部分景区游购结合，景区景中店不属于购物点）</p>
        <p>
          7、特别提醒：如遇旺季，景点顺序导游根据实际情况安排，敬请谅解。 参考酒店：
          丽江酒店：丽江漫步云端酒店、丽江漫步思语、丽江祥和一号酒店或者同级
          中甸酒店：香格里拉锦城酒店、香格里拉第五颗陨石紫薇酒店、怡程酒店或者同
        </p>
      </div>
      <div :class="'part-detail ' + [partIndex == 3 ? 'active' : '']" ref="3">
        <h2>出行须知</h2>
        <p>
          1、因人力不可抗拒因素（自然灾害、交通状况、政府行为等）影响行程，我社可以作出行程调整，尽力确保行程的顺利进行。实在导致无法按照约定的计划执行的，因变更而超出的费用由旅游者承担。
        </p>
        <p>
          2、行程中的车程时间为不堵车情况下的参考时间,不包含景点的游览时间；我社导游有权在不减少景点的情况下自行调整景点游览顺序。
        </p>
        <p>
          3、投诉以当地接待社旅游意见单为准，请各位游客如实填写，若虚假填写、不填写默认为无接待问题，回程后再行投诉，我社将不予受理。如对我社接待不满意的请在第一时间与我社相关人员联系，方便我社协调处理。
        </p>
        <p>
          4、请不要将贵重物品、现金、急用药品放在托运行李中，以免丢失。旅游过程中，也请妥善保存
          为普及旅游安全知识及旅游文明公约，使您的旅程顺利圆满完成，特制定《去哪儿网旅游安全手册》，请您认真阅读并切实遵守。
        </p>
      </div>
    </div>
	</div>
</template>

<script >
	export default {
		data() {
			return {
				isHeaderTop: false,
				normalPosition: -1, //内容导航未置顶时，最初的位置
				detailPositions:[],//内容具体位置
				partIndex: 0,
				timer: null,
			};
		},
		props:{
			scrollDistance:Number
		},
			
		watch:{	
			scrollDistance(newD,oldD){
				 //console.log('new',newD)
				 //console.log('this.normalPosition',this.normalPosition)
				 // 	if(!this.timer){
					// 	this.timer = setTimeout(()=>{
					// 		//console.log('节流');
						

					// 		this.timer = null;
							
					// 	},20)				
					// }
					
					if(this.normalPosition < 44 + newD){
						this.isHeaderTop = true;				
					}else{
						this.isHeaderTop = false;
					}
					
					 let part = -1; //存储划过的最后一部分序列值
					for (let index in this.detailPositions) {
						if (this.detailPositions[index] > newD + 88) {
							break;
						}else{
							part = index;	
						}
					}		
					if (this.partIndex != part && part != -1) {
						console.log("before.index", this.partIndex);
						console.log("位于--------", part);
						this.partIndex = part;
					}
			}
		},
			
		methods:{
				
			toPart(index){
				this.partIndex = index;
				//console.log('跳转到',this.detailPositions[index]-88)
				this.$emit('changeScrollTop',this.detailPositions[index]-87)
				
			}
		},
		mounted(){
			const query = uni.createSelectorQuery().in(this);
			const dom = query.select('.content-header')
			dom.boundingClientRect(	data=>{
					console.log('first top',data.top)
					this.normalPosition = data.top;
				}).exec()
			
			const partDetails = query.selectAll('.part-detail')
			partDetails.boundingClientRect(	datas=>{
				datas.forEach((data)=>{
					this.detailPositions.push(data.top);//将内容栏距离画面顶部的高度存入
					console.log('all',this.detailPositions)
				})}).exec()
		}
	}
</script>
<style lang="less" scoped>
@import "@/assets/styles/themeColor.less";
.content-wrapper {
  padding-top: 0.88rem;
  height: 100vh;
  min-height: 100vh;
}
.content-header {
  height: @headerHeight;
  width: 100%;
  background-color: #fff;
  font-size: 0.24rem;
  border: 0.005rem solid #ddd;

  display: flex;
  &.header-top {
    position: fixed;
    top: @headerHeight;
    z-index: 10;
  }
  .choose-tag {
    width: 25%;
    height: @headerHeight;
    line-height: @headerHeight;
    text-align: center;
    &.active {
      color: @bgColor;
      font-size: 0.35rem;
      font-weight: bolder;
    }
  }
}
.content-part {
  background-color: #eee;
  // margin-top: @headerHeight;

  &.content-all {
    padding-top: @headerHeight;
  }
  .part-detail {
    width: 100%;
    font-size: 0.66rem;
    padding-bottom: @footerHeight;
    margin-bottom: 0.2rem;
    background-color: #fff;
    img {
      width: 100%;
    }
    h2 {
      display: block;
      font-size: 0.34rem;
      height: 1.6rem;
      line-height: 1.6rem;
    }
  }
}
</style>
