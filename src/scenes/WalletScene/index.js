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

class _WalletScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "WalletScene",
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
		this.props.setCurrentScene("WalletScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="E-Wallet"
					onMenu={this.onMenu}
				/>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const WalletScene1 = sideBarContainer(_WalletScene);
const WalletScene = userContainer(WalletScene1);
export default WalletScene;
