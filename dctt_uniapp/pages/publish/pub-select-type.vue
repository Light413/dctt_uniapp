<template>
	<view class="content">
		<view>
			<view  style="padding: 25px; padding-top: 25px; display: flex;flex-direction: column;align-items: center;">
				<view class="grid-item-wrap" v-for="(arr , k) in itemType" :key="k" style="width: 100%;">
					<view  v-for="(value , key) in arr" :key='key' style="width: 100%;">
						<view  style="display: flex;" >
							<view class="grid-item-left" v-on:click="publish(value[0])">
								{{value[0].text}}
							</view>
							<view class="grid-item-right" v-on:click="publish(value[1])">
								{{value[1].text}}
							</view>
						</view>
					</view>
				</view>
				
				<view style="display: flex; flex-direction: column; align-items: flex-start;width: 100%; margin-top: 8px;font-size: 13px;color: #666; background-color: white;padding:8px 10px;border-radius: 8px;margin-left: 5px;">
					<view>友情提示：</view> 
					<view style="display: flex; align-items: center;">
						<view style="width:4px;height:4px;border-radius:50%;background-color:darkorange; "></view>
						<view style="margin-left: 5px;">发布请选择合适的分类，便于阅读推广</view> 
					</view>
					<view style="display: flex; align-items: center;margin-top: 5px;">
						<view style="width:4px;height:4px;border-radius:50%;background-color:darkorange; display: inline-block;"></view>
						<view style="margin-left: 5px;">违规不合理的内容一旦发现会自动被删除</view>
					</view>
				</view>
			</view>
        </view>
	</view>
</template>

<script>
	var itemType = require("@/common/p/base-data.js").itemType;
	export default {
		components:{
			
		},
		
		data() {
			return {
				itemType:itemType,
			}
		},
		
		onLoad() {
			
			// console.log("itemType: " + JSON.stringify(itemType));
		},
		methods: {
			publish(item){
				console.log("item: " + JSON.stringify(item));
			},
			
			
		}
	}
</script>

<style>
.content {
	text-align: center;
	padding-top: 0px;
	padding-bottom: 56px;
	height: 200px;
}

.grid-item-wrap{
	margin-top: 15px;
	border-color: #E5E5E5;
	border-width: 1px;
	border-style: solid;
	width: 100%;
}	

.grid-item-left , .grid-item-right{
	margin-top: 0px;
	border-width: 1px;
	border-bottom-width: 0;
	border-right-width: 0;
	border-style: solid;
	padding: 25px 0;
	border-color: #E5E5E5;
	border-radius: 0px;
	font-size: 15px;
	width: 50%;
}
.grid-item-left {
	border-left-width: 0;
}
.grid-item-wrap:nth-child(-n+2){
	border-top-width: 0;
}
</style>
