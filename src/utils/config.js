/**
 * Created by  2018/3/20.
 * 配置项
 * 首字母大写
 */

// 工作经验
export const WorkYears = {
	0: '1年以内',
	1: '1年',
	2: '2年',
	3: '3年',
	4: '4年',
	5: '5年',
	6: '6年',
	7: '7年',
	8: '8年',
	9: '9年',
	10: '10年',
	11: '11年',
	12: '12年',
	9999: '12年以上',
};
export const WorkYearss = [{
		id: [0, 0],
		name: '不限'
	},
	{
		id: [18, 25],
		name: '18-25岁'
	},
	{
		id: [26, 30],
		name: '26-30岁'
	},
	{
		id: [31, 35],
		name: '31-35岁'
	},
	{
		id: [36, 40],
		name: '36-40岁'
	},
	{
		id: [41, 9999],
		name: '40岁以上'
	}
];

// 求职状态
export const WorkState = {
	// 0: '不限',
	1: '在职，看看新机会',
	2: '在职，急需新工作',
	3: '在职，暂无跳槽打算',
	4: '离职，正在找工作'
};

// 背调状态
export const BackgroundState = {
	0: '未验证',
	1: '验证中',
	2: '已验证'
};
export const BackgroundStatus = {
	2: '未验证',
	3: '验证中',
	4: '已验证'
};

// 年龄
export const AgeRange = {
	0: '不限',
	1: '18-25岁',
	2: '26-30岁',
	3: '31-35岁',
	4: '36-40岁',
	5: '40岁以上'
};
// 证件类型
export const CertificateType = {

	1: '身份证',
	9: '其他'

};

// 年薪
export const AnnualSalary = {
	0: '不限',
	1: '10万以内',
	2: '10-20万',
	3: '20-30万',
	4: '30-50万',
	5: '50万以上'
};

// 学历
export const Degree = {
	'+0': '不限',
	'+1': '大专以下',
	'+2': '大专',
	'+3': '本科',
	'+8': '学士',
	'+9': '硕士研究生',
	'+4': '硕士',
	'+10':'博士研究生',
	'+5': '博士',
	'+6': '博士后',
	'+7': 'MBA'
};

// 婚姻状况
export const MarriedCase = {
	1: '未婚',
	2: '已婚未育',
	3: '已婚已育',
	4: '离异'
};

// 简历库-婚姻状况
export const MarriedStatus = {
	0: '不限',
	1: '未婚',
	2: '已婚未育',
	3: '已婚已育',
};

// 简历库-工作经验下拉
export const HouseWorkYear = {
	0: '不限',
	1: '3年及以下',
	2: '3-5年',
	3: '5-8年',
	4: '8-10年',
	5: '10年以上'
};

//简历库-工作状态-下拉
export const HouseWorkState = {
	0: '不限',
	1: '在职，看看新机会',
	2: '在职，急需新工作',
	3: '在职，暂无跳槽打算',
	4: '离职，正在找工作'
};

//简历库-学历-下拉
export const HouseDegree = {
	0: '不限',
	2: '大专及以上',
	3: '本科及以上',
	4: '硕士及以上',
	5: '博士及以上'
};

// 税前税后
export const PreTaxAfterTax = {
	1: '税前',
	2: '税后'
};

// 公司规模
export const Scale = {
	1: '1-49人',
	2: '50-99人',
	3: '100-499人',
	4: '500-999人',
	5: '1000-9999人',
	6: '10000人以上'
};

// 语言能力
export const Language = {
	1: '英语',
	2: '日语',
	3: '其他'
};

//语言等级
export const LanguageGrade = {
	1: '专业四级',
	2: '专业八级',
	3: 'CET4',
	4: 'CET6',
	5: 'PETS-1B',
	6: 'PETS-1',
	7: 'PETS-2',
	8: 'PETS-3',
	9: 'PETS-4',
	10: 'PETS-5',
	11: 'N1',
	12: 'N2',
	13: 'N3',
	14: 'N4',
	15: 'N5'
};

// 熟练程度
export const Proficiency = {
	1: '简单沟通',
	2: '读写精通',
	3: '商务洽谈',
	4: '同声翻译'
};

//预计到岗时间
export const ExpectEntryTime = {
	0: '随时到岗',
	1: '一周之内',
	2: '两周之内',
	3: '三周之内',
	4: '一个月内',
	5: '一个月以上'
};
//申诉类型
export const AppealType = {
	1: '联系方式错误',
	2: '教育经历造假',

};
//核查结果是否
export const IsReal = {
	1: '是',
	2: '否',
	3: '其他',

};
//核查结果
export const Realed = {
	1: '正确',
	2: '不符',
	3: '其他'

};
//违规记录
export const Violations = {
	1: '有',
	2: '无',
	3: '其他'

};
//综合评价
export const Comprehensive = {
	1: 'I级',
	2: 'II级',
	3: 'III级'

};
//简历来源
export const ResumeForm = {
	1: '智联招聘',
	2: '智联卓聘',
	3: '猎聘',
	4: '前程无忧',
	5: '阿波罗',
	6: '精英网',
	7: '顾问录入',
	8: '莲花',
	9: '安励',
	10: '无忧精英',
	11: '纷简历',
	12: '简历咖',
	13: '招聘狗',
};
//证明人来源
export const RespondentSource = {
	0: '候选人提供',
	1: '自主寻找'

};
//背调申请来源
export const dataSourceForm = {
	1: '阿波罗',
	2: '莲花',
	3: '猎你',
	4: '安励',
	5: '推幕'

};
//导出文档类型
export const FileType = {

	1: '.pdf',
	2: '.doc',
	

};

export const ResumeDropDown = {
	'ageRange': {
		keys: ['minAge', 'maxAge', 'ageRange', '岁'],
		select: 'ageSelect',
	},
	'workYearRange': {
		keys: ['minWorkYears', 'maxWorkYears', 'workYearRange', '年'],
		select: 'workYearSelect',
	},
	'currentSalaryRange': {
		keys: ['minCurrentSalary', 'maxCurrentSalary', 'currentSalaryRange', '万'],
		select: 'salarySelect',
	},
};

export default {
	WorkYears,

	WorkState,
	BackgroundState,
	AgeRange,
	CertificateType,
	AnnualSalary,
	Degree,
	MarriedCase,
	MarriedStatus,
	HouseWorkYear,
	Scale,
	Language,
	LanguageGrade,
	Proficiency,
	ResumeForm,
	dataSourceForm,
	HouseWorkState,
	HouseDegree,
	ResumeDropDown,

	Realed,
	IsReal,
	RespondentSource,
	Violations,
	Comprehensive,
	FileType,
	BackgroundStatus
}
