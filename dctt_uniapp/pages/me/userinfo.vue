<template>
<view>
	<view style="display: flex;flex-direction: column;align-items: center;">
		<view @click="selectAvatar">
			<image :src="avatar" style="width: 80px; height: 80px; margin-top: 30px;border-radius: 50%;" ></image>	
		</view>
		<text style="text-align: center;font-size: 13px;color: #808080;margin-top: 2px;">点击修改头像</text>
		<view style="background-color: white;width: 100%;margin-top: 20px;">
			<uni-list >
				<view>
					<view class="userinfo-list-item">
						<text class="title">昵称：</text>
						<input class="value" type="text" placeholder="输入名称" v-model="name" />
					</view>
					<view class="userinfo-list-item">
						<text class="title">性别：</text>
						<view style="width: 100%;">
							<picker  :value="sexIndex" :range="sexArr" @change="selectSex">
								<text class="value">{{sexArr[sexIndex]}}</text>
							</picker>
						</view>
						<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
					</view>
					<view class="userinfo-list-item">
						<text class="title">生日：</text>
						<view style="width: 100%;">	
							<lyzml-datepicker  ref="lyzmlDatePicker" :config="datePickerConfig" @onDateChange="bindDateChange"></lyzml-datepicker>
						</view>
						<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright"/>
					</view>
					<view class="userinfo-list-item" @click="showMulLinkageTwoPicker">
						<text class="title">城市：</text>
						<text class="value">{{city}}</text>
						<uni-icons  :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
					</view>
					<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
					 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
					 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
				</view>
			</uni-list>
		</view>	
		
		<view style="margin-top: 10px;width: 100%; display: flex;flex-direction: column; align-items: center;">
			<text style="font-size: 13px;align-self: flex-start; margin-left: 2%;color: #666;">个人描述</text>
			<textarea  placeholder="简单的介绍下自己吧^_^" v-model="notes" style="border-radius: 2px; font-size: 14px; padding:5px; background-color: white; width: 95%;height: 100px;"/>
		</view>
		
		<view style="align-items: center;width: 100%;">
			<button @click="save" style="margin-top: 70px; background-color: #FF4500;color: white;height: 45px; width: 95%;font-size: 17px;">提交修改</button>
		</view>
	</view>
</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import datePicker from "@/components/lyzml-datepicker/lyzml-datepicker.vue"	
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	var USER = require("@/common/p/user.js");
	var api = require('@/common/p/api.js')
	export default {
		components:{
			uniList,
			uniIcons,
			mpvuePicker,
			mpvueCityPicker
			// datePicker
		},
		data(){
			return{
				userInfo:{},
				avatar:'',
				name:'',
				age:'',
				sex:'',
				notes:'',
				city:'',
				is_avatar_change:false,
				is_age_change:false,
				is_sex_chage:false,
				is_city_change:false,
				///
				sexArr: ['女' ,'男'],
				sexIndex: 0,
				
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
			}
		},
		watch:{
			name(val , old){
				// console.log('name:' + val);
			}
		},
		computed: {//执行时间早于onLoad
			datePickerConfig: function() {
				let retObj = {
					yearsBefore: 100,
					yearsAfter: 0,
					initType: "ymd",
					initDate:USER.userInfo().bornDate ||''
				};
				return retObj;
			}
		},
		onLoad() {
			this.userInfo = USER.userInfo();
			this.avatar = this.userInfo['avatar_thumb'] || '../../static/images/default_avatar.png';
			this.name = this.userInfo.name || this.userInfo.nickName;
			this.age = this.userInfo.bornDate || ' ';
			// this.sex = this.userInfo.sex == 0 ? '男':'女';
			this.city = this.userInfo.location || '';
			this.notes = this.userInfo.notes || ' ';
			this.sexIndex = this.userInfo.sex;
		},
		methods:{
			selectAvatar:function(){
				uni.chooseImage({sourceType: ["camera", "album"], sizeType: "compressed", count: 1,
				    success: res => {
						var filesPaths = res.tempFilePaths;
						if(filesPaths && filesPaths.length > 0){
							this.avatar = filesPaths[0];
							this.is_avatar_change = true;
						}
				    }
				})
			},
			selectSex:function(e){
				let i = e.target.value;
				if(i == this.sexIndex)return;
				this.sexIndex = i;
				this.is_sex_chage = true;
			},
			bindDateChange: function(e) {
				var age = e.value;
				if(this.age == age)return;
				this.age = age;
				this.is_age_change = true;
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {},
			onConfirm(e) {
				if(this.city == e.label)return;
				this.city = e.label;
				this.is_city_change = true;
			},
			save(){
				var d = {"uid":USER.uid(), "type":"0"};
				if(this.is_avatar_change){
					// d['images'] = [this.avatar];
					// console.log("new avatar: " + JSON.stringify(this.avatar));
				}
				if(this.is_sex_chage){
					d['sex'] = this.sexArr[this.sexIndex];
				}
				if(this.is_age_change){
					d['bornDate'] = this.age;
				}
				if(this.is_city_change){
					d['city'] = this.city;
				}
				if(this.name != this.userInfo.name && this.name != this.userInfo.nickName){
					d['name'] = this.name;
				}
				if(this.notes != this.userInfo.notes){
					d['mark'] = this.notes
				}
				if(!(this.is_avatar_change || this.is_sex_chage || this.is_age_change || this.is_city_change || d['name'] || d['mark'])){uni.showToast({title:'没有修改信息!',icon:'none'});return;}
				
				// console.log("new: " + JSON.stringify(d));
				uni.showLoading({title:'数据提交中',mask:true});
				api.uploadfile(api.url.update_profile , d  ,[this.avatar] , function(){
					uni.hideLoading();
					uni.$emit('xiugaiuserinfosuccess');
					uni.showToast({
						title: "修改成功!",						
						success:function(res){
							setTimeout(function(){
								uni.navigateBack()
							} , 600);
						}});
				} , function(error){
					uni.hideLoading();
					uni.showToast({ title: "请求网络失败!" , icon:'none'});
				});
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	.userinfo-list-item{
		display: flex;
		padding: 15px;
		padding-left: 15px;
		position: relative;
	}
	.userinfo-list-item>.title{
		color: #333;
		flex-shrink:0;
		margin-right: 10px;
		font-size: 15px;
	}
	.userinfo-list-item>.value{
		width: 100%;
		font-size: 15px;
	}
	.userinfo-list-item:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #e5e5e5
	}
</style>
