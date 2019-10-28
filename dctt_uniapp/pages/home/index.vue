<template>
	<view class="content">
		<uni-swiper-dot :info="swiperImages" :current="current" :mode="mode" :dots-styles="dotsStyles">
			<swiper class="swiper-box" @change="change" autoplay="true" style="height: 180px;">
				<swiper-item v-for="(item ,index) in swiperImages" :key="index">
					<view class="swiper-item">
						<image :src="item.url" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<uni-grid :options="itemType" :show-border="false"  :column-num="4"  @click="onClick"/>
		
		<home-list @loadingStatus="loadingStatus" ref="homeList" />
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import homeList from '@/components/home-list.vue';
	var baseData = require("@/common/p/base-data.js");

	export default {
		components: {
			uniSwiperDot,
			uniGrid,
			homeList,
			uniLoadMore
		},
		data() {
			return {
				swiperImages: [
					{url: "../../static/images/home/home_top_banner1.png"},
					{url: '../../static/images/home/home_top_banner2.png'},
					{url: '../../static/images/home/home_top_banner3.png'}],

				current: 0,
				mode: 'default',
				dotsStyles: {						
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid',
					},
					
				itemType:[],
				status: 'loading',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'},
				}
		},
		onLoad() {
			var _topItems = baseData.homeTopItems;
			_topItems.forEach(e =>{
				var ig = e['image'];
				e['image'] = '../../static/images/' + ig;
			});
			
			this.itemType = _topItems;
		},
		
		onPullDownRefresh() {
			this.$refs.homeList.pageNumber = 1;
			this.$refs.homeList.loadData();
		},
		onReachBottom() {
			if (this.status == 'noMore')return;
			this.status = 'loading';
			
			this.$refs.homeList.pageNumber = this.$refs.homeList.pageNumber + 1;
			this.$refs.homeList.loadData();
		},
		
		
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			loadingStatus(e){
				this.status = e;
			},
			onClick(e){
				var i = e.index;
				var item = this.itemType[i];
				uni.navigateTo({
					url:'home-list?t=' + item['text'] + '&id=' + item['type']
				})
			}
		}
	}
</script>

<style>
.swiper-item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background: #eee;
	color: #fff;
}

.swiper-item image {
	width: 100%;
	height: 100%;
}
	
.content {
	text-align: center;
	padding-top: 0px;
	padding-bottom: 56px;
}

</style>
