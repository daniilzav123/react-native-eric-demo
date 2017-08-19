import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 100,
	},
	userInput: {
		height: 35,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 0.5,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: AppConfig.windowWidth - 80,
		fontSize: 16,
		marginTop: 50,
	},
	passInput: {
		height: 35,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 0.5,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: AppConfig.windowWidth - 80,
		fontSize: 16,
		marginTop: 20,
	},
	titleView: {
		width: AppConfig.windowWidth,
		height: 50,
		backgroundColor: 'steelblue',
		justifyContent: 'center',
		alignItems: 'center'
	},
	clubTitle: {
		color: 'white',
		fontSize: 18
	},
	loginView: {
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	loginBtn: {
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: 'steelblue',
		borderRadius: 5,
		marginTop: 50,
		marginHorizontal: 10,
	},
});

class _LoginScene extends Component {
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

	onLogin = () => {
		const { navigation } = this.props;
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Main' })],
		});
		navigation.dispatch(resetAction);
	};

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(true);
		this.props.setCurrentScene("LoginScene");
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={styles.titleView}
				>
					<Text style={styles.clubTitle}>Club Member Login</Text>
				</View>
				<View>
					<TextInput
						style={styles.userInput}
						placeholder="User ID"
					/>
					<TextInput
						style={styles.passInput}
						placeholder="Password"
						secureTextEntry={true}
					/>
				</View>
				<View
					style={styles.loginView}
				>
					<TouchableOpacity
						style={styles.loginBtn}
					>
						<Text style={styles.clubTitle}>Forgot Password</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={this.onLogin}
					>
						<Text style={styles.clubTitle}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

import { sideBarContainer } from "ReduxContainers";
const LoginScene = sideBarContainer(_LoginScene);
export default LoginScene;
