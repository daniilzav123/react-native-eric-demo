import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const NAVBAR_MARGIN_HORIZONTAL = 15;
export const OPEN_MENU_OFFSET = WINDOW_WIDTH * 5.8 / 7;
export const MINIMIZE_OFFSET = WINDOW_WIDTH * 6 / 7;
export const STATES = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA"
];
