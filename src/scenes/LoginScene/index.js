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
	},
	langView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 100,
		width: AppConfig.windowWidth,
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
			isLoading: false,
		};
		this.user = "";
		this.pass = "";
	}

	onLogin = () => {
		this.setState({ isLoading: true });
		const { navigation } = this.props;

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("username", this.user);
		body.append("password", this.pass);

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

	onEn = () => {
		// here
		AppConfig.global_string.setLanguage('en');
		this.props.setLanguage('en');
	};

	onCh = () => {
		AppConfig.global_string.setLanguage('ch');
		this.props.setLanguage('ch');
	};

	onMl = () => {
		AppConfig.global_string.setLanguage('ml');
		this.props.setLanguage('ml');
	};

	onChangeUser = text => {
		this.user = text;
	};

	onChangePass = text => {
		this.pass = text;
	};

	render() {
		const { isLoading } = this.state;
		const { global_string } = AppConfig;
		return (
			<View style={styles.container}>
				<View
					style={styles.titleView}
				>
					<Text style={styles.clubTitle}>{global_string.clubmemberlogin}</Text>
				</View>
				<View
					style={styles.langView}
				>
					<TouchableOpacity style={{ width: 30, height: 22 }} onPress={this.onEn}>
						<Image source={require('img/lang_en.png')} style={{ width: 30, height: 22 }}/>
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 30, height: 22 }} onPress={this.onCh}>
						<Image source={require('img/lang_ch.png')} style={{ width: 30, height: 22 }}/>
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 30, height: 22 }} onPress={this.onMl}>
						<Image source={require('img/lang_ml.png')} style={{ width: 30, height: 22 }}/>
					</TouchableOpacity>
				</View>
				<View>
					<TextInput
						style={styles.userInput}
						placeholder={global_string.userid}
						onChangeText={this.onChangeUser}
					/>
					<TextInput
						style={styles.passInput}
						placeholder={global_string.password}
						onChangeText={this.onChangePass}
						secureTextEntry={true}
					/>
				</View>
				<View
					style={styles.loginView}
				>
					<TouchableOpacity
						style={styles.loginBtn}
					>
						<Text style={styles.clubTitle}>{global_string.forgotpassword}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={this.onLogin}
					>
						<Text style={styles.clubTitle}>{global_string.login}</Text>
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
