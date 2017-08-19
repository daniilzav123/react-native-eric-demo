import React, { Component, PropTypes } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SideMenu } from "AppComponents";
import { Routing } from "./routing";
import { NavigationActions } from "react-navigation";
import { BLACK_COLOR } from "AppColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: BLACK_COLOR
	}
});

class _MainPage extends Component {
	static propTypes = {
		sidebar: PropTypes.any,
		showSideBar: PropTypes.func,
		disableSideBar: PropTypes.func,
		setCurrentScene: PropTypes.func,
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.routingRef = null;
		StatusBar.setBarStyle("light-content", true);
	}

	routingScene = sceneIndex => {
		const { sidebar } = this.props;
		switch (sceneIndex) {
			case 0:
				if (sidebar.currentScene === "EditProfileScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "EditProfile" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 1:
				if (
					sidebar.currentScene === "CampHistoryScene" ||
					sidebar.currentScene === "CampHistoryDetailScene"
				) {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "CampHistory" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 2:
				if (sidebar.currentScene === "DocumentUploadScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "DocumentUpload" })
						]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 3:
				if (sidebar.currentScene === "NotificationScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Notification" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 4:
				if (sidebar.currentScene === "SettingScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Setting" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 5:
				if (sidebar.currentScene === "PrivacyPolicyScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "PrivacyPolicy" })
						]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 6:
				if (sidebar.currentScene === "TermsScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Terms" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 7:
				if (sidebar.currentScene === "ContactScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "Contact" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			case 8:
				if (sidebar.currentScene === "ProfileScene") {
					return;
				} else {
					const editNavigateAction = NavigationActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: "MyProfile" })]
					});
					this.routingRef.dispatch(editNavigateAction);
				}
				break;
			default:
				break;
		}
	};

	setCurrentScene = scene => {
		this.props.setCurrentScene(scene);
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
