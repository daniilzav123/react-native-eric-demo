import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { HeaderBar, Tree } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	treeContainer: {
		paddingTop: 20,
	},
});

class _GroupScene extends Component {
	static propTypes = {
	};

	static navigationOptions = {
		title: "GroupScene",
		header: null,
		gesturesEnabled: Platform.OS !== "ios"
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			scale: 1.0,
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("GroupScene");
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	onRegister = (x, y) => {
		alert(x);
		alert(y);
	};

	onScaleUp = () => {
		const { scale } = this.state;
		if (scale < 2.0) {
			this.setState({ scale: scale + 0.1});
		}
	};

	onScaleDown = () => {
		const { scale } = this.state;
		if (scale > 0.5) {
			this.setState({ scale: scale - 0.1});
		}
	};

	render() {
		const test_treedata1 = {
			root: {
				name: "root",
				child: {
					L: {
						name: "child1",
						child: {
							L: {
								name: "child3"
							},
						},
					},
					R: {
						name: "child2",
						child: {
							L: {
								name: "child4",
								child: {
									R: {
										name: "child5"
									},
								}
							}
						},
					},
				}
			}
		};
		const test_treedata2 = {
			root: {
				name: "root",
				child: {
					R: {
						name: "child1",
						child: {
							L: {
								name: "child4",
								child: {
									R: {
										name: "child5"
									},
								}
							},
							R: {
								name: "child4",
								child: {
									L: {
										name: "child5"
									},
								}
							}
						},
					},
				}
			}
		};
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Group"
					back={this.onBack}
					spec="Group"
				/>
				<View style={styles.treeContainer}>
					<Tree treeData={test_treedata1} register={this.onRegister} scale={this.state.scale}/>
				</View>
				{/*<View style={{*/}
					{/*flexDirection: 'row',*/}
					{/*justifyContent: 'center',*/}
					{/*alignItems: 'center',*/}
					{/*position: 'absolute',*/}
					{/*bottom: 60,*/}
					{/*width: AppConfig.windowWidth,*/}
				{/*}}>*/}
					{/*<Text>Scale: {this.state.scale}x</Text>*/}
				{/*</View>*/}
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					bottom: 30,
					width: AppConfig.windowWidth,
				}}>
					<TouchableOpacity style={{marginRight: 15}} onPress={this.onScaleUp}>
						<Text>Scale Up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{marginLeft: 15}} onPress={this.onScaleDown}>
						<Text>Scale Down</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const GroupScene1 = sideBarContainer(_GroupScene);
const GroupScene = userContainer(GroupScene1);
export default GroupScene;
