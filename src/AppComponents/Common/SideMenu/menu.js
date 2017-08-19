import React, { Component, PropTypes } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ListView,
	NativeModules
} from "react-native";
import { LabelText } from "AppFonts";
import {
	DARK_COLOR,
	DARKBLACK_COLOR,
	ORANGE_COLOR,
	YELLOW_COLOR
} from "AppColors";
import AppConfig from "AppConfig";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		height: 60,
		backgroundColor: ORANGE_COLOR,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15
	},
	boldText: {
		fontWeight: "bold",
		lineHeight: 20
	},
	headerSubContainer: {
		marginTop: 5,
		flexDirection: "row",
		alignItems: "center"
	},
	italicText: {
		fontStyle: "italic"
	},
	space: {
		flex: 1
	},
	downIcon: {
		width: 12,
		height: 9,
		resizeMode: "stretch"
	},
	downContainer: {
		width: 30,
		height: 30,
		alignItems: "flex-end",
		justifyContent: "center"
	},
	contentContainer: {
		flex: 1,
		backgroundColor: DARK_COLOR
	},
	sportsContainer: {
		height: 60,
		backgroundColor: DARKBLACK_COLOR,
		paddingHorizontal: 5,
		flexDirection: "row",
		alignItems: "center"
	},
	logoImg: {
		width: 145,
		height: 25,
		resizeMode: "stretch"
	},
	smallSpace: {
		width: 15
	},
	launchContainer: {
		marginTop: 5
	},
	itemContainer: {
		height: 50,
		paddingHorizontal: 15,
		justifyContent: "center"
	},
	avatarImg: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	nameContainer: {
		marginLeft: 15
	}
});

export class Menu extends Component {
	static propTypes = {
		routeScene: PropTypes.any.isRequired,
		showSideBar: PropTypes.func.isRequired,
		disableSideBar: PropTypes.func.isRequired,
		setCurrentScene: PropTypes.func.isRequired,
		currentScene: PropTypes.any.isRequired,
		isOpen: React.PropTypes.bool,
		user: PropTypes.object
	};
	static defaultProps = {
		isOpen: false
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			isShowSortsContainer: false,
			MENU_ITEMS: [
				{ index: 0, title: "Edit Profile" },
				{ index: 1, title: "Camp History" },
				{ index: 2, title: "Documents" },
				{ index: 3, title: "Notifications" },
				{ index: 4, title: "Settings" },
				{ index: 5, title: "Privacy Policy" },
				{ index: 6, title: "Terms of Use" },
				{ index: 7, title: "Contact" }
			]
		};
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
	}

	onShowDetail = () => {
		const { isShowSortsContainer } = this.state;
		this.setState({ isShowSortsContainer: !isShowSortsContainer });
	};

	onLaunchSports = () => {
		const CalendarManager = NativeModules.CalendarManager;
		CalendarManager.addEvent("card number", "exp month", "exp year", "cvv");
	};

	onShowProfile = () => {
		this.props.routeScene(8);
		this.props.showSideBar(false);
	};

	onShowMenu = item => {
		switch (item.index) {
			case 0:
				this.props.routeScene(item.index);
				break;
			case 1:
				this.props.routeScene(item.index);
				break;
			case 2:
				this.props.routeScene(item.index);
				break;
			case 3:
				this.props.routeScene(item.index);
				break;
			case 4:
				this.props.routeScene(item.index);
				break;
			case 5:
				this.props.routeScene(item.index);
				break;
			case 6:
				this.props.routeScene(item.index);
				break;
			case 7:
				this.props.routeScene(item.index);
				break;
			default:
				break;
		}
		this.props.showSideBar(false);
	};

	renderHeader = () => {
		const { isShowSortsContainer } = this.state;
		const iconName = isShowSortsContainer
			? require("img/icon_up_white.png")
			: require("img/icon_down_white.png");
		const { user } = this.props;
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity
					style={styles.headerSubContainer}
					onPress={this.onShowProfile}
				>
					{user.avatar === null
						? <Image
							source={require("img/img_noprofileimage.png")}
							style={styles.avatarImg}
						/>
						: <Image
							source={{
								uri: user.avatar.path,
								width: user.avatar.width,
								height: user.avatar.height,
								mime: user.avatar.mime
							}}
							style={styles.avatarImg}
						/>}

					<View style={styles.nameContainer}>
						<LabelText fontSize={14} color={"white"} style={styles.boldText}>
							Christina Smith
						</LabelText>
						<LabelText fontSize={11} color={"white"} style={styles.italicText}>
							Logged into CampID
						</LabelText>
					</View>
				</TouchableOpacity>
				<View style={styles.space} />
				<TouchableOpacity
					style={styles.downContainer}
					onPress={this.onShowDetail}
				>
					<Image source={iconName} style={styles.downIcon} />
				</TouchableOpacity>
			</View>
		);
	};

	renderSports = () => {
		const { isShowSortsContainer } = this.state;
		if (isShowSortsContainer) {
			return (
				<View style={styles.sportsContainer}>
					<Image source={require("img/icon_logo.png")} style={styles.logoImg} />
					<View style={styles.smallSpace} />
					<TouchableOpacity
						style={styles.launchContainer}
						onPress={this.onLaunchSports}
					>
						<LabelText
							fontSize={11}
							color={YELLOW_COLOR}
							style={styles.boldText}
						>
							Launch SportsID
						</LabelText>
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	};

	renderMenuItem = menuItem => {
		return (
			<TouchableOpacity
				style={styles.itemContainer}
				onPress={() => this.onShowMenu(menuItem)}
			>
				<LabelText style={styles.boldText} color={"white"} fontSize={13}>
					{menuItem.title}
				</LabelText>
			</TouchableOpacity>
		);
	};

	renderContent = () => {
		const { MENU_ITEMS } = this.state;
		const dataSource = this.dataSource.cloneWithRows(MENU_ITEMS);
		return (
			<View style={styles.contentContainer}>
				<ListView
					dataSource={dataSource}
					enableEmptySections={true}
					renderRow={this.renderMenuItem}
				/>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.renderHeader()}
				{this.renderSports()}
				{this.renderContent()}
			</View>
		);
	}
}
