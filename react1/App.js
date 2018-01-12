/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export class MainScreen extends Component {
  render() {
    return (
		<View style={styles.mainscreen}>
			<Image 
				style={styles.bgimage}
				source={require('./images/bg.png')} 
				resizeMode="contain" 
			/>
			<Image
				style={styles.mainscreen_screen}
				source={require('./images/bg_screen.png')}
				alignSelf="center"
			/>
		</View>
    );
  }
}

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
		<View style={{alignItems: 'center'}}>
			<MainScreen name='Main' />
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
    backgroundColor: '#000000',
	margin: 0
  },
  bgimage: {
	flex: 1,
    alignSelf: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  mainscreen: {
	 
  },
  mainscreen_screen: {
	
  }
});

// skip this line if using Create React Native App
//AppRegistry.registerComponent('React1', () => Bananas);
