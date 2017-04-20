/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableWithoutFeedback
} from 'react-native';
import Heart from './Heart';

export default class HeartShpaedBounceButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: false,
			animating: false,
			scale: new Animated.Value(0),
			animations: [
				new Animated.Value(0),
				new Animated.Value(0),
				new Animated.Value(0),
				new Animated.Value(0),
				new Animated.Value(0),
				new Animated.Value(0)
			]
		};
	}
	triggerLike = async () => {
		if (this.state.animating) {
			return;
		}
		await this.setState({
			liked: !this.state.liked,
			animating: true
		});
		Animated.spring(this.state.scale, {
			toValue: 2,
			friction: 5
		}).start(async () => {
			await this.setState({ animating: false });
			this.state.scale.setValue(0);
		});
	};
	render() {
		const bouncyHeart = this.state.scale.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [1, 0.8, 1]
		});
		const heartButtonStyle = {
			transform: [{ scale: bouncyHeart }]
		};
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.triggerLike}>
					<Animated.View style={heartButtonStyle}>
						<Heart filled={this.state.liked} />
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF'
	}
});

AppRegistry.registerComponent(
	'HeartShpaedBounceButton',
	() => HeartShpaedBounceButton
);
