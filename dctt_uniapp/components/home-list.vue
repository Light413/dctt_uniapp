<template>
<view>
	<view class="uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value ,key) in items" :key="key" style="flex-direction: column;align-items: flex-start;">
			<view style="width: 100%;" v-on:click="openDetailPage(value)">
				<!-- <list-item-cell v-if="comType=='default'" :value="value" :showType="type == 0"></list-item-cell> -->
				<list-item-cell v-if="comType=='default'" :value="value" :showType="type == 0"></list-item-cell>
				<shangjia v-else-if="comType=='sj'" :value="value"></shangjia>
				<life-item-cell v-else-if="comType=='life'" :value="value"></life-item-cell>
			</view>
		</view><!-- cell -->
</view>
</view>
</template>

<script>
	import listItemCell from '@/components/list-item-cell.vue';
	import shangjia from '@/components/shangjia.vue';
	import lifeItemCell from '@/components/life-item-cell.vue';
	
	var dateUtils = require('@/common/util.js').dateUtils;
	var baseData = require("@/common/p/base-data.js");
	var api = require('@/common/p/api.js');
	
	export default {
		name:"homeList",
		components:{
			listItemCell,
			shangjia,
			lifeItemCell
		},
		props:{
			type:{
				type:String,
				default:'0'
			}
		},
		data(){
			return{
				items:[],
				pageNumber:1,
				noMore:0,
				comType:'default'
				}
		},
		mounted() {
			if(this.type == '14'){
				this.comType = 'sj'
			}else if(this.type == '15'){
				this.comType = 'life'
			}else if(this.type == '16'){
				this.comType = 'life'
			}else if(this.type == '17'){
				this.comType = 'life'
			}
			
			this.loadData();
		},
		methods: {
			loadData(){
				var data = {"category":"sy" ,"subType":this.type ,'pageNumber':this.pageNumber};
				if(this.type == '14' || this.type == '15' || this.type == '16' || this.type == '17'){
					data['category'] = 'life';
					data['subType'] = '22';
					if(this.type == '15'){
						data['subType'] = '23'
					}else if(this.type == '16'){
						data['subType'] = '21'
					}else if(this.type == '17'){
						data['subType'] = '27'
					}
				}
				
				// console.log("req data: " + JSON.stringify(data));
				api.post(api.url.getsy , data , res => {
					var arr = res;
					if(arr && arr.length > 0){
						// console.log(JSON.stringify(arr[0]));
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
				} , error => {
					console.log(error);
					uni.showToast({
						title:'请求网络失败！',
						icon:'none'
					})
					this.$emit('loadingStatus' , 'noMore');
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
		},
		openDetailPage(value){
			// console.log("value: " + JSON.stringify(value));
			let pid = value['pid'] , type = value['type'];
			let category = api.postType(type) , itemTitle = baseData.titleForType[type];
			if(!pid || !category)return;
			uni.navigateTo({
				url:'../home/detail?pid=' + pid + '&c=' + category + '&t=' + itemTitle
			})
		}
		}
	}
	
</script>

<style>
.uni-list:after {
	height: 0;
}

.uni-list:before {
	height: 1px;
	background-color: #eee;
}

.uni-list-cell{
	padding: 10px;
	color: #333;
}
.uni-list-cell:after{
	left: 0;
	background-color: #ddd;
}
</style>
