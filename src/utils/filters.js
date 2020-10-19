
import { local, utils } from './index'
import config from './config'

// 缓存学历数据  
let degreesObj = {};
// 学历过滤 id => 名称
export const DEGREES = (id) => {
	if(!Object.keys(degreesObj).length) {
		degreesObj = local.getObject('degreesObj');
	}
	return degreesObj[id] ? degreesObj[id].name : '';
}
//最高学历
export const HIGHESTDEGREE = (num) => {
	return config.Degree['+'+num] ? config.Degree['+'+num] : "";
}
// 缓存城市数据  
let locationsObj = {};
// 城市过滤 id => 名称
export const CITY = (id) => {
	if(!Object.keys(locationsObj).length) {
		locationsObj = local.getObject('locationsObj');
	}
	return locationsObj[id] ? locationsObj[id].name : '';
}
// 城市数组类型
export const CITYARR = (arr, type) => {
	if(!Object.keys(locationsObj).length) {
		locationsObj = local.getObject('locationsObj');
	}
	let result = []
	arr && arr.forEach(value => {
		if(locationsObj[value]) {
			result.push(locationsObj[value].name)
		}
	})
	return result.join(type || '，');
}

// 缓存行业数据  
let industrysObj = {};
// 行业过滤 id => 名称
export const INDUSTRY = (id) => {
	if(!Object.keys(industrysObj).length) {
		industrysObj = local.getObject('industrysObj');
	}
	return industrysObj[id] ? industrysObj[id].name : '';
}
// 行业数组类型
export const INDUSTRYARR = (arr, type) => {
	if(!Object.keys(industrysObj).length) {
		industrysObj = local.getObject('industrysObj');
	}
	let result = []
	arr && arr.forEach(value => {
		if(industrysObj[value]) {
			result.push(industrysObj[value].name)
		}
	})
	return result.join(type || '，');

}
// 期望职位数组类型
export const JOBARR = (arr, type) => {
	let result = []
	arr && arr.forEach(value => {
		result.push(value)
	})
	return result.join(type || '，');

}
// 工作年限
export const WORKYEARS = (num) => {
	if(num > 12) {
		return '12年以上';
	} else {
		return config.WorkYears[num];
	}
}

// 年龄
export const AGE = (age) => {
	return age ? ((new Date()).getFullYear() - age) + '岁' : "";
}
// 证件类型
export const CERTIFICATETYPE = (num) => {
	return config.CertificateType[num];
}

// // 求职状态
export const WORKSTATE = (num) => {
	return config.WorkState[num];
}

// // 背调状态
export const BACKGROUNDSTATE = (num) => {
	return config.BackgroundState[num] ? config.BackgroundState[num] : ""
}
export const BACKGROUNDSTATUS = (num) => {
	return config.BackgroundStatus[num] ? config.BackgroundStatus[num] : ""
}
// 婚姻状况
export const MARRIEDCASE = (num) => {
	return config.MarriedCase[num];
}

// 公司规模
export const SCALE = (num) => {
	return config.Scale[num];
}
// // 文本转html
export const NEWLINE = (str) => {
	return str ? str.replace(/\n/g, '<br>') : '';
}

// 语言能力
export const LANGUAGE = (num) => {
	return config.Language[num];
}

// 语言等级
export const LANGUAGEGRADE = (num) => {
	return config.LanguageGrade[num];
}

// 熟练程度
export const PROFICIENCY = (num) => {
	return config.Proficiency[num];
}
// 时间
export const DATE = (date, fmt) => {
	if(!date) {
		return ''
	}
	var date = new Date(date * 1);
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for(let k in o) {
		if(new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
		}
	}
	return fmt;
}

// 时间戳转年月
export const TOYEARMONTHSLOT = (startYear, startMonth, endYear, endMonth) => {
	let result = '';
	var date = new Date();
	if(!endYear || endYear == 9999) {
		// endYear = (Vue.filter('date')( new Date(), 'yyyy-MM').split('-'))[0];
		// endMonth = (Vue.filter('date')( new Date(), 'yyyy-MM').split('-'))[1];
		endYear = date.getFullYear();
		endMonth = date.getMonth() + 1;
	}
	if(parseInt(endMonth) < parseInt(startMonth)) {
		endMonth = parseInt(endMonth) + 12;
		endYear = parseInt(endYear) - 1;
	}

	result += (endYear - parseInt(startYear)) ? (endYear - parseInt(startYear)) + '年' : '';
	result += (endMonth - parseInt(startMonth)) ? (endMonth - parseInt(startMonth)) + '个月' : '';

	return result ? result : '不足一个月';
}

// 简历来源
export const RESUMEFORM = (num) => {
	return config.ResumeForm[num];
}

//截字符串
export const SUBSTR = (str, num) => {
	var str = str || '';
	return(str.length > num ? str.substring(0, num) + '...' : str);
}

//保留几位小数、不四舍五入
// amount 保留位数
export const SAVEPOINT = (number, amount = 0) => {
	var str = '',
		result;

	if(typeof + number !== 'number') {
		return '';
	}

	str = number + '';

	if(str.lastIndexOf('.') == -1) {

		return number;
	} else {

		result = +str.substring(0, str.lastIndexOf('.') + amount + 1);
		return result;
	}
}

// 性别
export const GRENDER = (num) => {
	let grender = ['女', '男']
	return grender[num] ? grender[num] : '未知';
}

// 简历来源
export const RECORDTYPE = (num) => {
	return config.ResumeForm[num] ? config.ResumeForm[num] : '';
}
// 背调来源
export const DATASOURCETYPE = (num) => {
	return config.dataSourceForm[num];
}
// 核查结果是否
export const ISREAL = (num) => {
	return config.IsReal[num] ? config.IsReal[num] : '';
}
// 核查结果
export const REALED = (num) => {
	return config.Realed[num] ? config.Realed[num] : '';
}
// 违规记录
export const VIOLATIONS = (num) => {
	return config.Violations[num] ? config.Violations[num] : '见说明';
}
// 综合评价
export const COMPREHENSIVE = (num) => {
	return config.Comprehensive[num] ? config.Comprehensive[num] : '';
}
// 证明人来源
export const RESPONDENTSOURCE = (num) => {
	return config.RespondentSource[num] ? config.RespondentSource[num] : '';
}
// 导出文档类型
export const FILETYPE = (num) => {
	return config.FileType[num] ? config.FileType[num] : '';
}
// 网址加前缀
export const SETURL = (str) => {
	if(!str) {
		return '';
	};
	if(str.indexOf("://") < 0) {
		return '//' + str;
	} else {
		return str;
	}
}

export default {
	WORKYEARS,
	AGE,
	CERTIFICATETYPE,
	CITY,
	CITYARR,
	DATE,
	SUBSTR,
	SAVEPOINT,
	DEGREES,
	HIGHESTDEGREE,
	BACKGROUNDSTATE,
	BACKGROUNDSTATUS,
	INDUSTRY,
	INDUSTRYARR,
	JOBARR,
	GRENDER,

	WORKSTATE,
	MARRIEDCASE,
	// PRETAXAFTERTAX,	
	SCALE,
	NEWLINE,
	TOYEARMONTHSLOT,
	LANGUAGE,
	PROFICIENCY,
	// EXPECTENTRYTIME,
	// APPEALTYPE,
	REALED,
	ISREAL,
	LANGUAGEGRADE,
	RESUMEFORM,
	RECORDTYPE,
	DATASOURCETYPE,
	SETURL,
	RESPONDENTSOURCE,
	VIOLATIONS,
	COMPREHENSIVE,
	FILETYPE
}