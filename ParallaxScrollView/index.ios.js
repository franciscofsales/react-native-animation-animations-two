import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	Animated
} from 'react-native';
import Still from './Still';

const { height, width } = Dimensions.get('window');
const Images = [
	{ image: require('./images/image1.jpg'), title: 'Amazing Cocktail' },
	{ image: require('./images/image2.jpg'), title: 'Drinkme Whole' },
	{ image: require('./images/image3.jpg'), title: 'Incredible SexOnTheBeach' },
	{ image: require('./images/image4.jpg'), title: 'Mojito or Margherita' }
];
const getInterpolate = (animatedScroll, i, imagesLength) => {
	const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
	const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];
	return animatedScroll.interpolate({
		inputRange,
		outputRange,
		extrapolate: 'clamp'
	});
};
const getSeparator = i => (
	<View style={[styles.separator, { left: (i - 1) * width - 2.5 }]} key={i} />
);
export default class ParallaxScrollView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animatedScroll: new Animated.Value(0)
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					pagingEnabled
					horizontal
					scrollEventThrottle={16}
					onScroll={Animated.event([
						{
							nativeEvent: {
								contentOffset: {
									x: this.state.animatedScroll
								}
							}
						}
					])}
				>
					{Images.map((image, i) => (
						<Still
							key={i}
							{...image}
							translateX={getInterpolate(
								this.state.animatedScroll,
								i,
								Images.length
							)}
						/>
					))}
					{Array.apply(null, { length: Images.length + 2 }).map((_, i) =>
						getSeparator(i)
					)}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333'
	},
	separator: {
		backgroundColor: '#000',
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: 5
	}
});

AppRegistry.registerComponent('ParallaxScrollView', () => ParallaxScrollView);
