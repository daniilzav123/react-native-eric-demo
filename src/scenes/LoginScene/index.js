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
	ActivityIndicator,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import AppConfig from "AppConfig";
import { RequestApi, GlobalStorage } from "AppUtilities";

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
	loadingScene: {
		position: "absolute",
		width: AppConfig.windowWidth,
		height: AppConfig.windowHeight,
		alignSelf: "stretch",
		backgroundColor: "rgba(0,0,0,0.5)",
		alignItems: "center",
		justifyContent: "center"
	}
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
			isLoading: false,
		};
	}

	onLogin = () => {
		this.setState({ isLoading: true });
		const { navigation } = this.props;

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("username", "kavi");
		body.append("password", "123456");

		RequestApi(
			"member_login/login",
			body,
			"POST"
		)
			.then(response => {
				this.setState({ isLoading: false });
				if (response.status === "Success") {
					AppConfig.accessToken = response.data.access_token;
					const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Main' })],
					});
					navigation.dispatch(resetAction);
				} else {
					alert(response.data.error_message);
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	};

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(true);
		this.props.setCurrentScene("LoginScene");
	}

	render() {
		const { isLoading } = this.state;
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
				{
					isLoading &&
						<View style={styles.loadingScene}>
							<ActivityIndicator animating={true} size="small" color="white" />
						</View>
				}
			</View>
		);
	}
}

import { sideBarContainer } from "ReduxContainers";
const LoginScene = sideBarContainer(_LoginScene);
export default LoginScene;
