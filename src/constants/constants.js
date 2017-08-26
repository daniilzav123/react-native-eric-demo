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
export const matrix = [{
	X1Y1: {
		x: 1,
		y: 8,
	},
	X2Y1: {
		x: 2,
		y: 4,
	},
	X2Y2: {
		x: 2,
		y: 12,
	},
	X3Y1: {
		x: 3,
		y: 2,
	},
	X3Y2: {
		x: 3,
		y: 6,
	},
	X3Y3: {
		x: 3,
		y: 10,
	},
	X3Y4: {
		x: 3,
		y: 14,
	},
	X4Y1: {
		x: 4,
		y: 1,
	},
	X4Y2: {
		x: 4,
		y: 3,
	},
	X4Y3: {
		x: 4,
		y: 5,
	},
	X4Y4: {
		x: 4,
		y: 7,
	},
	X4Y5: {
		x: 4,
		y: 9,
	},
	X4Y6: {
		x: 4,
		y: 11,
	},
	X4Y7: {
		x: 4,
		y: 13,
	},
	X4Y8: {
		x: 4,
		y: 15,
	},
}];