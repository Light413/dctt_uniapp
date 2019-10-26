<template>
	<view>
		<view v-if="value.imageUrl" style="width: 100%;">
			<!-- 效果同flex-direction:row-reverse ,位置翻转-->
			<view v-if="value.imageUrl.length == 1" style="display: flex;flex-direction: row;">
				<view style="width: 100%;">
					<view class="titleContent">{{contentObj.title}}</view>
					<view class="postContent">{{contentObj.content}}</view>	
					<view style="display: flex; align-items: center;padding: 5px 10px;">
						<view style="display: flex; align-items: center;width: 100%;">
							<image mode="aspectFill" class="user-avatar" :src="value.avatar"></image>
							<view style="margin-left: 8px;font-size: 13px;color: #666;margin-top: 2px;margin-right: 8px;">
								<text class="user-name">{{value.user.name || value.user.nickName}}</text>
								<text style="margin-left: 15px;">{{value.postDateFormatter}}</text>
							</view>	
						</view>
					
						<view style="flex-shrink: 0;margin-right: 10px;">
							<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
						</view>
					</view>
				</view>
				<view>
					<image mode="aspectFill" v-bind:src="value.imageUrl[0]" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , marginRight:'5px', flexShrink:0}"></image>
				</view>
			</view>
			<view v-else style="display: flex;flex-direction: column;justify-content: flex-start;">
				<view class="titleContent">{{contentObj.title}}</view>
				<view class="postContent">{{contentObj.content}}</view>	
				<view style="display: flex;flex-direction: row;">
					<view v-for="(ig , k) in value.imageUrl" :key="k" style="display: flex;">
						<image mode="aspectFill" v-bind:src="ig" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , flexGrow:2 , objectFit:'cover'}"></image>							
					</view>
				</view>
				
				<view style="display: flex; align-items: center;padding: 5px 10px;">
					<view style="display: flex; align-items: center;width: 100%;">
						<image mode="aspectFill" class="user-avatar" :src="value.avatar"></image>
						<view style="margin-left: 8px;font-size: 13px;color: #666;margin-top: 2px;margin-right: 8px;">
							<text class="user-name">{{value.user.name || value.user.nickName}}</text>
							<text style="margin-left: 15px;">{{value.postDateFormatter}}</text>
						</view>	
					</view>
				
					<view style="flex-shrink: 0;margin-right: 10px;">
						<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
					</view>
				</view>
			</view>
		</view>
		<!-- 无图 -->
		<view v-else>
			<view class="titleContent">{{contentObj.title}}</view>
			<view class="postContent">{{contentObj.content}}</view>	
			<view style="display: flex; align-items: center;padding: 5px 10px;">
				<view style="display: flex; align-items: center;width: 100%;">
					<image mode="aspectFill" class="user-avatar" :src="value.avatar"></image>
					<view style="margin-left: 8px;font-size: 13px;color: #666;margin-top: 2px;margin-right: 8px;">
						<text class="user-name">{{value.user.name || value.user.nickName}}</text>
						<text style="margin-left: 15px;">{{value.postDateFormatter}}</text>
					</view>	
				</view>

				<view style="flex-shrink: 0;margin-right: 10px;">
					<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import readCnt from "@/components/read-cnt.vue";
	export default{
		props:{
			value:{},
		},
		components:{
			readCnt
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
.user-avatar{
	width: 25px; 
	height: 25px; 
	border-radius: 50%;
	flex-shrink:0
}	

.postContent , .titleContent{
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
font-size: 18px;
line-height: 25px;
color: #333;
}

.postContent{
	font-size: 16px;
	color: #666;
}
.user-name{
	width: 30px;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>