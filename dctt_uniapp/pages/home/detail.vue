<template>
	<view>
		<view v-if="value.pid" >
		<view style="padding: 10px;">
			<view v-if="postCategory != 'sy'" style="font-size: 20px; color: #111;padding: 2px 10px ; padding-bottom: 10px;font-weight: 400;">
				<text v-if="_postSubType(value)" style="padding: 0px 10px; color: #fff; background-color: #FF8000;border-radius: 5px;font-size: 16px;margin-right: 5px;">{{_postSubType(value)}}</text>{{postTitle(value)}} 
			</view>
			<view style="display: flex;align-items: center;padding-top: 6px;">
				<image class="user-avatar" mode="aspectFill" :src="avatar(value)"></image>
				<view style="margin-left: 12px;color: #666;">
					<view style="line-height: 1.5;">
						<text style="font-size: 15px;color: #444;">{{value.content.user.name || value.content.user.nickName}}</text>
					</view>
					<view style="line-height: 1.5;">
						<text style="font-size: 13px;">{{postDate(value)}}</text>
					</view>
				</view>
			</view>
			<view  class="postContent">
				<text>{{postContent(value)}}</text> 
			</view>
			<view v-if="imgArr.length > 0" style="padding:5px;">
				<view v-for="(v,i) in imgArr" :key='i' style="display: flex;flex-direction: row;">
					<view v-for="(ig , k) in v" :key="k" style="display: flex;flex-direction: column;">
						<image v-if="!igLenMore_3" v-bind:src="ig" mode="widthFix" v-bind:style="{width:igW + 'px' , borderRadius:'2px'  , padding:'2px' , flexGrow:2}"></image>	 	
						<image v-else v-bind:src="ig"  mode="aspectFill" v-bind:style="{width:igW + 'px' , height:igW * 0.8 + 'px' , borderRadius:'2px'  , padding:'2px' , flexGrow:2 }"></image>	
					</view>
				</view>
			</view>
			<view style="margin-top: 15px;margin-left: 5px;">
				<view style="display: flex;align-items: center;">
					<view style="color: darkgray;font-size: 14px;width: 100%;">{{value.readCnt || 0}}阅读</view>
					<view style="margin-right: 40px;font-size: 12px;color: #808080;display: flex;">
						<image src="../../static/images/comment_like_icon_normal@2x.png" style="width: 20px;height: 20px;margin-right: 5px;" />
						<view v-if="value.praiseCnt > 0">{{value.praiseCnt}}</view>
					</view>
				</view>
			
				<view style="margin-top: 10px;font-size: 12px;color: #666;">
					提示: 平台不对该信息承担任何责任，若发现虚假信息等违法行为请 <text v-on:click="connectUsAction(0)" style="color: #FF5053;padding: 3px 0;margin: 0 5px;font-size: 13px;">点击举报 </text> 一经核实系统立即删除
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view style="padding: 0;">
			<view style="margin-top: 8px;  border-width: 0; border-width: 8px 0 1px 0;border-color: #F8F8F8; border-bottom-color: #eee; border-style: solid;padding: 10px 10px;font-size: 15px;color: #888;">评论</view>	
			<view v-if="commentArr.length > 0" class="uni-list" style="padding-bottom: 80px;">
				<view class="uni-list-cell" v-for="(e , i) in commentArr" :key="i" style="display: flex;">
					<image class="user-avatar" mode="aspectFill"  style="margin-top: 5px; align-self: flex-start;flex-shrink: 0;margin-left: 5px;" src="../../static/images/mm.JPG"></image>
					<view style="padding: 0 10px;">
						<view style="display: flex;margin-top: 5px;">
							<text style="color: #5e86c1;font-size: 14px;width: 100%;">夜空中最亮的星</text>
							<view style="margin-right: 6px;display: flex;">
								<image src="../../static/images/comment_like_icon_normal@2x.png" style="width: 20px;height: 20px;margin-right: 5px;" />
								<view v-if="value.praiseCnt > 0">{{value.praiseCnt}}</view>
							</view>
						</view>
						<view style="font-size: 16px; color: #444;margin-top: 8px;line-height: 23px;">
							平台不对该信息承担任何责任，若发现虚假信息等违法行为请点击举报-[测试数据]
						</view>
						<view style="display: flex;font-size: 13px;padding: 5px 0px;color: #555;">
							<text>1小时前</text>
							<text style="margin-left: 15px;">回复</text>
						</view>
					</view>
				</view>
			</view>
			<view v-else style="display: flex;justify-content: center;padding-bottom: 100px;">
				<text style="text-align: center;font-size: 14px;margin-top: 50px;color: darkgray;">暂无内容</text>
			</view>
		</view>
		<view class="bottom-bar" style="display: flex; align-items: center;">
			<view  style="display: flex; align-items: center;width: 100%;">
				<view style="border-width: 0;background-color: #f5f5f5;display: flex;margin-left: 10px; padding: 6px 30px;align-items: center;border-radius: 15px;width: 50%;justify-content: center;">
					<image src="../../static/images/write_icon@2x.png" style="width: 20px; height: 20px;" />
					<view style="margin-left: 10px;color: #555;font-size: 13px;">写评论</view>
				</view>
				<view style="display: flex; align-items: center; justify-content: space-around;width: 100%;">
					<view style="display: flex;">
						<image src="../../static/images/tab_comment@2x.png" style="width: 25px; height: 25px;"/>
						<text v-if="0 > 0" style="background-color: #FF5053;color: white;font-size: 10px;margin-left: -12px;padding: 0px 5px; border-radius: 6px;height: 15px;"></text>
					</view>
					<view style="font-size: 12px;color: #808080;display: flex;align-items: center;">
						<image v-if="0 > 0" src="../../static/images/tab_collect_press@2x.png" style="width: 20px; height: 20px;" >
						<image v-else src="../../static/images/tab_collect@2x.png" style="width: 25px; height: 25px;" >
					</view>
					<image src="../../static/images/share_icon@2x.png" style="width: 25px; height: 25px;" >
				</view>
			</view>
		</view>
		</view>
	</view>
