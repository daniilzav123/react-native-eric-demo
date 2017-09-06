import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage, RequestApi } from "AppUtilities";
import { HeaderBar, Tree } from "AppComponents"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	treeContainer: {
		paddingTop: 20,
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
			isLoading: false,
			group_data: [],
		};
	}

	componentDidMount() {
		this.props.showSideBar(false);
		this.props.disableSideBar(false);
		this.props.setCurrentScene("GroupScene");

		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("sec_pass", "icentel..win");

		RequestApi(
			"member_network/binarytree",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					debugger;
					this.setState({ isLoading: false, group_data: response.data });
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
			});
	}

	onMenu = () => {
		this.props.showSideBar(true);
	};

	onBack = () => {
		this.props.navigation.goBack();
	};

	onRegister = (x, y) => {
		const { group_data } = this.state;
		let l_r = "L";
		let parent = "";
		if (x === 1) {
			if (y === 1) {
				l_r = "L";
			} else {
				l_r = "R";
			}
			parent = group_data.userid;
		}

		if (x === 2) {
			if (y === 1) {
				l_r = "L";
				parent = group_data.child.L.userid;
			} else if (y === 3) {
				l_r = "R";
				parent = group_data.child.L.userid;
			} else if (y === 5) {
				l_r = "L";
				parent = group_data.child.R.userid;
			} else {
				l_r = "R";
				parent = group_data.child.R.userid;
			}
		}

		if (x === 3) {
			if (y === 1) {
				l_r = "L";
				parent = group_data.child.L.child.L.userid;
			} else if (y === 3) {
				l_r = "R";
				parent = group_data.child.L.child.L.userid;
			} else if (y === 5) {
				l_r = "L";
				parent = group_data.child.L.child.R.userid;
			} else if (y === 7) {
				l_r = "R";
				parent = group_data.child.L.child.R.userid;
			} else if (y === 9) {
				l_r = "L";
				parent = group_data.child.R.child.L.userid;
			} else if (y === 11) {
				l_r = "R";
				parent = group_data.child.R.child.L.userid;
			} else if (y === 13) {
				l_r = "L";
				parent = group_data.child.R.child.R.userid;
			} else {
				l_r = "R";
				parent = group_data.child.R.child.R.userid;
			}
		}

		this.props.navigation.navigate("RegisterNewMember", {
			x, y, parent, l_r, type: 1,
			reLoad: this.reLoad,
		})
	};

	reLoad = () => {
		this.setState({ isLoading: true });

		let body = new FormData();
		body.append("app_id", 'amgames!@#123');
		body.append("access_token", AppConfig.accessToken);
		body.append("sec_pass", "icentel..win");

		RequestApi(
			"member_network/binarytree",
			body,
			"POST"
		)
			.then(response => {
				if (response.status === "Success") {
					debugger;
					AppConfig.group_data = response;
					this.setState({ isLoading: false });
				} else {
					this.setState({ isLoading: false });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
			});
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

	onDownline = (x, y) => {
		if (x === 1) {
			if (y === 1) {
				this.setState({ group_data: this.state.group_data.child.L });
			} else {
				this.setState({ group_data: this.state.group_data.child.R });
			}
		}

		if (x === 2) {
			if (y === 1) {
				this.setState({ group_data: this.state.group_data.child.L.child.L });
			} else if (y === 3) {
				this.setState({ group_data: this.state.group_data.child.L.child.R });
			} else if (y === 5) {
				this.setState({ group_data: this.state.group_data.child.R.child.L });
			} else {
				this.setState({ group_data: this.state.group_data.child.R.child.R });
			}
		}

		if (x === 3) {
			if (y === 1) {
				this.setState({ group_data: this.state.group_data.child.L.child.L.child.L });
			} else if (y === 3) {
				this.setState({ group_data: this.state.group_data.child.L.child.L.child.R });
			} else if (y === 5) {
				this.setState({ group_data: this.state.group_data.child.L.child.R.child.L });
			} else if (y === 7) {
				this.setState({ group_data: this.state.group_data.child.L.child.R.child.R });
			} else if (y === 9) {
				this.setState({ group_data: this.state.group_data.child.R.child.L.child.L });
			} else if (y === 11) {
				this.setState({ group_data: this.state.group_data.child.R.child.L.child.R });
			} else if (y === 13) {
				this.setState({ group_data: this.state.group_data.child.R.child.R.child.L });
			} else {
				this.setState({ group_data: this.state.group_data.child.R.child.R.child.R });
			}
		}
	};

	render() {
		const { isLoading } = this.state;
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
		const { group_data } = this.state;
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle={AppConfig.global_string.group}
					back={this.onBack}
					spec="Group"
				/>
				<View style={styles.treeContainer}>
					<Tree treeData={group_data} register={this.onRegister} downline={this.onDownline} scale={this.state.scale}/>
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
const GroupScene1 = sideBarContainer(_GroupScene);
const GroupScene = userContainer(GroupScene1);
export default GroupScene;
