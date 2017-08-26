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

const styles = StyleSheet.create({
	container: {
	},
});

export class VerticalTree extends Component {
	static propTypes = {
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<KeyboardAwareScrollView>

			</KeyboardAwareScrollView>
		);
	}
}
