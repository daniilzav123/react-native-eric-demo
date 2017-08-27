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
		myaccount: '我的账户',
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
	global_string: strings,
};
