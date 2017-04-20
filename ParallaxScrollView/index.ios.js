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

const { height, width } = Dimensions.get('window');

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

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	}
});

AppRegistry.registerComponent('ParallaxScrollView', () => ParallaxScrollView);
