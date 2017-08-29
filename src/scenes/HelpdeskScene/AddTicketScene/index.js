import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	ListView,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalDropdown from 'react-native-modal-dropdown';

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
	loadingScene: {
		position: "absolute",
		width: AppConfig.windowWidth,
		height: AppConfig.windowHeight,
		alignSelf: "stretch",
		backgroundColor: "rgba(0,0,0,0.5)",
		alignItems: "center",
		justifyContent: "center"
	},
	genderContainer: {
		width: AppConfig.windowWidth - 30,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'darkgray',
		height: 30,
		justifyContent: "center",
		marginTop: 5,
	},
	dropdwonStyle: {
		marginTop: 15,
		width: AppConfig.windowWidth - 30,
		height: 100,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: "gray"
	},
	textStyle: {
		paddingHorizontal: 10,
	},
	dropdownTextStyle: {
		backgroundColor: 'transparent',
	},
});

class _AddTicketScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "AddTicketScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			dep_id: 0,
		};
		this.subject = "";
		this.question = "";
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("AddTicketScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		RequestApi(
			"member_helpdesk/getDepartment",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.dep_data = response.data;
					this.setState({ isLoading: false });
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	onAddTicket = () => {
		if (this.subject === "") {
			alert("Please input the subject");
			return;
		}

		if (this.question === "") {
			alert("Please input the question");
			return;
		}
		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("subject", this.subject);
		body.append("question", this.question);
		body.append("department_id", this.state.dep_id);

		RequestApi(
			"member_helpdesk/addHelpDeskTicket",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					this.setState({ isLoading: false });
					this.props.navigation.state.params.callback();
					this.onBack();
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	onSelectDropDown = (i) => {
		this.setState({ dep_id: AppConfig.dep_data[i].id });
	};

	onChangeSubject = t => {
		this.subject = t;
	};

	onChangeQuestion = t => {
		this.question = t;
	};

	render() {
		const { global_string, dep_data } = AppConfig;
		let dep_name = [];
		let dep_id = [];
		for (let i = 0; i < dep_data.length; i++) {
			dep_name.push(dep_data[i].dept_name);
			dep_id.push(dep_data[i].id);
		}
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={global_string.addmessage}
					spec="AddTicket"
					back={this.onBack}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.content}>
						<Text style={styles.leftTxt}>{global_string.country} * </Text>
						<ModalDropdown
							options={dep_name}
							style={styles.genderContainer}
							dropdownStyle={styles.dropdwonStyle}
							textStyle={styles.textStyle}
							dropdownTextStyle={styles.dropdownTextStyle}
							defaultValue="Choose Department Name..."
							onSelect={this.onSelectDropDown}
						/>

						<Text style={styles.txt}>{global_string.subject}</Text>
						<TextInput
							style={styles.subjectInput}
							onChangeText={this.onChangeSubject}
						/>
						<Text style={styles.txt}>{global_string.question}</Text>
						<TextInput
							style={styles.subjectInput}
							onChangeText={this.onChangeQuestion}
						/>
					</View>
				</KeyboardAwareScrollView>
				<TouchableOpacity style={styles.addBtn} onPress={this.onAddTicket}>
					<Text>{global_string.add}</Text>
				</TouchableOpacity>
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
const AddTicketScene1 = sideBarContainer(_AddTicketScene);
const AddTicketScene = userContainer(AddTicketScene1);
export default AddTicketScene;
