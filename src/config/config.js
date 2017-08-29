import Dimensions from "Dimensions";
import { Platform, StatusBar } from "react-native";
import LocalizedStrings from 'react-native-localization';
const strings = new LocalizedStrings({
	en:{
		home: 'Home',
		newsupdate: 'News Update',
		genealogy: 'Genealogy',
		mgntrade: 'MGN Trade',
		exchangemarket: 'Exchange Market',
		products: 'Products',
		ewallet: 'E-Wallet',
		report: 'Report',
		helpdesk: 'Helpdesk',
		myaccount: 'My Account',
		myaccountoverview: 'My Account Overview',
		cashpoint: 'CASH POINT',
		tradepoint: 'TRADE POINT',
		bonustradepoint: 'BONUS TRADE POINT',
		gamepoint: 'GAME POINT',
		achievedrank: 'Achieved Rank',
		name: 'Name',
		id: 'ID',
		investment: 'Investment',
		email: 'Email',
		sponsoredmembers: 'Sponsored Members',
		sponsoredbv: 'Sponsored BV',
		eprofitmaxcap: 'E-Profit Max Cap',
		sponsor: 'Sponsor',
		group: 'Group',
		registernewmember: 'Register New Member',
		addmessage: 'Add Message',
		add: 'Add',
		subject: 'Subject',
		question: 'Question',
		accessplatform: 'Access Platform (MGN)',
		trade: 'Trade',
		datejoined: 'Date Joined',
		gender: 'Gender',
		male: 'Male',
		female: 'Female',
		oldpassword: 'Old Password',
		password: 'Password',
		confirmpassword: 'Confirm Password',
		oldsecondpassword: 'Old Sec Password',
		secondpassword: 'Second Password',
		confirmsecondpassword: 'Confirm Sec Password',
		country: 'Country',
		hpnumber: 'HP Number',
		update: 'Update',
		logout: 'Logout',
		clubmemberlogin: 'Club Member Login',
		login: 'Login',
		forgotpassword: 'Forgot Password',
		title: 'Title',
		date: 'Date',
		userid: 'User ID',
		departmentname: 'Department Name',
		reply: 'Reply',
		answer: 'Answer',
		period: 'Period',
		sponsorbonus: 'SPONSOR BONUS',
		groupbonus: 'GROUP BONUS',
		leadershipbonus: 'LEADERSHIP BONUS',
	},
	ch: {
		home: '主页',
		newsupdate: '最新公告',
		genealogy: '组织图',
		mgntrade: 'MGN交易平台',
		exchangemarket: '兑换市场',
		products: '产品',
		ewallet: '电子账户',
		report: '报告',
		helpdesk: '服务台',
		myaccount: '我的账户',
		myaccountoverview: '我的账户信息',
		cashpoint: '现金货币',
		tradepoint: '贸易货币',
		bonustradepoint: '红利贸易货币',
		gamepoint: '游戏货币',
		achievedrank: '取得级别',
		name: '名字',
		id: '账号',
		investment: '投资',
		email: '电子邮件',
		sponsoredmembers: '直推人数',
		sponsoredbv: '直推人BV',
		eprofitmaxcap: '最高盈利顶线',
		sponsor: '推荐图',
		group: '团队图',
		registernewmember: '注册新会员',
		addmessage: '添加留言',
		add: '添加',
		subject: '标题',
		question: '问题',
		accessplatform: '登入平台 (MGN)',
		trade: '交易平台',
		datejoined: '注册日期',
		gender: '性别',
		male: '男性',
		female: '女性',
		oldpassword: '旧密码',
		password: '密码',
		confirmpassword: '确认密码',
		oldsecondpassword: '旧二级密码',
		secondpassword: '二级密码',
		confirmsecondpassword: '确认二级密码',
		country: '国家',
		hpnumber: '手机号码',
		update: '保存',
		logout: '登出',
		clubmemberlogin: '俱乐部会员登录',
		login: '登入',
		forgotpassword: '重置密码',
		title: '标题',
		date: '日期/时间',
		userid: '会员帐号',
		departmentname: '询问部门',
		reply: '回复',
		answer: '回答',
		period: '日期',
		sponsorbonus: '领导奖金',
		groupbonus: '团队奖金',
		leadershipbonus: '推荐奖金',
	},
	ml: {
		home: 'Utama',
		newsupdate: 'Berita Terkini',
		genealogy: 'Genealogi',
		mgntrade: 'MGN Perdagangan',
		exchangemarket: 'Pasaran Pertukaran',
		products: 'Produk',
		ewallet: 'E-Wallet',
		report: 'Laporan',
		helpdesk: 'Perkhidmatan',
		myaccount: 'Akaun Saya',
		myaccountoverview: 'Maklumat Akaun',
		cashpoint: 'MATA WANG TUNAI',
		tradepoint: 'MATA WANG PERDAGANGAN',
		bonustradepoint: 'MATA WANG PERDAGANGAN BONUS',
		gamepoint: 'MATA WANG PERMAINAN',
		achievedrank: 'Kedudukan',
		name: 'Nama',
		id: 'ID',
		investment: 'Pelaburan',
		email: 'E-mel',
		sponsoredmembers: 'Ahli Menaja',
		sponsoredbv: 'Sponsored BV',
		eprofitmaxcap: 'E-Profit Max Cap',
		sponsor: 'Penaja',
		group: 'Kumpulan',
		registernewmember: 'Mendaftar Ahli Baru',
		addmessage: 'Tambah Mesej',
		add: 'Tambah',
		subject: 'Subjek',
		question: 'Pertanyaan',
		accessplatform: 'Platform Access (MGN)',
		trade: 'Perdagangan',
		datejoined: 'Tarikh Pendaftaran',
		gender: 'Jantina',
		male: 'Lelaki',
		female: 'Perempuan',
		oldpassword: 'Kata Laluan lama',
		password: 'Kata Laluan',
		confirmpassword: 'Mengesahkan Kata Laluan',
		oldsecondpassword: 'Kata laluan Menengah lama',
		secondpassword: 'Kata Laluan menengah',
		confirmsecondpassword: 'Mengesahkan kata laluan menengah',
		country: 'Negara',
		hpnumber: 'Nombor Telefon Bimbit',
		update: 'Update',
		logout: 'Log Keluar',
		clubmemberlogin: 'Log masuk ahli kelab',
		login: 'Log Masuk',
		forgotpassword: 'Reset kata Laluan',
		title: 'Tajuk',
		date: 'Tarikh',
		userid: 'ID Ahli',
		departmentname: 'Nama Jabatan',
		reply: 'Membalas',
		answer: 'Jawapannya',
		period: 'Tarikh',
		sponsorbonus: 'Bonus Sponsor',
		groupbonus: 'Bonus Kumpulan',
		leadershipbonus: 'Bonus Pemimpin',
	}
});

const window = Dimensions.get("window");

export default {
	// App Details
	appName: "Demo",

	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// public variables

	// --- colors
	primaryColor: "#f9f9f9",

	// api
	apiUrl: 'http://amapi.ezymlm.net/',
	accessToken: "",

	//datas
	dashboard_data: [],
	news_data: [],
	bank_data: [],
	sponsor_data: [],
	group_data: [],
	ticket_data: [],
	ticket_repy_data: [],
	dep_data: [],
	profit_data: [],
	global_string: strings,
};
