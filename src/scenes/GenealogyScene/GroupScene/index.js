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

	render() {
		const test_treedata = {
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
		return (
			<View style={styles.container}>
				<HeaderBar
					cenTitle="Group"
					back={this.onBack}
					spec="Group"
				/>
				<View style={styles.treeContainer}>
					<Tree treeData={test_treedata}/>
				</View>
			</View>
		);
	}
}

import { sideBarContainer, userContainer } from "ReduxContainers";
const GroupScene1 = sideBarContainer(_GroupScene);
const GroupScene = userContainer(GroupScene1);
export default GroupScene;
