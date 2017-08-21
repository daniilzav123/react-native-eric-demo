import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { HeaderBar } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	modalContainer: {
		width: AppConfig.windowWidth - 100,
		height: AppConfig.windowWidth - 30,
		marginLeft: 30,
		marginTop: 40,
		backgroundColor: 'white',
		alignItems: "center",
		justifyContent: "center"
	},
	shadowHide: {
		position: "absolute",
		width: AppConfig.windowWidth,
		height: AppConfig.windowHeight,
		backgroundColor: "transparent"
	},
	line: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		justifyContent: 'space-between'
	}
});

class _HelpdeskScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "HelpdeskScene",
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
		this.props.setCurrentScene("HelpdeskScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	updateDatas = () => {
		alert('update');
	};

	onAddTicket = () => {
		this.props.navigation.navigate("AddTicket", {
			callback: this.updateDatas,
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Helpdesk"
					onMenu={this.onMenu}
					spec="Helpdesk"
					onAddTicket={this.onAddTicket}
				/>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const HelpdeskScene1 = sideBarContainer(_HelpdeskScene);
const HelpdeskScene = userContainer(HelpdeskScene1);
export default HelpdeskScene;
