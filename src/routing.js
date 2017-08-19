import React from "react";
import { StackNavigator } from "react-navigation";
import { Text, TextInput } from "react-native";
import {
	SplashScene,
	MainScene,
	LoginScene,
} from "AppScenes";

Text.defaultProps = {
	allowFontScaling: false
};

TextInput.defaultProps = {
	underlineColorAndroid: "transparent"
};

export const Routing = StackNavigator({
	initialRouteName: { screen: SplashScene },
	Splash: { screen: SplashScene },
	Login: { screen: LoginScene },
	Main: { screen: MainScene },
});
