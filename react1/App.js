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
  View,
  Dimensions
} from 'react-native';

const app_width = Dimensions.get('screen').width;
const app_height = Dimensions.get('screen').height;
const app_scale = Dimensions.get('screen').scale;

export class MainScreen extends Component {
  render() {
    return (
      <View style={styles.mainscreen_bg}>
        <Image 
          style={styles.bgimage}
          source={require('./images/bg.png')} 
          resizeMode="contain" 
        />
        <Image
          style={styles.tuner_screen}
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
      <View style={styles.mainscreen}>
        <MainScreen name='Main' />
        <Text style={styles.debug}>
          Height = {app_height}{'\n'}
          Width = {app_width}{'\n'}
          Scale = {app_scale}{'\n'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    margin: 0
  },
  mainscreen_bg: {
    
  },
  bgimage: {
    flex: 1,
    alignSelf: 'stretch'
  },
  tuner_screen: {
    flex: 1,
    position: 'absolute',
    left: (app_width*app_scale/2)-100,
    top: 20
  },
  debug: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'red',
  } 
});

// Get the app dimensions


// Notes:
// -Get the app dimensions to be able to center things...

// skip this line if using Create React Native App
//AppRegistry.registerComponent('React1', () => Bananas);
