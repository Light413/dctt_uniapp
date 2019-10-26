<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="src" ></web-view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			url:{
				type:String,
				default:''
			},
		},
		data(){
			return {
				webviewStyles: {
				                    progress: {
				                        color: '#FF3333'
				                    }
				                },
				src:''
			}
		},
		onLoad(opt) {
			this.src = opt['u'];
			this.title = opt['title'];
			
			uni.setNavigationBarTitle({
				title: this.title
			});
		}
		
	}
</script>

<style>
</style>
