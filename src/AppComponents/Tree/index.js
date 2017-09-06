import React, { Component, PropTypes } from "react";
import {
	View,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	ListView,
} from "react-native";
import AppConfig from "AppConfig";
import { GlobalStorage } from "AppUtilities";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PinchZoomView from 'react-native-pinch-zoom-view';

const bank_data = ["1", "1", "1", "1"];

const styles = StyleSheet.create({
	container: {
	},
	plusImg: {
		width: 25,
		height: 25,
	},
});

export class Tree extends Component {
	static propTypes = {
		treeData: PropTypes.any,
		register: PropTypes.func,
		downline: PropTypes.func,
		scale: PropTypes.number,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.matrix = new Array(bank_data.length);
		for (let i = 0; i < bank_data.length; i++) {
			this.matrix[i] = new Array(Math.pow(2, bank_data.length) - 1);
		}
	}

	componentDidMount() {
		for (let i = 0; i < bank_data.length; i++) {
			for (let j = 0; j < Math.pow(2, bank_data.length) - 1; j++) {
				if ((j+1) % Math.pow(2, bank_data.length - i - 1 ) === 0 && (j+1) / Math.pow(2, bank_data.length - i - 1 ) % 2 === 1) {
					this.matrix[i][j] = (j+1) / Math.pow(2, bank_data.length - i - 1 );
				} else {
					this.matrix[i][j] = 0;
				}
			}
		}
	}

	renderRow = (rowData, sectionID, rowID) => {
		let render_row = [];

		for (let i = 0; i < Math.pow(2, bank_data.length) - 1; i++) {
			const key = "render_row" + i;
			render_row.push(
				<View
					key={key}
					style={{
						width: 120 * this.props.scale,
						height: 80 * this.props.scale,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{
						this.matrix[parseInt(rowID)][i] > 0 && this.checkTree(parseInt(rowID), i) === "+" &&
							<TouchableOpacity style={{ padding: 20 }} onPress={() => { this.props.register(parseInt(rowID), this.matrix[parseInt(rowID)][i]); }}>
								<Image style={styles.plusImg} source={require('img/plus.png')}/>
							</TouchableOpacity>
					}
					{
						this.matrix[parseInt(rowID)][i] > 0 && this.checkTree(parseInt(rowID), i) !== "null" && this.checkTree(parseInt(rowID), i) !== "+" &&
							<TouchableOpacity
								style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => { this.props.downline(parseInt(rowID), this.matrix[parseInt(rowID)][i]); }}
							>
								<Image style={styles.plusImg} source={require('img/user.png')}/>
								<Text style={{fontSize: 12 * this.props.scale, textAlign: 'center'}}>{this.checkTree(parseInt(rowID), i)}</Text>
							</TouchableOpacity>
					}
				</View>
			);
		}
		return (
			<View style={{flexDirection: 'row'}}>
				{render_row}
			</View>
		);
	};

	checkTree = (i, j) => {
		const { treeData } = this.props;
		if (i === 0) {
			return treeData.userid;
		} else if (i === 1) {
			if (treeData.child === undefined) {
				return "+";
			}
			if (this.matrix[1][j] === 1) {
				if (treeData.child.L !== undefined) {
					return treeData.child.L.userid;
				} else {
					return "+"
				}
			} else {
				if (treeData.child.R !== undefined) {
					return treeData.child.R.userid;
				} else {
					return "+"
				}
			}
		} else if (i === 2) {
			if (treeData.child === undefined) {
				return "null";
			}
			if (this.matrix[2][j] === 1) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "+";
				}
				if (treeData.child.L.child.L !== undefined) {
					return treeData.child.L.child.L.userid;
				} else {
					return "+"
				}
			} else if (this.matrix[2][j] === 3) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "+";
				}
				if (treeData.child.L.child.R !== undefined) {
					return treeData.child.L.child.R.userid;
				} else {
					return "+"
				}
			} else if (this.matrix[2][j] === 5) {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "+";
				}
				if (treeData.child.R.child.L !== undefined) {
					return treeData.child.R.child.L.userid;
				} else {
					return "+"
				}
			} else {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "+";
				}
				if (treeData.child.R.child.R !== undefined) {
					return treeData.child.R.child.R.userid;
				} else {
					return "+"
				}
			}
		} else if (i === 3) {
			if (treeData.child === undefined) {
				return "null";
			}
			if (this.matrix[3][j] === 1) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "null";
				}
				if (treeData.child.L.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child.L.child === undefined) {
					return "+";
				}

				if (treeData.child.L.child.L.child.L !== undefined) {
					return treeData.child.L.child.L.child.L.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 3) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "null";
				}
				if (treeData.child.L.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child.L.child === undefined) {
					return "+";
				}

				if (treeData.child.L.child.L.child.R !== undefined) {
					return treeData.child.L.child.L.child.R.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 5) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "null";
				}
				if (treeData.child.L.child.R === undefined) {
					return "null";
				}
				if (treeData.child.L.child.R.child === undefined) {
					return "+";
				}

				if (treeData.child.L.child.R.child.L !== undefined) {
					return treeData.child.L.child.R.child.L.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 7) {
				if (treeData.child.L === undefined) {
					return "null";
				}
				if (treeData.child.L.child === undefined) {
					return "null";
				}
				if (treeData.child.L.child.R === undefined) {
					return "null";
				}
				if (treeData.child.L.child.R.child === undefined) {
					return "+";
				}

				if (treeData.child.L.child.R.child.R !== undefined) {
					return treeData.child.L.child.R.child.R.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 9) {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "null";
				}
				if (treeData.child.R.child.L === undefined) {
					return "null";
				}
				if (treeData.child.R.child.L.child === undefined) {
					return "+";
				}

				if (treeData.child.R.child.L.child.L !== undefined) {
					return treeData.child.R.child.L.child.L.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 11) {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "null";
				}
				if (treeData.child.R.child.L === undefined) {
					return "null";
				}
				if (treeData.child.R.child.L.child === undefined) {
					return "+";
				}

				if (treeData.child.R.child.L.child.R !== undefined) {
					return treeData.child.R.child.L.child.R.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 13) {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "null";
				}
				if (treeData.child.R.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child.R.child === undefined) {
					return "+";
				}

				if (treeData.child.R.child.R.child.L !== undefined) {
					return treeData.child.R.child.R.child.L.userid;
				} else {
					return "+";
				}
			} else if (this.matrix[3][j] === 15) {
				if (treeData.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child === undefined) {
					return "null";
				}
				if (treeData.child.R.child.R === undefined) {
					return "null";
				}
				if (treeData.child.R.child.R.child === undefined) {
					return "+";
				}

				if (treeData.child.R.child.R.child.R !== undefined) {
					return treeData.child.R.child.R.child.R.userid;
				} else {
					return "+";
				}
			}
		}
	};

	render() {
		if (this.props.treeData.length === 0) {
			return (
				<View/>
			)
		}
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				<View>
					<ListView
						dataSource={this.ds.cloneWithRows(bank_data)}
						renderRow={this.renderRow}
						enableEmptySections={true}
						removeClippedSubviews={false}
					/>
				</View>
			</ScrollView>
		);
	}
}
