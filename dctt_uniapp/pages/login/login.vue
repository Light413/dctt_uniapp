<template>
	<view style="display: flex;flex-direction: column;align-items: center;">
		<view style="margin-top: 50px;">
			<image src="../../static/images/new/600x153.png" mode="" style="width: 240px;height: 66px;"></image>
		</view>
		
		<view style="width: 100%; margin-top: 45px;">
			<view style="padding: 20px;">
				<input type="number" placeholder="请输入手机号" maxlength="11" v-model="phone"/>
				<input type="text"  password="true" placeholder="请输入密码" v-model="pwd" style="margin-top: 6px;"/>
				<button type="primary" style="margin-top: 60px; background-color: #FF4500;height: 45px;" v-on:click="login">登录</button>	
			</view>
			<view style="display: flex;">
				<view style="margin-left: 30px;width: 100%;" v-on:click="register">
					<text class="login-btn">注册账号</text>
				</view>
				<view style="flex-shrink: 0;margin-right: 30px;" v-on:click="findPassword">
					<text class="login-btn">找回密码</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var api = require('@/common/p/api.js');
	
	export default{
		data(){
			return {
				phone:'',
				pwd:''
			}
		},
		
		methods:{
			login(){
				var phone = this.phone;
				var pwd = this.pwd;
				if(phone.length != 11){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					});return;
				}
				
				if(pwd.length < 6){
					uni.showToast({
						title:"请输入正确的密码",
						icon:"none"
					});return;
				}
				// /^1[0-9]{10}$/
				// /^1(3|4|5|7|8)\d{9}$/
				if(!(/^1[0-9]{10}$/.test(phone))){ 
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					}); return; 
				} 
				
				var d = {'phone_number':phone , 'pwd':pwd};
				uni.showLoading({
					title: '登录中',
					mask: true
				});
				
				api.post(api.url.login , d , res =>{
					// console.log("res: " + JSON.stringify(res));
					uni.hideLoading();
					uni.setStorageSync('loginuserinfo' ,res);
					uni.$emit('userloginsuccess');
					uni.showToast({
						title:'登录成功!',
						success:function(res){
							setTimeout(function(){
								uni.navigateBack()
							} , 500);
						}
					})
				} ,error =>{
					uni.hideLoading();
					uni.showToast({
						title:error,
						icon:"none"
					})
				})
			},
			register(){
				uni.navigateTo({
					url:"register"
				})
			},
			findPassword(){
				
			}
		}
	}
</script>

<style>
	input{
		padding: 15px;
		text-align: center;
		border-width: 0;
		border-bottom-width: 1px;
		border-color: #f0f0f0;
		border-style: solid;
		font-size: 15px;
	}
	.login-btn{
		color: #434343;
		font-size: 13px;
		background-color: white;
		border-width: 0;
		border-radius: 0;
	}

/* 	uni-button:after {
	    content: " ";
	    width: 200%;
	    height: 200%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    border: 0px solid rgba(0,0,0,0);
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    box-sizing: border-box;
	    border-radius: 0px;
	}
	 */
</style>
