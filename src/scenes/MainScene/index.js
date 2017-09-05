import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import AppConfig from "AppConfig";
import { RequestApi, GlobalStorage } from "AppUtilities";
import { HeaderBar } from "AppComponents"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	priceContainer: {
		width: AppConfig.windowWidth - 80,
		marginLeft: 40,
		justifyContent: 'flex-start',
		marginTop: 40,
		backgroundColor: "#fff",
		paddingLeft: 15,
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
	upTxt: {
		fontSize: 15,
		color: '#565656',
		marginTop: 15,
	},
	downTxt: {
		fontSize: 22,
		color: '#5a889a',
		marginTop: 2,
	},
	bar: {
		width: AppConfig.windowWidth - 110,
		height: 1,
		backgroundColor: 'black',
		marginTop: 3,
	},
	accountOverView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	line: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
	},
	leftTxt: {
		fontSize: 13,
		color: '#565656',
		marginRight: 10,
		textAlign: 'right',
		width: 200,
	},
	rightTxt: {
		fontSize: 13,
		color: '#565656',
		marginLeft: 10,
		textAlign: 'left',
		width: 200,
	},
	marginBottom: {
		height: 40
	},
	redTxt: {
		fontSize: 17,
		color: '#561e19',
		marginTop: 15,
		fontWeight: 'bold'
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

class _MainScene extends Component {
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
			showWallet: false,
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("MainScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		RequestApi(
			"member/dashboard",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.dashboard_data = response.data;
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

	render() {
		const { isLoading } = this.state;
		const { dashboard_data, global_string } = AppConfig;
		AppConfig.global_string.setLanguage(this.props.sidebar.language);
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.home}
					onMenu={this.onMenu}
				/>
				<KeyboardAwareScrollView>
					<TouchableOpacity style={styles.accountOverView} onPress={this.switch}>
						<Text style={styles.redTxt}>{global_string.myaccountoverview}</Text>
					</TouchableOpacity>
					<View style={styles.priceContainer}>
						<View>
							<Text style={styles.upTxt}>{global_string.cashpoint}</Text>
							<Text style={styles.downTxt}>${
								dashboard_data.length === 0 ? 0 : dashboard_data.ewallet_details.CP.balance
							}</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>{global_string.tradepoint}</Text>
							<Text style={styles.downTxt}>${
								dashboard_data.length === 0 ? 0 : dashboard_data.ewallet_details.TP.balance
							}.00</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>{global_string.bonustradepoint}</Text>
							<Text style={styles.downTxt}>${
								dashboard_data.length === 0 ? 0 : dashboard_data.ewallet_details.BTP.balance
							}.00</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>{global_string.gamepoint}</Text>
							<Text style={styles.downTxt}>${
								dashboard_data.length === 0 ? 0 : dashboard_data.ewallet_details.GP.balance
							}.00</Text>
							<View style={styles.bar}/>
						</View>

					</View>

					<View style={styles.accountOverView}>
						<Text style={styles.redTxt}>{global_string.myaccountoverview}</Text>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.achievedrank}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.rank_details
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.name}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.name
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.id}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.id
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.investment}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.investment
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.email}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.email
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.sponsoredmembers}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.sponsored_member
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.sponsoredbv}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data.sponsored_bv
							}</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>{global_string.eprofitmaxcap}</Text>
							<Text style={styles.rightTxt}>{
								dashboard_data.length === 0 ? "" : dashboard_data["e-profit_cap"]
							}</Text>
						</View>
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
const MainScene1 = sideBarContainer(_MainScene);
const MainScene = userContainer(MainScene1);
export default MainScene;
