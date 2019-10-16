/**
 * 当前登录用户信息
 */

//用户ID
function getLoginUid(){
	var u = getUserInfo();
	if(!u){return ;}
	return u['user_id'];
}

//是否登录
function userHasLogined(){
	var b = getLoginUid() != null;
	if(!b){
		console.log('还没有登录....');
	}
	return b;
}


function getUserInfo(){
	var s = uni.getStorageSync('loginuserinfo');
	return s;
}

//获取动态列表缩略图
function getDtImageUrl(thumbUrl , defaultUrl){
	if(thumbUrl){
		thumbUrl = thumbUrl.replace('.jpg' , '_thumb.jpg');
	}
	
	return thumbUrl || defaultUrl;
}

module.exports = {
	userInfo:getUserInfo,
	uid:getLoginUid,
	isLogined:userHasLogined
}