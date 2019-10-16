<template>
	<view class="read-cnt">
		<view class="readCtn">阅读{{readCnt}}</view>
		<view class="type-name">{{typeName}}</view>	
	</view>
</template>

<script>
	export default{
		props:{
			readCnt:{
				type:String,
			},
			typeName:{
				type:String
			}
		}
	}
</script>

<style>
.read-cnt{
	display: flex; flex-direction: row;margin-top: 5px;
}
.readCtn{
	margin-left: 8px;font-size: 13px;color: #666;text-align: left;
}
.type-name{
	margin-left: 15px;color:white;background-color:#ff4500;font-size:10px;padding-left:3px;padding-right:3px; border-radius:6px;height:18px;
}
</style>
