/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Heart = ({ filled, style, ...props }) => {
	const fillStyle = filled ? styles.filledHeart : styles.empty;
	return (
		<Animated.View {...props} style={[styles.heart, style]}>
			<View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
			<View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	haert: {
		width: 50,
		height: 50,
		backgroundColor: 'transparent'
	},
	heartShape: {
		width: 30,
		height: 45,
		position: 'absolute',
		top: 0,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15
	},
	filledHeart: {
		backgroundColor: '#e31745'
	},
	fit: {
		transform: [{ scale: 0.9 }]
	},
	empty: {
		backgroundColor: '#ccc'
	},
	leftHeart: {
		transform: [{ rotate: '-45deg' }],
		left: -20,
	},
	rightHeart: {
		transform: [{ rotate: '45deg' }],
		right: -20,
	}
});

export default Heart;
