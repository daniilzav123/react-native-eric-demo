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
	content: {
		paddingTop: 30,
		paddingHorizontal: 15,
	},
	transactionRecord: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class _ReportScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "ReportScene",
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
		this.props.setCurrentScene("ReportScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Report"
					onMenu={this.onMenu}
				/>
				<View
					style={styles.content}
				>
					<View style={styles.transactionRecord}>
						<Text>Purchase Transaction Record</Text>
					</View>
					<View style={styles.transactionRecord}>
						<Text>Profit Record</Text>
					</View>
				</View>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const ReportScene1 = sideBarContainer(_ReportScene);
const ReportScene = userContainer(ReportScene1);
export default ReportScene;