</template>
<script>
	var dateUtils = require('@/common/util.js').dateUtils;
	var baseData = require("@/common/p/base-data.js");
	var api = require('@/common/p/api.js');
	var USER = require("@/common/p/user.js");
	
	export default {
		components:{
			
		},
		data(){
			return {
				value:{},
				imgArr:[],
				igW:0,
				igLenMore_3:false,
				commentArr:[1,1,1,1,1,1,1],
				postCategory:'',
				pid:'',
				postContentObj:{}
			}
		},
		onLoad(opt) {
			console.log("opt: " + JSON.stringify(opt));
			let pid = opt['pid'] , c = opt['c'];
			uni.setNavigationBarTitle({
				title:opt['t'] || '动态详情'
			})
			this.postCategory = c;
			this.pid = pid;
			this.loadData(pid , c);
		},
		
		methods:{
			loadData(pid ,c){
				var d = {"pid":pid,
					"type":"0",//获取动态详情
				    "category":c
					// 'uid':'0e1f73e563faa1d0d049536ab154acf6'
				}
				
				// if(postInfo['issh']){//是否是审核操作
				// 	d['issh'] = 1;
				// }
				
				if(USER.isLogined()){d['uid'] = USER.uid();}
				uni.showLoading({title:'数据加载中'});
				let that = this;
				api.post(api.url.dtdetail , d ,res => {
					console.log("res: " + JSON.stringify(res));
					that.value = res;
					that.imgArr = that.images();
					uni.hideLoading();
				} , error => {
					uni.hideLoading();
					uni.showToast({title:error,icon:'none'});
				});
			},
			getDtImageUrl(thumbUrl , defaultUrl){
				if(thumbUrl){thumbUrl = thumbUrl.replace('.jpg' , '_thumb.jpg');}
				return thumbUrl || defaultUrl;
			},
			images(){
					var e = this.value['content'],igStr = e['images'];
					if(igStr != null && igStr.length > 0){
						var igurlArr = igStr.split(','),w = (plus.screen.resolutionWidth - 40) / 3.0;
						let b = igurlArr.length > 3;
						this.igLenMore_3 = b;
						if(!b){w = (plus.screen.resolutionWidth - 30);}
						e['width'] = w;this.igW = w;
						var _len = igurlArr.length,thumbArr = Array(),_arr = Array();
						for (var k = 0; k < _len; k++) {
								let thumb = this.getDtImageUrl(igurlArr[k] , '../../static/images/new/600x153_w.png');
								thumbArr.push(thumb);
								if(_len <= 3){
									let t = thumbArr;
									thumbArr = [];
									_arr.push(t);continue;
								}
								if((k + 1) % 3 == 0){
									let _a = thumbArr;
									_arr.push(_a);
									thumbArr = []
								}
							}
							if(thumbArr.length > 0){_arr.push(thumbArr)}
						return _arr;
					}
					
					return []
				},
				postContent:function(v){
					if(JSON.stringify(v) == '{}')return;
					let o = this._postObj(v);
					if(this.postCategory == 'sy')return o;
					var c = o['content'];
					c = c.replace(/\$/g , '\n')
					return c;
				},
				postTitle:function(v){
					if(JSON.stringify(v) == '{}')return;
					let o = this._postObj(v);
					return o['title'];
				},
				_postObj:function(v){
					let that = this;
					let con = v.content.content;
					if(that.postCategory == 'sy')return con;
					let s1 = con.replace(/\n/g , '$');
					let o = JSON.parse(s1);
					return o;
				},
				_postSubType(v){
					if(JSON.stringify(v) == '{}')return;
					return baseData.postSubType(v.content.type , this._postObj(v).type) || '';
				}
		},
		computed:{
			avatar(){return function(v){
					if(JSON.stringify(v) != '{}'){
						var u = v['content']['user'];
						return u['avatar_thumb'] || '../../static/images/default_avatar.png';}
				}
			},
			postDate(){return function(v){
				if(JSON.stringify(v) != '{}')return dateUtils.format(v.content.postDate);}
			},
		}
	}
</script>
<style>
.user-avatar{
	width: 40px; 
	height: 40px; 
	border-radius: 50%;
	margin-left: 8px;
}	

.postContent{
 /*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/ 
word-break: break-all;
text-overflow: ellipsis;
display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
/* word-wrap: break-word; */
text-align: left;
padding: 8px; 
padding-top: 10px; 
padding-bottom: 5px;
font-size: 18px;
line-height: 25px;
color: #333;
text-indent: 0px;
margin-top: 10px;
}	

.uni-list:before , .uni-list:after{
	height: 0;
}
.uni-list-cell{
	padding: 5px;
}
.uni-list-cell:after{
	background-color: #eee;
}

.bottom-bar{
	background-color: #fff;
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: #eee;
	height: 50px;
	position: fixed;
	bottom: 0;
	width: 100%;
}
</style>
