import Dimensions from "Dimensions";
import { Platform, StatusBar } from "react-native";

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
};
