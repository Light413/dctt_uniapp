<template>
	<view>
<!-- 		<image src="../../static/images/default_avatar.png" style="width: 80px; height: 80px; margin-top: 30px;border-radius: 50%;" ></image> -->
		<view style="margin-top: 0px;">
			<uni-list >
				<uni-list-item @click='listSelected(1)' title="黑名单" />
				<uni-list-item  @click='listSelected(2)' title="清空缓存" :showBadge="showCache" :badgeText="cacheSize"/>
				<uni-list-item  @click='listSelected(3)' title="意见反馈" />
				<uni-list-item  @click='listSelected(4)' title="关于我们" />
			</uni-list>
		</view>
		
		<view v-if="isLogined" style="align-items: center;width: 100%;">
			<button @click="logout" style="margin-top: 70px; background-color: #FF4500;color: white;height: 45px; width: 95%;font-size: 17px;">退出登录</button>
		</view>
		
		<view style="position: fixed;bottom: 8px;text-align: center;width: 100%;font-size: 13px;color: #999;">©️2019郸城头条APP</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var USER = require('@/common/p/user.js');
	
	export default {
		components:{
			uniList,
			uniListItem
		},
		data(){
			return {
				showCache:true,
				cacheSize:'0.0M',
				isLogined:USER.isLogined(),
			}
		},
		onLoad() {
			plus.cache.calculate(size => {
				let s = parseFloat(size / (1024 * 1024)).toFixed(2) + "M";
				console.log(s);
				this.cacheSize = s;
			})
		},
		methods:{
			listSelected (i) {
				switch (i){
					case 2://清除缓存
					uni.showModal({
					    title: '提示',
					    content: '此操作会删除本地缓存信息,确定清除?',
					    success: res => {
					        if (res.confirm) {
								// uni.showLoading({
								// 	title:'清除缓存'
								// });
								// plus.cache.clear(() => {
								// 	this.cacheSize = '0.0M';
								// 	uni.hideLoading();
									
								// });
					        } else if (res.cancel) {
					            console.log('取消');
					        }
					    }
					});
					break;
					case 4:uni.navigateTo({
						url:'about-us'
					});break;
					default:break;
				}
			},
			logout:function(){
				uni.showModal({
				    title: '提示',
				    content: '退出会删除本地用户信息,确定退出?',
				    success: function (res) {
				        if (res.confirm) {
							uni.removeStorageSync('loginuserinfo');
							uni.$emit('userloginsuccess');
							uni.navigateBack();
				        } 
				    }
				});
			}
		}
	}
</script>

<style>
/* 	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}
	.content{
		background-color: #eee;
	}
	view{
		background-color: white;
	}
	 */
	
	
</style>
