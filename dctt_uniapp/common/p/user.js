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

function userAvatar(user , defaultAvatar){
	var u_avatar = user['avatar_thumb'];
	if(u_avatar == null || u_avatar == ''){
		u_avatar = defaultAvatar;
	}
	return u_avatar;
}
			
module.exports = {
	userInfo:getUserInfo,
	uid:getLoginUid,
	isLogined:userHasLogined
}