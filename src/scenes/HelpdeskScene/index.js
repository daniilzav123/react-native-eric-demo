import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	ListView,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	modalContainer: {
		width: AppConfig.windowWidth - 100,
		height: AppConfig.windowWidth - 30,
		marginLeft: 30,
		marginTop: 40,
		backgroundColor: 'white',
		alignItems: "center",
		justifyContent: "center"
	},
	shadowHide: {
		position: "absolute",
		width: AppConfig.windowWidth,
		height: AppConfig.windowHeight,
		backgroundColor: "transparent"
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
});

class _HelpdeskScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "HelpdeskScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false,
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("HelpdeskScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("ticket_status", "open");
		body.append("page_no", "2");
		body.append("sortby", "ASC");

		RequestApi(
			"member_helpdesk/helpdesk",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.ticket_data = response.data;
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

	updateDatas = () => {
		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("ticket_status", "open");
		body.append("page_no", "2");
		body.append("sortby", "ASC");

		RequestApi(
			"member_helpdesk/helpdesk",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.ticket_data = response.data;
					this.setState({ isLoading: false });
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
	};

	onAddTicket = () => {
		this.props.navigation.navigate("AddTicket", {
			callback: this.updateDatas,
		});
	};

	onReply = (id) => {
		debugger;
		this.props.navigation.navigate("ReplyTicket", {
			ticket_id: id,
		});
	};

	renderRow = (rowData, sectionID, rowID) => {
		const { global_string } = AppConfig;
		return (
			<TouchableOpacity style={styles.priceContainer} onPress={() => {this.onReply(rowData.ticket_no);}}>
				<View style={styles.line}>
					<Text>{global_string.subject}: </Text>
					<Text>{rowData.title}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.departmentname}: </Text>
					<Text>{rowData.dept}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.reply}: </Text>
					<Text>{rowData.rtotal}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const { isLoading } = this.state;
		const { ticket_data } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.helpdesk}
					onMenu={this.onMenu}
					spec="Helpdesk"
					onAddTicket={this.onAddTicket}
				/>
				<ListView
					dataSource={this.ds.cloneWithRows(ticket_data)}
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
const HelpdeskScene1 = sideBarContainer(_HelpdeskScene);
const HelpdeskScene = userContainer(HelpdeskScene1);
export default HelpdeskScene;
