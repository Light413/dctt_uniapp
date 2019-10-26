<template>
	<view>
		<view style="display: flex;align-items: center;flex-direction: column;">
			<image src="../../static/images/new/Icon-60@2x.png" style="width: 100px; height: 100px; margin-top: 30px;border-radius: 8px;" ></image>
			<view style="display: flex;font-size: 13px;color: #333;align-items: center;margin-top: 5px;">
				<view style="text-align: center;">郸城头条</view>
				<view>({{version}})</view>
			</view>
			<view style="margin-top: 15px; width: 100%;">
				<uni-list >
					<uni-list-item @click='listSelected(0)' :title="titles[0]" />
					<uni-list-item  @click='listSelected(1)' :title="titles[1]"/>
					<uni-list-item  @click='listSelected(2)' :title="titles[2]" />
					<uni-list-item  @click='listSelected(3)' :title="titles[3]" />
					<uni-list-item  @click='listSelected(4)' :title="titles[4]" />
					<uni-list-item  @click='listSelected(5)' :title="titles[5]" />
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var URL = require('@/common/p/api.js').url;
	
	export default {
		components:{
			uniList,
			uniListItem
		},
		data(){
			return {
				base:URL.base,
				urls:[URL.aboutus_url , URL.usehelp ,URL.user_agreement , URL.privacy_agreement , URL.disclaimer , URL.contactus],
				titles:['简介','使用帮助','用户协议','隐私政策','免责声明' , '联系我们'],
				version:'v1.0.0'
			}
		},
		onLoad() {
			var appid = plus.runtime.appid;
			if(appid != 'HBuilder'){
				plus.runtime.getProperty(appid , info =>{
					var appver =  info['version'];	
					var des = info['description'];
					this.version = '(v' + appver + des + ')';
				});
			}
		},
		methods:{
			listSelected (i) {
				let u = this.base + this.urls[i] , title = this.titles[i];
				uni.navigateTo({
					url:'../../components/webview?u=' + u +'&title=' + title
				})
			},
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
