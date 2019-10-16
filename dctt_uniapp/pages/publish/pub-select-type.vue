<template>
	<view class="content">
		<view>
			<view style="padding: 25px; padding-top: 5px; display: flex;flex-direction: column;align-items: center;">
				<view v-for="(value , key) in itemType" :key='key' style="width: 100%;" v-on:click="publish(value)">
					<view style="margin-top: 12px;border-width: 1px;border-style: solid; padding: 25px 0; border-color: #ddd;border-radius: 5px;font-size: 15px;">
						{{value.text}}
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
				itemType:itemType[0],
			}
		},
		
		onLoad() {
			
			// console.log("itemType: " + JSON.stringify(itemType[0]));
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

</style>
