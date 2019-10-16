<template>
	<view>
		<picker mode="multiSelector" :range="dateSelectorRange" :value="selectedDateValue" @columnchange="onDateColumnChange"
		 @change="onDateChange">
			<view>{{currSelectedDate}}</view>
		</picker>
	</view>
</template>

<script>
	const currDate = new Date();
	const currYear = currDate.getFullYear();
	const currMonth = currDate.getMonth() + 1;
	const currDay = currDate.getDate();

	var _selectedY,_selectedM,_selectedD;
	
	export default {
		props: {
			config: {
				type: Object,
				default: function() {
					return {
						initType: "ymd",
						yearsBefore: 5,
						yearsAfter: 5,
						initDate:""
					}
				}
			}
		},
		data() {
			return {
				yyyyArr: [],
				mmArr: [],
				ddArr: [],
				currSelectedDate:"",
				selectedDateValue:null
			};
		},
		computed: {
			dateSelectorRange: function() {
				const _this = this;
				if ("ym" == _this.config.initType) {
					return [_this.yyyyArr, _this.mmArr];
				} else {
					return [_this.yyyyArr, _this.mmArr, _this.ddArr];
				}
			}
		},
		created() {
			const _this = this;
			// console.log("======created=====",_this.config);
			_this.getYearArr();
			_this.getMMArr();
			let mmStr = (currMonth < 10 ? "0" + currMonth : currMonth);
			if ("ym" != _this.config.initType) {
				if(_this.config.initDate){
					_this.currSelectedDate = _this.config.initDate;
				}else{
					_this.currSelectedDate = currYear + "-" + mmStr + "-" + (currDay < 10 ? "0" + currDay :currDay);  //创建时默认选中当前日期
				}
				_this.getDDArr(currYear,mmStr);
			} else {
				if(_this.config.initDate){
					_this.currSelectedDate = _this.config.initDate;
				}else{
					_this.currSelectedDate = currYear + "-" + mmStr;
				}
			}
			_this.initSelectedDateValue();
		},
		methods: {
			getYearArr() {
				//根据配置获取年份数组
				const _this = this;
				if (_this.config.yearsAfter && _this.config.yearsAfter > 0) {
					for (let i = 0; i < _this.config.yearsAfter; i++) {
						_this.yyyyArr.push(currYear + _this.config.yearsAfter - i);
					}
				}
				_this.yyyyArr.push(currYear);
				if (_this.config.yearsBefore && _this.config.yearsBefore > 0) {
					for (let i = 1; i <= _this.config.yearsBefore; i++) {
						_this.yyyyArr.push(currYear - i);
					}
				}
				
				_this.yyyyArr = _this.yyyyArr.reverse()
			},
			getMMArr() {
				//初始化月份数组
				const _this = this;
				for (let i = 1; i <= 12; i++) {
					_this.mmArr.push(i < 10 ? "0" + i : ""+i);
				}
			},
			getDDArr(y,m) {
				//根据当前选中的年月动态计算天数数组
				const _this = this;
				let mmDays = 31;
				if(["04","06","09","11"].indexOf(m)>=0){
					mmDays = 30;
				}else if("02"==m){
					if(y%400==0 || (y%4==0 && y%100!=0) ){
						mmDays = 29;
					}else{
						mmDays = 28;
					}
				}else{
					mmDays = 31;
				}
				_this.ddArr = [];
				for (let i = 1; i <= mmDays; i++) {
					_this.ddArr.push(i < 10 ? "0" + i : ""+i);
				}
			},
			initSelectedDateValue(){
				const _this = this;
				if(_this.currSelectedDate && _this.currSelectedDate.indexOf("-")>0){
					let dateArr = _this.currSelectedDate.split("-");
					
					if(2 == dateArr.length || 3 == dateArr.length){
						let yyyyIdx = 0;
						let mmIdx = 0;
						for (let i = 0; i < _this.yyyyArr.length; i++) {
							if(_this.yyyyArr[i] == dateArr[0]){
								yyyyIdx = i;
								break;
							}
						}
						for (let j = 0; j < _this.mmArr.length; j++) {
							if(_this.mmArr[j] == dateArr[1]){
								mmIdx = j;
								break;
							}
						}
						
						if(3 == dateArr.length && "ym" != _this.config.initType){
							let ddIdx = 0;
							for (let k = 0; k < _this.ddArr.length; k++) {
								if(_this.ddArr[k] == dateArr[2]){
									ddIdx = k;
									break;
								}
							}
							_this.selectedDateValue = [yyyyIdx,mmIdx,ddIdx];
						}else{
							_this.selectedDateValue = [yyyyIdx,mmIdx];
						}
					}else{
						uni.showToast({
							icon:"none",
							title:"初始化日期格式错误"
						});
					}
				}
			},
			onDateColumnChange(e) {
				const _this = this;
				// this.$emit("onDateColumnChange", e);
				if(_this.selectedDateValue && _this.selectedDateValue.length>0){
					_this.selectedDateValue[e.detail.column] = e.detail.value;
				}
				if("ym" != _this.config.initType){
					if(0 == e.detail.column){
						let _yy = _this.yyyyArr[e.detail.value];
						let _mm = _this.mmArr[_this.selectedDateValue[1]];
						
						_this.getDDArr(_yy,_mm);
					}else if(1 == e.detail.column){
						let _yy = _this.yyyyArr[_this.selectedDateValue[0]];
						let _mm = _this.mmArr[e.detail.value];
						_this.getDDArr(_yy,_mm);
					}else{
						//日变化无需处理
					}
					if(_this.selectedDateValue[2]>=_this.ddArr.length){
						_this.selectedDateValue[2] = _this.ddArr.length - 1;
					}
				}
			},
			onDateChange(e) {
				let yyyy = this.dateSelectorRange[0][e.detail.value[0]];
				let mm = this.dateSelectorRange[1][e.detail.value[1]];
				if("ym"!=this.config.initType){
					let dd = this.dateSelectorRange[2][e.detail.value[2]];
					this.currSelectedDate = `${yyyy}-${mm}-${dd}`;
				}else{
					this.currSelectedDate = `${yyyy}-${mm}`;
				}
				this.$emit("onDateChange", {
					value: this.currSelectedDate
				});
			},
			initDate(d){
				console.log("=======initDate========",d);
				const _this = this;
				_this.currSelectedDate = d;
				_this.initSelectedDateValue();
			}
		}
	}
</script>

<style>
</style>
