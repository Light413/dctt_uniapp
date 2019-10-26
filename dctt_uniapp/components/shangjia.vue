<template>
	<view style="display: flex;align-items: center;">
		<image v-bind:src="value.imageUrl[0]" v-bind:style="{width:'80px' , height:'80px' , borderRadius:'2px'  , padding:'2px' , marginRight:'5px', flexShrink:0,borderRadius:'12px'}"></image>
		<view style="display: flex;flex-direction: column;margin-left: 5px;margin-top: 0px;">
			<text style="font-size: 18px;color: #333;">
				{{contentObj.title}}
			</text> 
			<text class="content">{{contentObj.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{},
		},
		computed:{
			contentObj:function (){
				var s = this.value['content'];
				var s1 = s.replace(/\n/g , '');
				var obj = JSON.parse(s1);
				return obj;
			}
		}
	}
</script>
<style>
.content{
	font-size: 15px;
	color: #888;
	margin-top: 2px;
	padding-right: 15px;
	
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	/* word-wrap: break-word; */
}

image{
	object-fit: cover;
}
</style>
