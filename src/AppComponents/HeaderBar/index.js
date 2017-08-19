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

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: AppConfig.windowWidth,
		height: 70,
		paddingTop: 10,
		backgroundColor: 'steelblue',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	cenTitle: {
		color: 'white',
		fontSize: 20
	},
	menuImg: {
		width: 25,
		height: 21,
	}
});

export class HeaderBar extends Component {
	static propTypes = {
		cenTitle: PropTypes.string,
		onMenu: PropTypes.func,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
	}

	onMenu = () => {
		this.props.onMenu();
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={this.onMenu}
				>
					<Image
						source={require('img/icon_menu.png')}
						style={styles.menuImg}
					/>
				</TouchableOpacity>
				<Text style={styles.cenTitle}>{ this.props.cenTitle }</Text>
				<View style={styles.menuImg}/>
			</View>
		);
	}
}