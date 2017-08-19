import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
});

class _MainScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "MainScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("MainScene");
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>MainScene</Text>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const MainScene1 = sideBarContainer(_MainScene);
const MainScene = userContainer(MainScene1);
export default MainScene;
