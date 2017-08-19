import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
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
		fontSize: 15,
		color: '#565656',
		marginRight: 10,
		textAlign: 'right',
		width: 200,
	},
	rightTxt: {
		fontSize: 15,
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
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("MainScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	render() {
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Dashboard"
					onMenu={this.onMenu}
				/>
				<KeyboardAwareScrollView>
					<View style={styles.priceContainer}>
						<View>
							<Text style={styles.upTxt}>E-BONUS</Text>
							<Text style={styles.downTxt}>$433.16</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>E-PROFIT</Text>
							<Text style={styles.downTxt}>$288,750.00</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>ACTIVE CREDIT</Text>
							<Text style={styles.downTxt}>$0.00</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>REINVEST CREDIT</Text>
							<Text style={styles.downTxt}>$41,311.88</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>EDUCATION CREDIT</Text>
							<Text style={styles.downTxt}>$41,311.88</Text>
							<View style={styles.bar}/>
						</View>

						<View>
							<Text style={styles.upTxt}>INVESTMENT CREDIT</Text>
							<Text style={styles.downTxt}>$41,311.88</Text>
							<View style={styles.bar}/>
						</View>

					</View>

					<View style={styles.accountOverView}>
						<Text style={styles.redTxt}>My Account Overview</Text>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>Name</Text>
							<Text style={styles.rightTxt}>Daniil Zavyalov</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>ID</Text>
							<Text style={styles.rightTxt}>daniil92123</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>Investment</Text>
							<Text style={styles.rightTxt}>33000 - Diamond</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>Email</Text>
							<Text style={styles.rightTxt}>daniilzavup@gmail.com</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>Sponsored Members</Text>
							<Text style={styles.rightTxt}>2</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>Sponsored BV</Text>
							<Text style={styles.rightTxt}>80000.00</Text>
						</View>

						<View style={styles.line}>
							<Text style={styles.leftTxt}>E-Profit Max Cap</Text>
							<Text style={styles.rightTxt}>90000</Text>
						</View>
					</View>
					<View style={styles.marginBottom}/>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const MainScene1 = sideBarContainer(_MainScene);
const MainScene = userContainer(MainScene1);
export default MainScene;
