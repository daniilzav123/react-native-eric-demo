import React, { PropTypes, Component } from "react";
import {
	View,
	StatusBar,
	Platform,
	StyleSheet,
	Animated
} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white"
	},
});

class SplashScene extends Component {
	static propTypes = {
	};
	static navigationOptions = {
		title: "SplashScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
		const isFirst = await GlobalStorage.getItem(AppConfig.stor_isFirst);
	}

	render() {
		return (
			<View style={styles.container}>
			</View>
		);
	}
}

export default SplashScene;
