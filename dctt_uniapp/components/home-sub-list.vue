<template>
<view>
	<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value ,key) in items" :key="key" style="flex-direction: column;align-items: flex-start;">
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
							<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
						</view>
						<view>
							<image v-bind:src="value.imageUrl[0]" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , marginRight:'5px', flexShrink:0}"></image>
						</view>
					</view>
					<view v-else style="display: flex;flex-direction: column;justify-content: flex-start;">
						<view class="postContent">{{value.content}}</view>	
						<view style="display: flex;flex-direction: row;">
							<view v-for="(ig , k) in value.imageUrl" :key="k" style="display: flex;">
								<image v-bind:src="ig" v-bind:style="{width:value.width + 'px' , height:value.width * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , flexGrow:2}"></image>							
							</view>
						</view>
						<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
					</view>
				</view>
				<!-- 无图 -->
				<view v-else>
					<view class="postContent">{{value.content}}</view>	
					<read-cnt :readCnt="value.readCnt" :typeName="value.typeName"/>
				</view>
			</view>
		</view>
		
		<!-- <uni-load-more :status="status" :content-text="contentText" /> -->
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import readCnt from "@/components/read-cnt.vue";
	
	var dateUtils = require('@/common/util.js').dateUtils;
	var baseData = require("@/common/p/base-data.js");
	var api = require('@/common/p/api.js');
	
	export default {
		name:"homeSubList",
		components:{
			uniLoadMore,
			readCnt,
		},
		
		data(){
			return{
				items:[],
				pageNumber:1,
				noMore:0,
				}
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData(){
				//uni.showLoading({title:'加载中'});
				var data = {"category":"sy" ,"subType":'0' ,'pageNumber':this.pageNumber};
				api.post(api.url.getsy , data , res => {
					var arr = res;
					if(arr && arr.length > 0){
						// console.log(JSON.stringify(arr.length));
						if(this.pageNumber == 1){
							uni.stopPullDownRefresh();
							this.items = this._formatter(arr);
						}else{
							this.items = this.items.concat(this._formatter(arr));
						}
						
						if(arr.length < 20){
							this.$emit('loadingStatus' , 'noMore');
						}
					}else{
						this.$emit('loadingStatus' , 'noMore');
					}
				});	
			},
			
			_formatter(items){
				var newItems = [];
				items.forEach(e => {
					var con = e['content'];
					e['content'] = con.replace('/\n/g' , ' ');
					var avatar= this.getAvatarUrl(e);
					e['avatar'] = avatar;
					
					var postDate = e['postDate'];
					e['postDateFormatter'] = dateUtils.format(postDate);
					e['typeName'] = this.postType(e['type']);
		
					//添加图片		
					var igStr = e['images'];
					if(igStr != null && igStr.length > 0){
						var igurlArr = igStr.split(',');
						var w = (plus.screen.resolutionWidth - 30) / 3.0;;
						if(igurlArr.length == 1){
							w = (plus.screen.resolutionWidth - 30) / 3.0;
						}
						
						e['width'] = w;
						var _len = igurlArr.length > 3 ? 3 : igurlArr.length;
						var thumbArr = Array();
						for (var k = 0; k < _len; k++) {
								var thumb = this.getDtImageUrl(igurlArr[k] , '../../static/images/new/600x153_w.png');
								thumbArr.push(thumb);
							}
						
						e['imageUrl'] = thumbArr;
					}
		
				});
				
				return items;
			},
			//获取动态列表缩略图
		 getDtImageUrl(thumbUrl , defaultUrl){
			if(thumbUrl){
				thumbUrl = thumbUrl.replace('.jpg' , '_thumb.jpg');
			}
			
			return thumbUrl || defaultUrl;
		},
		getAvatarUrl(item){
				var u_avatar = item['user']['avatar_thumb'];
				if(u_avatar == null || u_avatar == ''){
					u_avatar = "../../static/images/default_avatar.png";
				}
				return u_avatar;
			},
		postType(type){
			var _t = baseData.titleForType;
			return _t[type] || '其他';
		}
		}
	}
	
</script>

<style>
.user-avatar{
	width: 25px; 
	height: 25px; 
	border-radius: 50%;
}	
image{
	object-fit: cover;
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

.uni-list:after {
	height: 0;
}

.uni-list:before {
	/* height: 0; */
}

.uni-list-cell{
	padding: 10px;
	color: #333;
}
.uni-list-cell:after{
	left: 0;
	background-color: #bbb;
}
</style>
