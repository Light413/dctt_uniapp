<template>
	<view>
		<home-list @loadingStatus="loadingStatus" ref="homeList" :type="itemType"></home-list>
		<uni-load-more :status="status" :content-text="contentText"/>
	</view>
</template>

<script>
	import homeList from '@/components/home-list.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{
			homeList,
			uniLoadMore
		},
		data(){
			return{
				itemType:'0',
				status: 'loading',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'},
				}
			},
			
		onLoad(opt) {
			if(opt){
				uni.setNavigationBarTitle({title:opt['t']});
				this.itemType = opt['id'];
			}
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
			loadingStatus(e){
				this.status = e;
			}
		}
	}
</script>