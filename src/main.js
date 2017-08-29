import React, { Component, PropTypes } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SideMenu } from "AppComponents";
import { Routing } from "./routing";
import { NavigationActions } from "react-navigation";
import { BLACK_COLOR } from "AppColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BLACK_COLOR
	}
});

class _MainPage extends Component {
	static propTypes = {
		sidebar: PropTypes.any,
		showSideBar: PropTypes.func,
		disableSideBar: PropTypes.func,
		setCurrentScene: PropTypes.func,
		user: PropTypes.object,
		setLanguage: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.routingRef = null;
		StatusBar.setBarStyle("light-content", true);
	}

	componentDidMount() {
	}

	routingScene = sceneIndex => {
		const { sidebar } = this.props;
		switch (sceneIndex) {
			case 0:
				if (sidebar.currentScene === "MainScene") {
					return;
				} else {
					const genNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Main" })]
					});
					this.routingRef.dispatch(genNavigateAction);
				}
				break;
			case 1:
				if (sidebar.currentScene === "NewsUpdateScene") {
					return;
				} else {
					const genNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "NewsUpdate" })]
					});
					this.routingRef.dispatch(genNavigateAction);
				}
				break;
			case 2:
				if (sidebar.currentScene === "GenealogyScene" || sidebar.currentScene === "RegisterNewMemberScene" || sidebar.currentScene === "GroupScene") {
					return;
				} else {
					const genNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Genealogy" })]
					});
					this.routingRef.dispatch(genNavigateAction);
				}
				break;
			case 3:
				if (
					sidebar.currentScene === "TradeScene"
				) {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Trade" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 4:
				if (sidebar.currentScene === "ExchangeMarketScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "ExchangeMarket" })
						]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			// case 5:
			// 	if (sidebar.currentScene === "ProductScene") {
			// 		return;
			// 	} else {
			// 		const editNavigateAction = NavigationActions.reset({
			// 			index: 0,
			// 			actions: [NavigationActions.navigate({ routeName: "Product" })]
			// 		});
			// 		this.routingRef.dispatch(editNavigateAction);
			// 	}
			// 	break;
			case 5:
				if (sidebar.currentScene === "WalletScene" || sidebar.currentScene === "AddBankScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Wallet" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 6:
				if (sidebar.currentScene === "ReportScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "Report" })
						]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 7:
				if (sidebar.currentScene === "HelpDeskScene" || sidebar.currentScene === "AddTicketScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "HelpDesk" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 8:
				if (sidebar.currentScene === "MyAccountScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "MyAccount" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			// case 9:
				// if (sidebar.currentScene === "MyAccountScene") {
				// 	return;
				// } else {
				// 	const editNavigateAction = NavigationActions.reset({
				// 		index: 0,
				// 		actions: [NavigationActions.navigate({ routeName: "MyAccount" })]
				// 	});
				// 	this.routingRef.dispatch(editNavigateAction);
				// }
				// break;
			default:
				break;
		}
	};

	setCurrentScene = scene => {
		this.props.setCurrentScene(scene);
	};

	setLanguage = language => {
		this.props.setLanguage(language);
	};

	showSideBar = bFlag => {
		this.props.showSideBar(bFlag);
	};

	disableSideBar = bFlag => {
		this.props.disableSideBar(bFlag);
	};

	render() {
		const { sidebar, user } = this.props;
		let containerStyle = styles.container;
		if (sidebar.currentScene === "LoginScene") {
			containerStyle = [styles.container, { paddingTop: 0 }];
		}
		return (
			<View style={containerStyle}>
				<SideMenu
					isOpen={sidebar.showSidebar}
					disable={sidebar.disableSidebar}
					routeScene={this.routingScene}
					setCurrentScene={this.setCurrentScene}
					currentScene={sidebar.currentScene}
					showSideBar={this.showSideBar}
					disableSideBar={this.disableSideBar}
					user={user}
					setLanguage={this.setLanguage}
					sidebar={this.props.sidebar}
				>
					<Routing ref={ref => (this.routingRef = ref)} />
				</SideMenu>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const MainPage1 = sideBarContainer(_MainPage);
const MainPage = userContainer(MainPage1);
export default MainPage;
