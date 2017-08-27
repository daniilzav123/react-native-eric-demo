import React, { Component, PropTypes } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ListView,
	NativeModules
} from "react-native";
import AppConfig from "AppConfig";
import {
	ORANGE_COLOR,
	DARK_COLOR,
	DARKBLACK_COLOR,
	YELLOW_COLOR,
} from "AppColors";
import { LabelText } from "AppFonts";
import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
	en:{
		how:"How?",
		boiledEgg:"Boiled egg",
		softBoiledEgg:"Soft-boiled egg",
		choice:"How to choose the egg"
	},
	ch: {
		how:"你是谁?",
		boiledEgg:"Uovo sodo",
		softBoiledEgg:"Uovo alla coque",
		choice:"Come scegliere l'uovo"
	},
	ml: {
		how:"Come?",
		boiledEgg:"Uovo sodo",
		softBoiledEgg:"Uovo alla coque",
		choice:"Come scegliere l'uovo"
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		height: 70,
		paddingTop: 10,
		backgroundColor: 'steelblue',
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
		backgroundColor: DARK_COLOR,
		paddingTop: 15,
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
		justifyContent: "center",
	},
	avatarImg: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	nameContainer: {
		marginLeft: 15
	},
	langImg: {
		width: 30,
		height: 22,
	},
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
				{ index: 0, title: "Home" },
				{ index: 1, title: "News Update" },
				{ index: 2, title: "Genealogy" },
				{ index: 3, title: "Trade" },
				{ index: 4, title: "Exchange Market" },
				{ index: 5, title: "Products" },
				{ index: 6, title: "E-Wallet" },
				{ index: 7, title: "Report" },
				{ index: 8, title: "Helpdesk" },
				{ index: 9, title: "My Account" }
			],
			lang: 'en',
		};
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
	}

	componentDidMount() {
		strings.setLanguage('it');
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
		this.props.routeScene(item.index);
		this.props.showSideBar(false);
	};

	renderHeader = () => {
		const { lang, isShowSortsContainer } = this.state;
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
							{strings.how}
						</LabelText>
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={{ marginLeft: 80 }} onPress={this.onShowDetail}>
					<Image style={styles.langImg} source={lang === 'en' ? require('img/lang_en.png') : lang === 'ch' ? require('img/lang_ch.png') : require('img/lang_ml.png')}/>
				</TouchableOpacity>
				<View style={styles.space} />
			</View>
		);
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

	onEn = () => {
		strings.setLanguage('en');
		this.setState({ lang: 'en', isShowSortsContainer: false });
	};

	onCh = () => {
		strings.setLanguage('ch');
		this.setState({ lang: 'ch', isShowSortsContainer: false });
	};

	onMl = () => {
		strings.setLanguage('ml');
		this.setState({ lang: 'ml', isShowSortsContainer: false });
	};

	renderLang = () => {
		const { isShowSortsContainer } = this.state;
		if (isShowSortsContainer) {
			return (
				<View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row' }}>
					<TouchableOpacity style={{width: 30, height: 22, marginLeft: 30, marginTop: 14}} onPress={this.onEn}>
						<Image source={require('img/lang_en.png')} style={{width: 30, height: 22}}/>
					</TouchableOpacity>
					<TouchableOpacity style={{width: 30, height: 22, marginLeft: 40, marginTop: 14}} onPress={this.onCh}>
						<Image source={require('img/lang_ch.png')} style={{width: 30, height: 22}}/>
					</TouchableOpacity>
					<TouchableOpacity style={{width: 30, height: 22, marginLeft: 40, marginTop: 14}} onPress={this.onMl}>
						<Image source={require('img/lang_ml.png')} style={{width: 30, height: 22}}/>
					</TouchableOpacity>
				</View>
			)
		} else {
			return (
				<View/>
			)
		}
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
				{this.renderLang()}
				{this.renderContent()}
			</View>
		);
	}
}
