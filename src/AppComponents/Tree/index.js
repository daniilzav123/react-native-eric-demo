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

const bank_data = ["1", "1", "1", "1", "1"];

const styles = StyleSheet.create({
	container: {
	},
});

export class Tree extends Component {
	static propTypes = {
		treeData: PropTypes.array
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

	makeRandomColor = () => {
		let rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
		let mix = [51, 51, 51];
		let mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
		return "rgb(" + mixedrgb.join(",") + ")";
	};

	renderRow = (rowData, sectionID, rowID) => {
		let render_row = [];

		for (let i = 0; i < Math.pow(2, bank_data.length) - 1; i++) {
			const key = "render_row" + i;
			render_row.push(
				<View
					key={key}
					style={{
						width: 40,
						height: 40,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text>
						{
							this.matrix[parseInt(rowID)][i] > 0 && "Item"
						}
					</Text>
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
			return "x";
		} else if (i === 1) {
			if (j === 1) {
				if (treeData.root.child.L !== null) {
					return treeData.root.child.L.name;
				} else {
					return "null"
				}
			} else {
				if (treeData.root.child.R !== null) {
					return treeData.root.child.R.name;
				} else {
					return "null"
				}
			}
		} else if (i === 2) {
			if (j === 1) {
				if (treeData.root.child.L.child.L !== null) {
					return treeData.root.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 3) {
				if (treeData.root.child.L.child.R !== null) {
					return treeData.root.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 7) {
				if (treeData.root.child.R.child.L !== null) {
					return treeData.root.child.R.child.L.name;
				} else {
					return "null"
				}
			} else {
				if (treeData.root.child.R.child.R !== null) {
					return treeData.root.child.R.child.R.name;
				} else {
					return "null"
				}
			}
		} else if (i === 3) {
			if (j === 1) {
				if (treeData.root.child.L.child.L.child.L !== null) {
					return treeData.root.child.L.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 3) {
				if (treeData.root.child.L.child.L.child.R !== null) {
					return treeData.root.child.L.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 5) {
				if (treeData.root.child.L.child.R.child.L !== null) {
					return treeData.root.child.L.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 7) {
				if (treeData.root.child.L.child.R.child.R !== null) {
					return treeData.root.child.L.child.R.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 9) {
				if (treeData.root.child.R.child.L.child.L !== null) {
					return treeData.root.child.R.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 11) {
				if (treeData.root.child.R.child.L.child.R !== null) {
					return treeData.root.child.R.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 13) {
				if (treeData.root.child.R.child.R.child.L !== null) {
					return treeData.root.child.R.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 15) {
				if (treeData.root.child.R.child.R.child.R !== null) {
					return treeData.root.child.R.child.R.child.R.name;
				} else {
					return "null"
				}
			}
		} else if (i === 4) {
			if (j === 1) {
				if (treeData.root.child.L.child.L.child.L.child.L !== null) {
					return treeData.root.child.L.child.L.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 3) {
				if (treeData.root.child.L.child.L.child.L.child.R !== null) {
					return treeData.root.child.L.child.L.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 5) {
				if (treeData.root.child.L.child.L.child.R.child.L !== null) {
					return treeData.root.child.L.child.L.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 7) {
				if (treeData.root.child.L.child.L.child.R.child.R !== null) {
					return treeData.root.child.L.child.L.child.R.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 9) {
				if (treeData.root.child.L.child.R.child.L.child.L !== null) {
					return treeData.root.child.L.child.R.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 11) {
				if (treeData.root.child.L.child.R.child.L.child.R !== null) {
					return treeData.root.child.L.child.R.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 13) {
				if (treeData.root.child.L.child.R.child.R.child.L !== null) {
					return treeData.root.child.L.child.R.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 15) {
				if (treeData.root.child.L.child.R.child.R.child.R !== null) {
					return treeData.root.child.L.child.R.child.R.child.R.name;
				} else {
					return "null"
				}
			}

			if (j === 17) {
				if (treeData.root.child.R.child.L.child.L.child.L !== null) {
					return treeData.root.child.R.child.L.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 19) {
				if (treeData.root.child.R.child.L.child.L.child.R !== null) {
					return treeData.root.child.R.child.L.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 21) {
				if (treeData.root.child.R.child.L.child.R.child.L !== null) {
					return treeData.root.child.R.child.L.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 23) {
				if (treeData.root.child.R.child.L.child.R.child.R !== null) {
					return treeData.root.child.R.child.L.child.R.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 25) {
				if (treeData.root.child.R.child.R.child.L.child.L !== null) {
					return treeData.root.child.R.child.R.child.L.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 27) {
				if (treeData.root.child.R.child.R.child.L.child.R !== null) {
					return treeData.root.child.R.child.R.child.L.child.R.name;
				} else {
					return "null"
				}
			} else if (j === 29) {
				if (treeData.root.child.R.child.R.child.R.child.L !== null) {
					return treeData.root.child.R.child.R.child.R.child.L.name;
				} else {
					return "null"
				}
			} else if (j === 31) {
				if (treeData.root.child.R.child.R.child.R.child.R !== null) {
					return treeData.root.child.R.child.R.child.R.child.R.name;
				} else {
					return "null"
				}
			}
		}
	};

	render() {
		const { treeData } = this.props;
		let render_tree = [];
		for (let i = 0; i < treeData.length; i++) {
			const key = "render_tree" + i;
			render_tree.push(
				<TouchableOpacity
					style={{
						paddingLeft: treeData[i] * 10
					}}
					key={key}
				>
					<Text>Item</Text>
				</TouchableOpacity>
			);
		}
		// return (
		// 	<KeyboardAwareScrollView>
		// 		<View style={styles.container}>
		// 			{render_tree}
		// 		</View>
		// 	</KeyboardAwareScrollView>
		// );
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				<ListView
					dataSource={this.ds.cloneWithRows(bank_data)}
					renderRow={this.renderRow}
					enableEmptySections={true}
					removeClippedSubviews={false}
				/>
			</ScrollView>
		);
	}
}
