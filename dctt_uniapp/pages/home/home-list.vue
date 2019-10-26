<template>
	<view>
		<home-list-item @loadingStatus="loadingStatus" ref="homeListItem" :type="itemType"></home-list-item>
		<uni-load-more :status="status" :content-text="contentText"/>
	</view>
</template>

<script>
	import homeListItem from '@/components/home-list-item.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{
			homeListItem,
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
			this.$refs.homeListItem.pageNumber = 1;
			this.$refs.homeListItem.loadData();
		},
		onReachBottom() {
			if (this.status == 'noMore')return;
			this.status = 'loading';
			this.$refs.homeListItem.pageNumber = this.$refs.homeListItem.pageNumber + 1;
			this.$refs.homeListItem.loadData();
		},
		
		methods: {
			loadingStatus(e){
				this.status = e;
			}
		}
	}
</script>