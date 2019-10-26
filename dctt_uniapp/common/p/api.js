//api接口定义
var URL = {
	base:'http://39.106.164.101:80/tt/',
	getsy:'getPostList.php',
	detail:'getSinglePost.php',
	publish:'publish.php',
	comment:'comment.php',
	dtdetail:'detail.php',
	update_profile:'updateProfile.php',
	homepage:'getsc.php',
	fans:'fan.php',
	blackList:'blackList.php',
	delete_sc:'deletesc.php',
	sh:'sh.php',
	daren:'darenList.php',
	login:'login.php',
	register:'register.php',
	get_checkcode:'sendCheckCode.php',
	get_msglist:'message.php',
	jubao:'jubao.php',
	feedback:'feedback.php',
	check_version:'checkUpdate.php',
	//html
	publish_note :'p/publishNotes.html',//发布须知
	user_agreement : "p/userAgreement.html",
	aboutus_url : "p/aboutus.html",
	contactus : "p/contactus.html",
	disclaimer : "p/disclaimer.html",
	usehelp: "p/usehelp.html",
	privacy_agreement:"p/userPrivacy.html",
	feedbackList:"p/feedbackList.html",
	joinus:"p/joinus.html"
}

//http://39.106.164.101:80/tt/p/feedbackList.html
//全局变量
var add_score_share = 2;//分享
var add_score_login = 1;//每日登陆
var dt_type_sy = 'sy';//动态类型
var dt_type_zt = 'zt';
var dt_type_life = 'life';
//根据type获取动态分类（首页、专题、生活）
function getItemCategory(type){
	var _category = dt_type_life;
	var _type = type;
	switch (_type){
		case '10':
		case '11':
		case '12':
		case '13':
		case '14':
		case '15':
		_category = dt_type_sy;break;
		case '6':_category = dt_type_zt;break;
		default:break;
	}
	
	return _category;
}


/**Post
 * type:请求类型
 * url:地址
 * pars:参数
 * success:成功回调
 * error:失败回调
 */
function uniPost(url , pars , success , error){
	uni.getNetworkType({
		success: (res) => {
			console.log("---netType: " + JSON.stringify(res));
			// if(res.networkType == 'none')uni.showToast({title:'无法连接网络' , icon:"none"});
		}
	});

	var _url = URL.base + url;
	// var token , userJsonStr = localStorage.getItem("loginuserinfo");
	// if(userJsonStr){
	// 	var _u = JSON.parse(userJsonStr);
	// 	if(_u && _u['token']){
	// 		token = _u['token'];pars['t'] = token;
	// 		if(pars['z'] != 1){//1不需要当前uid , 获取他人
	// 			pars['uid'] = _u['user_id'];//UID和token一起为了验证用户合法性
	// 		}
	// 		// pars['z'] && delete pars.z;
	// 	}
	// }
		
	uni.request({url:_url,method:"POST",
		header:{"content-type":"application/x-www-form-urlencoded"},
		dataType:"json",
		data:pars,
		success: res =>{
			// console.log("====res: " + JSON.stringify(res));
			var data = res.data;
			if(data.status == 200) {
				console.log("request ok");
				success(data.body);
			}else{
				if(error)error(data['msg'] || '服务器返回错误');
			}
		},
		fail: (data, code) => {
			var err = '请求网络失败' + JSON.stringify(data);
			console.log("post error: " + err)
			if(error){error(err);}
		}
});
}

/**
 * @param {Object} url
 * @param {Object} pars
 * @param {Object} files
 * @param {Object} success
 * @param {Object} error
 */
function uniUploadFile(url , pars , files, success , error){
	var igs = files.map((value, index) => {return {name: "files[" + index + ']',uri: value}});
	//用户权限验证参数
	
	//console.log("pars:" + JSON.stringify(pars));//return;
	uni.uploadFile({
	    url: URL.base + url,
	    files: igs,
	    formData: pars,
	    success: (res) => {
			var code = res.statusCode , dataStr = res.data;
			var obj = JSON.parse(dataStr);
			if(obj.status == 200 && code == 200) {
				success(obj.body);
			}else{
				if(error)error(obj['msg'] || '服务器返回错误');
			}
	    },
	    fail: (res) => {
			if(error)error(res);return;
			uni.showToast({ title: "请求网络失败!",icon:'none'});
	    }
	});
}

module.exports = {
	post:uniPost,
	url:URL,
	uploadfile:uniUploadFile,
	postType:getItemCategory
}

/*
{
	"data": {
		"status": 200,
		"msg": "ok",
		"body": []
	},
	"statusCode": 200,
	"header": {
		"connection": "Keep-Alive",
		"content-type": "application/json;charset=UTF-8",
		"date": "Thu, 26 Sep 2019 07:09:18 GMT",
		"keep-alive": "timeout=5, max=100",
		"server": "Apache/2.4.6 (CentOS) PHP/5.6.31",
		"transfer-encoding": "Identity",
		"x-powered-by": "PHP/5.6.31"
	},
	"errMsg": "request:ok"
}
*/