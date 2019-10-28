<template>
	<!-- 动态列表默认显示 -->
	<view>
		<view style="display: flex;margin-left: 2px;">
			<view>
				<image class="user-avatar" :src="value.avatar"></image>
			</view>
			<view style="margin-left: 8px;font-size: 13px;color: #666;margin-top: 2px;">
				<text>{{value.user.name || value.user.nickName}}</text>
				<text style="margin-left: 15px;">{{value.postDateFormatter}}</text>
			</view>
		</view>
		
		<view v-if="value.imageUrl" style="width: 100%;">
			<!-- 效果同flex-direction:row-reverse ,位置翻转-->
			<view v-if="value.imageUrl.length == 1" style="display: flex;flex-direction: row;">
				<view style="width: 100%;">
					<view class="postContent">{{value.content}}</view>	
					<read-cnt :readCnt="value.readCnt" :typeName="value.typeName" :showType="showType"/>
				</view>
				<view>
					<image v-bind:src="value.imageUrl[0]" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , marginRight:'5px', flexShrink:0}"></image>
				</view>
			</view>
			<view v-else style="display: flex;flex-direction: column;justify-content: flex-start;">
				<view class="postContent">{{value.content}}</view>	
				<view style="display: flex;flex-direction: row;">
					<view v-for="(ig , k) in value.imageUrl" :key="k" style="display: flex;">
						<image v-bind:src="ig" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , flexGrow:2 , objectFit:'cover'}"></image>							
					</view>
				</view>
				<read-cnt :readCnt="value.readCnt" :typeName="value.typeName" :showType="showType"/>
			</view>
		</view>
		<!-- 无图 -->
		<view v-else>
			<view class="postContent">{{value.content}}</view>	
			<read-cnt :readCnt="value.readCnt" :typeName="value.typeName" :showType="showType"/>
		</view>
	</view>
</template>

<script>
	import readCnt from "@/components/read-cnt.vue";
	export default{
		props:{
			value:{},
			showType:{
				type:Boolean,
				default:false
			}
		},
		components:{
			readCnt
		}
		
	}
</script>

<style>
.user-avatar{
	width: 25px; 
	height: 25px; 
	border-radius: 50%;
}	

.postContent{
 /*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/ 
word-break: break-all;
text-overflow: ellipsis;
display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
-webkit-line-clamp: 3; /** 显示的行数 **/
overflow: hidden;
/* word-wrap: break-word; */
text-align: left;
padding: 8px; 
padding-top: 5px; 
padding-bottom: 5px;
font-size: 17px;
line-height: 25px;
}
</style>