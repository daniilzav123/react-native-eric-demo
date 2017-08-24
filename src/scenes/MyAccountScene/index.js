import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ModalDropdown } from "AppComponents";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor,
	},
	line: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	leftTxt: {
		width: 170,
		height: 30,
		textAlign: 'right',
		fontSize: 12,
		marginRight: 5,
		marginTop: 15,
	},
	rightInput: {
		width: 150,
		height: 30,
		fontSize: 14,
		marginLeft: 5,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'darkgray',
		paddingHorizontal: 5,
	},
	updateBtn: {
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: 'steelblue',
		borderRadius: 5,
		marginTop: 20,
		marginHorizontal: 10,
	},
	updateTxt: {
		color: 'white',
		fontSize: 18
	},
	marginBottom: {
		height: 40,
	},
	genderContain: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 150,
		height: 30,
	},
	checkImg: {
		width: 16,
		height: 16,
		marginLeft: 10,
	},
	genderTxt: {
		marginLeft: 5,
		fontSize: 13
	},
	genderContainer: {
		width: 150,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'darkgray',
		height: 30,
		justifyContent: "center",
		paddingHorizontal: 10,
		marginLeft: 5,
	},
	dropdwonStyle: {
		marginTop: 15,
		width: 150,
		height: 100,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: "gray"
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

class _MyAccountScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "MyAccountScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			gender: 1,
			isLoading: false,
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("MyAccountScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	updateGender = i => {
		const { gender } = this.state;
		if (gender !== i) {
			this.setState({ gender: i });
		}
	};

	onLogout = () => {
		const { navigation } = this.props;
		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		RequestApi(
			"member_login/logout",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					this.setState({ isLoading: false });
					const resetAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Login' })],
					});
					navigation.dispatch(resetAction);
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	};

	render() {
		const { gender, isLoading } = this.state;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="My Account"
					onMenu={this.onMenu}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Name</Text>
						<TextInput style={styles.rightInput}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Date Joined</Text>
						<TextInput style={styles.rightInput}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Gender</Text>
						<View
							style={styles.genderContain}
						>
							<TouchableOpacity
								onPress={() => {this.updateGender(1)}}
							>
								<Image
									source={gender === 1 ? require('img/img_checkon.png') : require('img/img_checkoff.png')}
									style={styles.checkImg}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {this.updateGender(1)}}
							>
								<Text style={styles.genderTxt}>Mail</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {this.updateGender(2)}}
							>
								<Image
									source={gender === 2 ? require('img/img_checkon.png') : require('img/img_checkoff.png')}
									style={styles.checkImg}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {this.updateGender(2)}}
							>
								<Text style={styles.genderTxt}>Femail</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Old Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Confirm Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Old Secondary Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Secondary Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Confirm Secondary Password</Text>
						<TextInput style={styles.rightInput} secureTextEntry={true}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Email * </Text>
						<TextInput style={styles.rightInput}/>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>Country * </Text>
						<View>
							<ModalDropdown
								options={["Australia", "Canada", "USA", "Mexico", "Britain", "Spain"]}
								style={styles.genderContainer}
								dropdownStyle={styles.dropdwonStyle}
								onSelect={({ index }) => {
									this.onChangeGender(0, index);
								}}
								defaultIndex={0}
								defaultValue="Australia"
							/>
						</View>
					</View>
					<View style={styles.line}>
						<Text style={styles.leftTxt}>HP Number * </Text>
						<TextInput style={styles.rightInput}/>
					</View>
					<View style={styles.line}>
						<TouchableOpacity
							style={styles.updateBtn}
							onPress={this.onLogin}
						>
							<Text style={styles.updateTxt}>Update</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.updateBtn}
							onPress={this.onLogout}
						>
							<Text style={styles.updateTxt}>Logout</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.marginBottom}/>
				</KeyboardAwareScrollView>
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

import { sideBarContainer, userContainer } from "ReduxContainers";
const MyAccountScene1 = sideBarContainer(_MyAccountScene);
const MyAccountScene = userContainer(MyAccountScene1);
export default MyAccountScene;
