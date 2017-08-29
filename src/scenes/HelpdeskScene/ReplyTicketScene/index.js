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
	priceContainer: {
		width: AppConfig.windowWidth - 60,
		marginLeft: 30,
		justifyContent: 'flex-start',
		marginTop: 30,
		backgroundColor: "#fff",
		paddingHorizontal: 15,
		paddingBottom: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowRadius: 6,
		shadowOffset: {
			height: 5,
			width: 0
		}
	},
	line: {
		flexDirection: 'row',
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	question: {
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
	replyBtn: {
		backgroundColor: 'steelblue',
		borderRadius: 5,
		marginTop: 20,
		width: AppConfig.windowWidth - 80,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	replyTitle: {
		color: 'white',
		fontSize: 18,
		backgroundColor: 'transparent',
	}
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
			isLoading: false,
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.question = "";
	}

	renderRow = (rowData, sectionID, rowID) => {
		const { global_string } = AppConfig;
		return (
			<View style={styles.priceContainer}>
				<View style={styles.line}>
					<Text>{global_string.answer}: </Text>
					<Text>{rowData.answer}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.name}: </Text>
					<Text>{rowData.f_name} {rowData.l_name}</Text>
				</View>
			</View>
		);
	};

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("ReplyTicketScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("ticket_id", this.props.navigation.state.params.ticket_id);

		RequestApi(
			"member_helpdesk/getReplyMessage",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.ticket_repy_data = response.data;
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

	onBack = () => {
		this.props.navigation.goBack();
	};

	onChangeQuestion = (text) => {
		this.question = text;
	};

	onReply = () => {
		if (this.question === "") {
			alert('Please input the question.');
			return;
		}

		this.setState({ isLoading: true });
		debugger;
		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("ticket_id", this.props.navigation.state.params.ticket_id);
		body.append("question", this.question);

		RequestApi(
			"member_helpdesk/replyHelpDeskTicket",
			body,
			"POST"
		)
			.then(response => {
				debugger;
				if (response.status === "Success") {
					let body1 = new FormData();
					body1.append("app_id", 'amgames!@#123');
					body1.append("access_token", AppConfig.accessToken);
					body1.append("ticket_id", this.props.navigation.state.params.ticket_id);

					RequestApi(
						"member_helpdesk/getReplyMessage",
						body1,
						"POST"
					)
						.then(response => {
							debugger;
							if (response.status === "Success") {
								AppConfig.ticket_repy_data = response.data;
								this.setState({ isLoading: false });
							} else {
								this.setState({ isLoading: false });
							}
						})
						.catch(error => {
							alert(error);
							this.setState({ isLoading: false });
						});
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
		const { isLoading } = this.state;
		const { ticket_repy_data, global_string } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={global_string.reply}
					spec="ReplyTicket"
					back={this.onBack}
				/>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<TextInput
						style={styles.question}
						placeholder={global_string.question}
						onChangeText={this.onChangeQuestion}
					/>
					<TouchableOpacity
						style={styles.replyBtn}
						onPress={this.onReply}
					>
						<Text style={styles.replyTitle}>{global_string.reply}</Text>
					</TouchableOpacity>
				</View>
				<ListView
					dataSource={this.ds.cloneWithRows(ticket_repy_data)}
					renderRow={this.renderRow}
					enableEmptySections={true}
					removeClippedSubviews={false}
				/>
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
const ReplyTicketScene1 = sideBarContainer(_ReplyTicketScene);
const ReplyTicketScene = userContainer(ReplyTicketScene1);
export default ReplyTicketScene;
