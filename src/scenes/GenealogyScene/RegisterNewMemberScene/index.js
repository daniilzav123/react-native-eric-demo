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
		this.setState({ isLoading: true });

		debugger;
		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		if (this.props.navigation.state.params.type === 0) {
			body.append("matrix_userid", this.sponsorId);
			body.append("txtSponsorId", this.sponsorId);
			body.append("matrix_side", this.matrixside);
		} else {
			body.append("matrix_userid", this.props.navigation.state.params.parent);
			body.append("txtSponsorId", this.props.navigation.state.params.parent);
			body.append("matrix_side", this.props.navigation.state.params.l_r);
		}
		body.append("txtPrimaryPassword", this.primarypass);
		body.append("txtConfirmPrimaryPassword", this.confirmprimarypass);
		body.append("country", this.country);
		body.append("mobile", this.mobile);
		body.append("f_name", this.firstname);
		body.append("l_name", this.lastname);
		body.append("userid", this.userid);
		body.append("selected_package", "1");
		body.append("RP_pay", this.rppay);
		body.append("payment_gateway", "E-WALLET");
		body.append("action", "save");
		body.append("email", this.email);

		RequestApi(
			"member/signup",
			body,
			"POST"
		)
			.then(response => {
				debugger;
				if (response.status === "Success") {
					this.setState({ isLoading: false });
					alert('registered successfully');
					this.props.navigation.state.params.reLoad();
					this.props.navigation.goBack();
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
			});
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
			isLoading: false,
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.sponsorId = "";
		this.matrixside = "";
		this.primarypass = "";
		this.confirmprimarypass = "";
		this.country = "";
		this.mobile = "";
		this.firstname = "";
		this.lastname = "";
		this.userid = "";
		this.rppay = "";
		this.email = "";
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("RegisterNewMemberScene");
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
						{
							this.props.navigation.state.params.type === 0 &&
								<TextInput
									style={styles.textinput}
									placeholder="sponsor id"
									onChangeText={(text) => {this.sponsorId = text;}}
								/>
						}
						{
							this.props.navigation.state.params.type === 0 &&
								<TextInput
									style={styles.textinput}
									placeholder="Matrix Side"
									onChangeText={(text) => {this.matrixside = text;}}
								/>
						}
						<TextInput
							style={styles.textinput}
							placeholder="primary password"
							onChangeText={(text) => {this.primarypass = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="confirm primary password"
							onChangeText={(text) => {this.confirmprimarypass = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="country"
							onChangeText={(text) => {this.country = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="mobile"
							onChangeText={(text) => {this.mobile = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="first name"
							onChangeText={(text) => {this.firstname = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="last name"
							onChangeText={(text) => {this.lastname = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="userid"
							onChangeText={(text) => {this.userid = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="RP Pay"
							onChangeText={(text) => {this.rppay = text;}}
						/>
						<TextInput
							style={styles.textinput}
							placeholder="email"
							onChangeText={(text) => {this.email = text;}}
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
