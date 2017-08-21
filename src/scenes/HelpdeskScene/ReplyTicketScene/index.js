import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
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
	content: {
		paddingTop: 30,
		paddingHorizontal: 15,
	},
	subjectInput: {
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
		paddingHorizontal: 5,
		fontSize: 13,
	},
	txt: {
		marginTop: 10,
	},
	addBtn: {
		paddingHorizontal: 20,
		height: 35,
		backgroundColor: 'gray',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		position: 'absolute',
		bottom: 40,
		width: AppConfig.windowWidth - 100,
		marginLeft: 50,
	},
});

class _ReplyTicketScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "ReplyTicketScene",
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
		this.props.setCurrentScene("ReplyTicketScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	onAddTicket = () => {
		this.props.navigation.state.params.callback();
		this.onBack();
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Reply"
					spec="Reply"
					back={this.onBack}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.content}>
						<Text style={styles.txt}>Subject</Text>
						<TextInput
							style={styles.subjectInput}
						/>
						<Text style={styles.txt}>Question</Text>
						<TextInput
							style={styles.subjectInput}
						/>
					</View>
				</KeyboardAwareScrollView>
				<TouchableOpacity style={styles.addBtn} onPress={this.onAddTicket}>
					<Text>Add</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const ReplyTicketScene1 = sideBarContainer(_ReplyTicketScene);
const ReplyTicketScene = userContainer(ReplyTicketScene1);
export default ReplyTicketScene;
