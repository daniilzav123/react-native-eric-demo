import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ActivityIndicator,
	ListView,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
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
	newsImg: {
		width: AppConfig.windowWidth - 90,
		height: AppConfig.windowWidth - 160,
		resizeMode: 'contain'
	},
});

class _NewsUpdateScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "NewsUpdateScene",
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
		this.props.setCurrentScene("NewsUpdateScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);

		RequestApi(
			"member/announcement",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.news_data = response.data.news;
					// .title
					// .date_created
					// .contents
				}
				this.setState({ isLoading: false });
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
		// let str = rowData.contents;
		// str = str.substring(str.indexOf("http") + 1);
		// let new_str = str.substring(0, str.indexOf(".jpg"));
		// const imageUrl = 'h' + new_str + '.jpg';
		return (
			<View style={styles.priceContainer}>
				<View style={styles.line}>
					<Text>{AppConfig.global_string.title}: </Text>
					<Text>{rowData.title}</Text>
				</View>
				<View style={styles.line}>
					<Text>{AppConfig.global_string.contents}: </Text>
					<Text>{rowData.contents}</Text>
				</View>
				<View style={styles.line}>
					<Text>{AppConfig.global_string.date}: </Text>
					<Text>{rowData.date_created}</Text>
				</View>
				{/*<View style={styles.line}>*/}
					{/*<Image*/}
						{/*style={styles.newsImg}*/}
						{/*source={{ uri: imageUrl }}*/}
					{/*/>*/}
				{/*</View>*/}
			</View>
		);
	};

	render() {
		const { isLoading } = this.state;
		const { news_data } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.newsupdate}
					onMenu={this.onMenu}
				/>
				<ListView
					dataSource={this.ds.cloneWithRows(news_data)}
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
const NewsUpdateScene1 = sideBarContainer(_NewsUpdateScene);
const NewsUpdateScene = userContainer(NewsUpdateScene1);
export default NewsUpdateScene;
