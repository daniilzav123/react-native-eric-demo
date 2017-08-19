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

class _GenealogyScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "GenealogyScene",
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
		this.props.setCurrentScene("GenealogyScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Genealogy"
					onMenu={this.onMenu}
				/>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const GenealogyScene1 = sideBarContainer(_GenealogyScene);
const GenealogyScene = userContainer(GenealogyScene1);
export default GenealogyScene;
