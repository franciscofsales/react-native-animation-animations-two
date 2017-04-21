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

const getTransformationAnimation = (
	animation,
	scale,
	y,
	x,
	rotate,
	opacity
) => {
	const scaleAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, scale]
	});
	const xAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, x]
	});
	const yAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, y]
	});
	const rotateAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', rotate]
	});
	const opacityAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, opacity]
	});
	return {
		opacity: opacityAnimation,
		transform: [
			{ scale: scaleAnimation },
			{ translateX: xAnimation },
			{ translateY: yAnimation },
			{ rotate: rotateAnimation }
		]
	};
};

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
    const showAnimations = this.state.animations.map((animation) => {
      return Animated.spring(animation, {
        toValue: 1,
        friction: 4
      })
    })
    const hideAnimations = this.state.animations.map((animation) => {
      return Animated.timing(animation, {
        toValue: 0,
        duration:50
      })
    }).reverse()
    Animated.parallel([
    	Animated.spring(this.state.scale, {
    		toValue: 2,
    		friction: 4
    	}),
    	Animated.sequence([
    		Animated.stagger(50, showAnimations),
    		Animated.delay(100),
    		Animated.stagger(50, hideAnimations)
    	])
    ]).start(async () => {
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
        <View>
  				<Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[5], .4, -280, 0, "10deg", .7)]} />
  				<Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[4], .7, -120, 40, "45deg", .5)]} />
  				<Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[3], .8, -120, 40, "-45deg", .3)]} />
  				<Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[2], .3, -150, 120, "-35deg", .6)]} />
  				<Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[1], .3, -120, -120, "-35deg", .7)]} />
          <Heart filled style={[styles.heart, getTransformationAnimation(this.state.animations[0], .8, -60, 0, "35deg", .8)]} />
          <TouchableWithoutFeedback onPress={this.triggerLike}>
  					<Animated.View style={heartButtonStyle}>
  						<Heart filled={this.state.liked} />
  					</Animated.View>
  				</TouchableWithoutFeedback>
        </View>
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
	},
	heart: {
		position: 'absolute',
		top: 0,
		left: 0
	}
});

AppRegistry.registerComponent(
	'HeartShpaedBounceButton',
	() => HeartShpaedBounceButton
);
