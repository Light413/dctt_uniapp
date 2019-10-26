<template>
	<view class="read-cnt">
		<view class="readCtn">阅读{{readCnt}}</view>
		<view v-if="showType" class="type-name">{{typeName}}</view>	
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
			},
			showType:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style>
.read-cnt{
	display: flex; flex-direction: row;margin-top: 5px;align-items: center;
}
.readCtn{
	margin-left: 8px;font-size: 13px;color: #666;text-align: left;
}
.type-name{
	margin-left: 15px;color:white;
	background-color:#ff4500;
	background-color:#f5f5f5;
	color: #888;
	font-size:12px;
	padding:0px 6px;
	border-radius:6px;
}
</style>
