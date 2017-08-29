import React, { Component, PropTypes } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ListView,
	NativeModules,
	ActivityIndicator,
	Text,
} from "react-native";
import AppConfig from "AppConfig";
import {
	ORANGE_COLOR,
	DARK_COLOR,
	DARKBLACK_COLOR,
	YELLOW_COLOR,
} from "AppColors";
import { LabelText } from "AppFonts";
import { GlobalStorage, RequestApi } from "AppUtilities";

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
		flexDirection: 'row',
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

export class Menu extends Component {
	static propTypes = {
		routeScene: PropTypes.any.isRequired,
		showSideBar: PropTypes.func.isRequired,
		disableSideBar: PropTypes.func.isRequired,
		setCurrentScene: PropTypes.func.isRequired,
		currentScene: PropTypes.any.isRequired,
		isOpen: React.PropTypes.bool,
		user: PropTypes.object,
		sidebar: PropTypes.object,
		setLanguage: PropTypes.func.isRequired,
	};
	static defaultProps = {
		isOpen: false
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			isShowSortsContainer: false,
			MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			],
			lang: 'en',
			isLoading: false,
		};
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.sidebar.language === 'en') {
			this.setState({ lang: 'en', isShowSortsContainer: false, MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			], });
		} else if (nextProps.sidebar.language === 'ch') {
			this.setState({ lang: 'ch', isShowSortsContainer: false, MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			], });
		} else if (nextProps.sidebar.language === 'ml') {
			this.setState({ lang: 'ml', isShowSortsContainer: false, MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			], });
		}
	}

	componentDidMount() {
	}

	onShowDetail = () => {
		const { isShowSortsContainer } = this.state;
		this.setState({ isShowSortsContainer: !isShowSortsContainer });
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
							{AppConfig.global_string.myaccount}
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
				{
					menuItem.title === "News Update" &&
						<View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginLeft: 20, }}>
							<Text>1</Text>
						</View>
				}
			</TouchableOpacity>
		);
	};

	onEn = () => {
		const { lang } = this.state;
		if (lang === 'en') {
			AppConfig.global_string.setLanguage('en');
			this.props.setLanguage('en');
			this.setState({ lang: 'en', isShowSortsContainer: false, MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			],  });
		} else {
			this.setState({ isLoading: true });

			let body = new FormData();
			body.append("app_id", 'amgames!@#123');
			body.append("access_token", AppConfig.accessToken);
			body.append("language", "en");

			RequestApi(
				"member_menu/select_language",
				body,
				"POST"
			)
				.then(response => {
					if (response.status === "Success") {
						AppConfig.global_string.setLanguage('en');
						this.props.setLanguage('en');
						this.setState({ lang: 'en', isShowSortsContainer: false, isLoading: false, MENU_ITEMS: [
							{ index: 0, title: AppConfig.global_string.home },
							{ index: 1, title: AppConfig.global_string.newsupdate },
							{ index: 2, title: AppConfig.global_string.genealogy },
							{ index: 3, title: AppConfig.global_string.mgntrade },
							{ index: 4, title: AppConfig.global_string.exchangemarket },
							// { index: 5, title: AppConfig.global_string.products },
							{ index: 5, title: AppConfig.global_string.ewallet },
							{ index: 6, title: AppConfig.global_string.report },
							{ index: 7, title: AppConfig.global_string.helpdesk },
							{ index: 8, title: AppConfig.global_string.myaccount }
						],  });
					} else {
						this.setState({ isLoading: false });
					}
				})
				.catch(error => {
					alert(error);
					this.setState({ isLoading: false });
				});
		}
	};

	onCh = () => {
		const { lang } = this.state;
		if (lang === 'ch') {
			AppConfig.global_string.setLanguage('ch');
			this.props.setLanguage('ch');
			this.setState({ lang: 'ch', isShowSortsContainer: false, MENU_ITEMS: [
				{ index: 0, title: AppConfig.global_string.home },
				{ index: 1, title: AppConfig.global_string.newsupdate },
				{ index: 2, title: AppConfig.global_string.genealogy },
				{ index: 3, title: AppConfig.global_string.mgntrade },
				{ index: 4, title: AppConfig.global_string.exchangemarket },
				// { index: 5, title: AppConfig.global_string.products },
				{ index: 5, title: AppConfig.global_string.ewallet },
				{ index: 6, title: AppConfig.global_string.report },
				{ index: 7, title: AppConfig.global_string.helpdesk },
				{ index: 8, title: AppConfig.global_string.myaccount }
			],  });
		} else {
			this.setState({ isLoading: true });

			let body = new FormData();
			body.append("app_id", 'amgames!@#123');
			body.append("access_token", AppConfig.accessToken);
			body.append("language", "si_cn");

			RequestApi(
				"member_menu/select_language",
				body,
				"POST"
			)
				.then(response => {
					if (response.status === "Success") {
						AppConfig.global_string.setLanguage('ch');
						this.props.setLanguage('ch');
						this.setState({ lang: 'ch', isShowSortsContainer: false, isLoading: false, MENU_ITEMS: [
							{ index: 0, title: AppConfig.global_string.home },
							{ index: 1, title: AppConfig.global_string.newsupdate },
							{ index: 2, title: AppConfig.global_string.genealogy },
							{ index: 3, title: AppConfig.global_string.mgntrade },
							{ index: 4, title: AppConfig.global_string.exchangemarket },
							// { index: 5, title: AppConfig.global_string.products },
							{ index: 5, title: AppConfig.global_string.ewallet },
							{ index: 6, title: AppConfig.global_string.report },
							{ index: 7, title: AppConfig.global_string.helpdesk },
							{ index: 8, title: AppConfig.global_string.myaccount }
						],  });
					} else {
						this.setState({ isLoading: false });
					}
				})
				.catch(error => {
					alert(error);
					this.setState({ isLoading: false });
				});
		}
	};

	onMl = () => {
		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("language", "Bahasa");

		RequestApi(
			"member_menu/select_language",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.global_string.setLanguage('ml');
					this.props.setLanguage('ml');
					this.setState({ lang: 'ml', isShowSortsContainer: false, isLoading: false, MENU_ITEMS: [
						{ index: 0, title: AppConfig.global_string.home },
						{ index: 1, title: AppConfig.global_string.newsupdate },
						{ index: 2, title: AppConfig.global_string.genealogy },
						{ index: 3, title: AppConfig.global_string.mgntrade },
						{ index: 4, title: AppConfig.global_string.exchangemarket },
						// { index: 5, title: AppConfig.global_string.products },
						{ index: 5, title: AppConfig.global_string.ewallet },
						{ index: 6, title: AppConfig.global_string.report },
						{ index: 7, title: AppConfig.global_string.helpdesk },
						{ index: 8, title: AppConfig.global_string.myaccount }
					],  });
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				alert(error);
				this.setState({ isLoading: false });
			});
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
		const { isLoading } = this.state;
		return (
			<View style={styles.container}>
				{this.renderHeader()}
				{this.renderLang()}
				{this.renderContent()}
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
