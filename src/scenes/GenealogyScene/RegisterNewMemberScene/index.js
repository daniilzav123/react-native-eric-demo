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
	ActivityIndicator,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
	mainContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	textinput: {
		width: AppConfig.windowWidth - 100,
		height: 35,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 5,
		marginTop: 15,
		fontSize: 13,
	},
	treeContainer: {
		paddingTop: 20,
	},
	addBtn: {
		height: 35,
		backgroundColor: 'gray',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: AppConfig.windowWidth - 100,
		marginLeft: 50,
		marginTop: 30,
		marginBottom: 30,
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
});

class _RegisterNewMemberScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "RegisterNewMemberScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	onRegister = () => {

	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("RegisterNewMemberScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("matrix_userid", "tester");
		body.append("matrix_side", "R");
		body.append("txtSponsorId", "tester");
		body.append("txtPrimaryPassword", "123456");
		body.append("txtConfirmPrimaryPassword", "123456");
		body.append("country", "14");
		body.append("mobile", "016221180");
		body.append("f_name", "first");
		body.append("l_name", "last");
		body.append("userid", "tester1");
		body.append("selected_package", "1");
		body.append("RP_pay", "1000");
		body.append("payment_gateway", "E-WALLET");
		body.append("action", "save");
		body.append("email", "daniil@gmail.com");

		RequestApi(
			"member/signup",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					this.setState({ isLoading: false });
					alert('registered successfully');
					this.props.navigation.goBack();
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.registernewmember}
					back={this.onBack}
					spec="RegisterNewMember"
				/>
				<KeyboardAwareScrollView>
					<View style={styles.mainContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="sponsor id"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="sponsor id"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="primary password"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="confirm primary password"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="country"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="mobile"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="first name"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="last name"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="userid"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="RP Pay"
						/>
						<TextInput
							style={styles.textinput}
							placeholder="email"
						/>
					</View>
					<TouchableOpacity style={styles.addBtn} onPress={this.onRegister}>
						<Text>Register</Text>
					</TouchableOpacity>
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
const RegisterNewMemberScene1 = sideBarContainer(_RegisterNewMemberScene);
const RegisterNewMemberScene = userContainer(RegisterNewMemberScene1);
export default RegisterNewMemberScene;
