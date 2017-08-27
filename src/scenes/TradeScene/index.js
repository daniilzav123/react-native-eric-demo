import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	Linking,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { HeaderBar } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	accessContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	access: {
		backgroundColor: 'steelblue',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 10,
	}
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

	open = () => {
		Linking.openURL('https://mgntrade.biz/trade_login');
	};

	render() {
		const { global_string } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={global_string.trade}
					onMenu={this.onMenu}
				/>
				<View style={styles.accessContainer}>
					<TouchableOpacity style={styles.access} onPress={this.open}>
						<Text style={{ color: 'white' }}>{global_string.accessplatform}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const TradeScene1 = sideBarContainer(_TradeScene);
const TradeScene = userContainer(TradeScene1);
export default TradeScene;
