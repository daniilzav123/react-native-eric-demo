import React, { PropTypes } from "react";
import { Text, StyleSheet } from "react-native";
import { DARK_COLOR } from "AppColors";

const styles = StyleSheet.create({
	text: {
		fontSize: 13,
		// fontFamily: "SF UI Text"
	}
});

export function LabelText({
														children,
														style,
														upperCase,
														fontSize,
														numberOfLines,
														color,
														ref
													}) {
	const label = upperCase ? children.toUpperCase() : children;
	return (
		<Text
			style={[styles.text, style, { fontSize }, { color }]}
			numberOfLines={numberOfLines}
			ref={ref}
		>
			{label}
		</Text>
	);
}

LabelText.propTypes = {
	children: PropTypes.any.isRequired,
	style: PropTypes.any,
	upperCase: PropTypes.bool,
	fontSize: PropTypes.number.isRequired,
	numberOfLines: PropTypes.number.isRequired,
	ref: PropTypes.any,
	color: PropTypes.string
};

LabelText.defaultProps = {
	upperCase: false,
	fontSize: 13,
	numberOfLines: 1,
	color: DARK_COLOR
};
