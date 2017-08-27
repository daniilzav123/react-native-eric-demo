import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	ListView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { HeaderBar } from "AppComponents"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppConfig.primaryColor
	},
	accessContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	redTxt: {
		fontSize: 17,
		color: '#561e19',
		marginTop: 15,
		fontWeight: 'bold'
	},
	addBank: {
		backgroundColor: 'steelblue',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 10,
		marginTop: 20,
	},
	userID: {
		width: 220,
		height: 30,
		fontSize: 14,
		marginLeft: 5,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'darkgray',
		paddingHorizontal: 5,
		marginTop: 20,
	},
});

class _WalletScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "WalletScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("WalletScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	addBank = () => {
		this.props.navigation.navigate("AddBank");
	};

	renderRow = (rowData, sectionID, rowID) => {
		return (
			<View>

			</View>
		);
	};

	render() {
		const { bank_data } = AppConfig;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.ewallet}
					onMenu={this.onMenu}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.accessContainer}>
						<Text style={styles.redTxt}>Bank Detail</Text>
						<ListView
							dataSource={this.ds.cloneWithRows(bank_data)}
							renderRow={this.renderRow}
							enableEmptySections={true}
							removeClippedSubviews={false}
						/>
						<TouchableOpacity style={styles.addBank} onPress={this.addBank}>
							<Text style={{ color: 'white' }}>Add Bank</Text>
						</TouchableOpacity>

						<Text style={styles.redTxt}>Transfer</Text>
						<View>
							<TextInput
								style={styles.userID}
								placeholder="UserID"
							/>
							<TextInput
								style={styles.userID}
								placeholder="EB Amount"
							/>
							<TouchableOpacity style={styles.addBank} onPress={this.addBank}>
								<Text style={{ color: 'white' }}>Submit</Text>
							</TouchableOpacity>
						</View>

						<Text style={styles.redTxt}>E-Wallet Record</Text>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const WalletScene1 = sideBarContainer(_WalletScene);
const WalletScene = userContainer(WalletScene1);
export default WalletScene;
