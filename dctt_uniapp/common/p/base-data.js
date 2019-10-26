var homeTopItems = [
	{
		text:'热门',
		image:'heme-top1.png',
		type:1
	},
		{
		text:'打听',
		image:'heme-top2.png',
		type:11
	},
		{
		text:'吐槽',
		image:'heme-top3.png',
		type:12
	},
		{
		text:'公告',
		image:'heme-top4.png',
		type:13
	},
		{
		text:'商家',
		image:'home-top-sj@2x.png',
		type:14,
		invaild:1
	},
			{
		text:'相亲交友',
		image:'home-top-jy@2x.png',
		type:15,
		invaild:1
	},
		{
		text:'求职招聘',
		image:'home-top-qz@2x.png',
		type:16,
		invaild:1
	},{
		text:'便民信息',
		image:'home-top-more@2x.png',
		type:17
	}
];


///用于列表查询
var titleForType = {
	'10':'新鲜事',
	// '11':'活动',
	'11':'打听',
	'12':'吐槽',
	'13':'公告',
	'20':'吃喝玩乐',
	'21':'求职招聘',
	'22':'商家信息',
	'23':'相亲交友',
	'24':'房屋信息',
	'25':'打车出行',
	'26':'二手交易',
	'27':'便民信息'
}

//首页列表可用的数据类型
var homeAvaliableItemType = ['10' , '11' , '12' , '13' , '14' , '15'];

//分类数据
var itemType = [
	[
		{
			'id':'10',	
			'text':'新鲜事',
		},
		{
			'id':'11',	
			'text':'打听',
		},
		{
			'id':'12',	
			'text':'吐槽',
		},
		{
			'id':'13',	
			'text':'公告',
		}
	],
	[{
		'id':'20',	
		'title':'吃喝玩乐',
	},
	{
		'id':'21',	
		'title':'求职招聘',
	},
	{
		'id':'22',	
		'title':'商家信息',
	},
	{
		'id':'23',	
		'title':'相亲交友',
	},
	{
		'id':'24',	
		'title':'房屋信息',
	},
	{
		'id':'25',	
		'title':'打车出行',
	},
	{
		'id':'26',	
		'title':'二手交易',
	},
	{
		'id':'27',	
		'title':'便民信息',
	}]
	];

//发布类型
var itemType_new = [
	[
		[
			{
				'id':'10',	
				'text':'新鲜事',
			},
			{
				'id':'11',	
				'text':'打听',
			}
		],
		[
			{
				'id':'12',	
				'text':'吐槽',
			},
			{
				'id':'13',	
				'text':'公告',
			}
		]
	],
	[
		[
			{
				'id':'21',	
				'text':'求职招聘',
			},
			{
				'id':'22',	
				'text':'商家信息',
			},
		],
		[
			{
				'id':'23',	
				'text':'相亲交友',
			},
			{
				'id':'27',	
				'text':'便民信息',
			}
		]
	]
];
		
		
//动态审核状态
var itemStatus = {
	'0':'待审核',
	'1':'已通过',
	'2':'未通过',
};

function postSubType(t1,t2){
	var s ='';
	switch (t1){
		case '21': s = t2 == 1 ? '招聘' : '求职';break;
		case '23': s = t2 == 1 ? '我是女生' : '我是男生';break;
		case '24':s = t2 == 1 ? '我要找房' : '我是房主';break;
		case '25':s = t2 == 1 ? '人找车' : '车找人';break;
		default:break;
	}
	return s;
}

module.exports = {
	titleForType:titleForType,
	homeAvaliableItemType:homeAvaliableItemType,
	itemType:itemType_new,
	itemStatus:itemStatus,
	homeTopItems:homeTopItems,
	postSubType:postSubType
}