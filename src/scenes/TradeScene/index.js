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
import { HeaderBar } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
});

class _TradeScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "TradeScene",
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
		this.props.setCurrentScene("TradeScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Trade"
					onMenu={this.onMenu}
				/>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const TradeScene1 = sideBarContainer(_TradeScene);
const TradeScene = userContainer(TradeScene1);
export default TradeScene;
