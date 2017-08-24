import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ListView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { HeaderBar } from "AppComponents"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
	redTxt: {
		fontSize: 17,
		color: '#561e19',
		marginTop: 15,
		fontWeight: 'bold'
	},
	addBank: {
		backgroundColor: 'steelblue',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 10,
		marginTop: 20,
	},
	userID: {
		width: 220,
		height: 30,
		fontSize: 14,
		marginLeft: 5,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'darkgray',
		paddingHorizontal: 5,
		marginTop: 20,
	},
});

class _AddBankScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "AddBankScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("AddBankScene");
	}

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Add Bank"
					back={this.onBack}
					spec="AddBank"
				/>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const AddBankScene1 = sideBarContainer(_AddBankScene);
const AddBankScene = userContainer(AddBankScene1);
export default AddBankScene;
