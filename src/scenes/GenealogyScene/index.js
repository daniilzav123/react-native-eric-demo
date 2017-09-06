import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ListView,
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
	redTxt: {
		fontSize: 17,
		color: '#561e19',
		marginTop: 10,
		fontWeight: 'bold'
	},
	leftTxt: {
		marginRight: 10,
	},
	rightTxt: {
		marginLeft: 10,
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
	accessContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	margin: {
		height: 20,
	},
	registerBtn: {
		width: AppConfig.windowWidth - 100,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 50,
		bottom: 40,
		height: 35,
		borderRadius: 5,
		backgroundColor: 'steelblue',
	},
	groupBtn: {
		width: AppConfig.windowWidth - 100,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 50,
		bottom: 90,
		height: 35,
		borderRadius: 5,
		backgroundColor: 'steelblue',
	},
});

class _GenealogyScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "GenealogyScene",
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
		this.props.setCurrentScene("GenealogyScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("search", "-");

		RequestApi(
			"member_network/tree",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					AppConfig.sponsor_data = response.data.members;
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
		return (
			<View>
				<Text>{rowData.f_name}</Text>
			</View>
		);
	};

	reLoad = () => {

	};

	newMember = () => {
		this.props.navigation.navigate("RegisterNewMember", {
			type: 0,
			reLoad: this.reLoad,
		});
	};

	onGroup = () => {
		this.props.navigation.navigate("Group");
	};

	render() {
		const { isLoading } = this.state;
		const { sponsor_data, global_string } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.genealogy}
					onMenu={this.onMenu}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.accessContainer}>
						<Text style={styles.redTxt}>{global_string.sponsor}</Text>
						<View style={styles.margin}/>
						<ListView
							dataSource={this.ds.cloneWithRows(sponsor_data)}
							renderRow={this.renderRow}
							enableEmptySections={true}
							removeClippedSubviews={false}
						/>
					</View>
				</KeyboardAwareScrollView>
				<TouchableOpacity style={styles.groupBtn} onPress={this.onGroup}>
					<Text style={{ color: 'white' }}>{global_string.group}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.registerBtn} onPress={this.newMember}>
					<Text style={{ color: 'white' }}>{global_string.registernewmember}</Text>
				</TouchableOpacity>
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
const GenealogyScene1 = sideBarContainer(_GenealogyScene);
const GenealogyScene = userContainer(GenealogyScene1);
export default GenealogyScene;
