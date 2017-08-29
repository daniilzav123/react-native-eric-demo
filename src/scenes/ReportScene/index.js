import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ActivityIndicator,
	ListView,
	TouchableOpacity,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	content: {
		paddingTop: 30,
		paddingHorizontal: 15,
	},
	transactionRecord: {
		justifyContent: 'center',
		alignItems: 'center',
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

class _ReportScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "ReportScene",
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
		this.props.setCurrentScene("ReportScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		RequestApi(
			"member_report/commissions",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.profit_data = response.data.payout;
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

	renderRow = (rowData, sectionID, rowID) => {
		const { global_string } = AppConfig;
		return (
			<TouchableOpacity style={styles.priceContainer}>
				<View style={styles.line}>
					<Text>{global_string.period}: </Text>
					<Text>{rowData.period}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.sponsorbonus}: </Text>
					<Text>${rowData.SPONSOR_BONUS}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.groupbonus}: </Text>
					<Text>${rowData.GROUP_BONUS}</Text>
				</View>
				<View style={styles.line}>
					<Text>{global_string.leadershipbonus}: </Text>
					<Text>${rowData.LEADERSHIP_BONUS}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const { isLoading } = this.state;
		const { profit_data } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.report}
					onMenu={this.onMenu}
				/>
				<View
					style={styles.content}
				>
					<View style={styles.transactionRecord}>
						<Text style={{color: '#561e19', fontWeight: 'bold'}}>Purchase Transaction Record</Text>
					</View>
					<View style={{height: 20}}/>
					<View style={styles.transactionRecord}>
						<Text style={{color: '#561e19', fontWeight: 'bold'}}>Profit Record</Text>
					</View>
				</View>
				<ListView
					dataSource={this.ds.cloneWithRows(profit_data)}
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
const ReportScene1 = sideBarContainer(_ReportScene);
const ReportScene = userContainer(ReportScene1);
export default ReportScene;
