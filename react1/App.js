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
	Dimensions,
	StatusBar,
	TouchableWithoutFeedback,
	DeviceEventEmitter
} from 'react-native';

import Tuner from './tuner.js';

const app_width = Dimensions.get('screen').width;
const app_height = Dimensions.get('screen').height;
const app_scale = Dimensions.get('screen').scale;

export class LeftTunerBars extends Component {
	render() {
		let greenbarl1 = (this.props.mainstate.currentTunerModDirection == "left" && this.props.mainstate.currentTunerMod > 1);
		let greenbarl2 = (this.props.mainstate.currentTunerModDirection == "left" && this.props.mainstate.currentTunerMod > 2);
		let greenbarl3 = (this.props.mainstate.currentTunerModDirection == "left" && this.props.mainstate.currentTunerMod > 3);
		let greenbarl4 = (this.props.mainstate.currentTunerModDirection == "left" && this.props.mainstate.currentTunerMod > 4);
		let greenbarl5 = (this.props.mainstate.currentTunerModDirection == "left" && this.props.mainstate.currentTunerMod > 5);
		
		//console.warn("greenbarl1 ", greenbarl1);
		
		return (
			<View style={styles.left_tuner_bar}>
				<Image
					style={[styles.greenbarl5_hidden, greenbarl5 && styles.greenbarl5]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarl4_hidden, greenbarl4 && styles.greenbarl4]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarl3_hidden, greenbarl3 && styles.greenbarl3]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarl2_hidden, greenbarl2 && styles.greenbarl2]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarl1_hidden, greenbarl1 && styles.greenbarl1]}
					source={require('./images/green_bar.png')}
				/>
			</View>
		);
	}
}

export class RightTunerBars extends Component {
	render() {
		let greenbarr1 = (this.props.mainstate.currentTunerModDirection == "right" && this.props.mainstate.currentTunerMod > 1);
		let greenbarr2 = (this.props.mainstate.currentTunerModDirection == "right" && this.props.mainstate.currentTunerMod > 2);
		let greenbarr3 = (this.props.mainstate.currentTunerModDirection == "right" && this.props.mainstate.currentTunerMod > 3);
		let greenbarr4 = (this.props.mainstate.currentTunerModDirection == "right" && this.props.mainstate.currentTunerMod > 4);
		let greenbarr5 = (this.props.mainstate.currentTunerModDirection == "right" && this.props.mainstate.currentTunerMod > 5);
		
		return (
			<View style={styles.right_tuner_bar}>
				<Image
					style={[styles.greenbarr1_hidden, greenbarr1 && styles.greenbarr1]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarr2_hidden, greenbarr2 && styles.greenbarr2]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarr3_hidden, greenbarr3 && styles.greenbarr3]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarr4_hidden, greenbarr4 && styles.greenbarr4]}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={[styles.greenbarr5_hidden, greenbarr5 && styles.greenbarr5]}
					source={require('./images/green_bar.png')}
				/>
			</View>
		);
	}
}

export class TunerScreenReadout extends Component {
	render() {
		return (
			<View style={styles.tuner_readout}>
				<TunerReadoutTop name='TunerReadoutTop' mainstate = {this.props.mainstate} key = {true} />
				<TunerReadoutMiddle name='TunerReadoutMiddle' mainstate = {this.props.mainstate} />
				<TunerReadoutBottom name='TunerReadoutBottom' mainstate = {this.props.mainstate} />
			</View>
		);
	}
}

export class TunerReadoutTop extends Component {
	
	render() {
		return (
			<View style={styles.tuner_readout_top_view}>
				<Text
					style={[styles.tuner_top_text_guitar, !this.props.mainstate.guitar && styles.tuner_top_text_guitar_hidden]}
				>
					Guitar
				</Text>
				<TunerReadoutFlats name='TunerReadoutFlats' mainstate = {this.props.mainstate} />
				<Text
					style={[styles.tuner_top_text_bass, !this.props.mainstate.bass && styles.tuner_top_text_bass_hidden]}
				>
					Bass
				</Text>
			</View>
		);
	}
}	

export class TunerReadoutMiddle extends Component {
	render() {
		return (
			<View style={styles.tuner_readout_middle_view}>
				<LeftTunerBars name='LeftTunerBars' mainstate = {this.props.mainstate} />
				<Text 
					style={styles.tuner_letter}
				>
					{this.props.mainstate.currentTunerNote}
				</Text>
				<RightTunerBars name='RightTunerBars' mainstate = {this.props.mainstate} />
			</View>
		);
	}
}

export class TunerReadoutBottom extends Component {
	render() {
		let greentriangle = (this.props.mainstate.currentTunerMod == 1);
		
		//console.warn("greentriangle: ", greentriangle);
		return (
			<View style={styles.tuner_readout_bottom_view}>
				<Image
					style={[styles.greentriangle_hidden, greentriangle && styles.greentriangle]}
					source={require('./images/green_triangle.png')}
				/>
			</View>
		);
	}
}	

export class TunerReadoutFlats extends Component {
	
	render() {
		let flat = this.props.mainstate.flat;
		return (
			<View style={styles.tuner_readout_flat_view}>
				<Text
					style={[styles.tuner_text_flat1, !this.props.mainstate.flat1visible && styles.tuner_text_flat1_hidden]}
				>
					{'\u266D'}
				</Text>
				<Text
					style={[styles.tuner_text_flat2, !this.props.mainstate.flat2visible && styles.tuner_text_flat2_hidden]}
				>
					{'\u266D'}
				</Text>
				<Text
					style={[styles.tuner_text_flat3, !this.props.mainstate.flat3visible && styles.tuner_text_flat3_hidden]}
				>
					{'\u266D'}
				</Text>
			</View>
		);
	}
}

export class BackGround extends Component {
	render() {
		return (
			<View style={styles.mainscreen_bg}>
				<Image 
					style={styles.bgimage}
					source={require('./images/bg.png')} 
					resizeMode="contain" 
				/>
				<TunerScreen name='TunerScreen' mainstate = {this.props.mainstate} />
				<GuitarButton name='GuitarButton' mainstate = {this.props.mainstate} />
			</View>
		);
	}
}

export class TunerScreen extends Component {
	render() {
		return (
			<View style={styles.tuner_screen_view}>
				<Image
					//style={styles.tuner_screen}
					source={require('./images/bg_screen.png')}
				/>
				<TunerScreenReadout name='TunerScreenReadout' mainstate = {this.props.mainstate}/>
			</View>
		);
	}
}

export class GuitarButton extends Component {
	
	render() {
		return (
			<View style={styles.tuner_button_view}>
				<TouchableWithoutFeedback onPress={this.props.mainstate.onPressGuitarButton}>
					<Image
						//style={styles.tuner_screen}
						source={require('./images/phy_button.png')}
					/>
				</TouchableWithoutFeedback>
				<Text
					 style={styles.tuner_button_text_guitar}
				>
					G/B
				</Text>
				<Text
					style={styles.tuner_button_text_flat}
				>
					{'\u266D'}
				</Text> 
				<TouchableWithoutFeedback onPress={this.props.mainstate.onPressFlatButton}>
					<Image
						//style={styles.tuner_screen}
						source={require('./images/phy_button.png')}
					/>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			guitar: true, 
			bass: false, 
			flat1visible: false,
			flat2visible: false,
			flat3visible: false,
			flat: 0,
			onPressGuitarButton: this.onPressGuitarButton,
			onPressFlatButton: this.onPressFlatButton,
			currentTunerNote: "A",
			currentTunerMod: 3,
			currentTunerModDirection: "left",
			tunerUpdate: this.tunerUpdate
		};
		
		Tuner.startTuner();
		
		// Start up a timer to take tuner readings...
		setInterval(() => {
			Tuner.getTunerInfo(
				(msg) => {
					console.log(msg);
				},
				(tunerNote, tunerMod, tunerModDirection) => {
					this.tunerUpdate(tunerNote, tunerMod, tunerModDirection);
				}
			);
		}, 100);
	}
		
	tunerUpdate = function(tunerNote, tunerMod, tunerModDirection) {
		this.setState({currentTunerNote: tunerNote, currentTunerMod: tunerMod, currentTunerModDirection: tunerModDirection})
		
	}
	
	componentDidMount = function() {
       StatusBar.setHidden(true);
    }
	
	onPressGuitarButton = () => {
		this.setState({guitar: !this.state.guitar, bass: !this.state.bass});
	}
	
	onPressFlatButton = () => {
		let flat = this.state.flat;
		
		if(flat == 0)
		{
			this.setState({
				flat: 1,
				flat1visible: false,
				flat2visible: false,
				flat3visible: false
			});
		}
		else if(flat == 1)
		{
			this.setState({
				flat: 2,
				flat1visible: true,
				flat2visible: false,
				flat3visible: false
			});
		}
		else if(flat == 2)
		{
			this.setState({
				flat: 3,
				flat1visible: true,
				flat2visible: true,
				flat3visible: false
			});
		}
		else if(flat == 3)
		{
			this.setState({
				flat: 0,
				flat1visible: true,
				flat2visible: true,
				flat3visible: true
			});
		}
		//console.warn('You pressed the flat button!');
	}
	
	render() {
		return (
			
			<View style={styles.mainscreen}>
				<BackGround name='BackGround' mainstate = {this.state} /> 
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainscreen: {
		flex: 1,
		backgroundColor: '#000000',
		margin: 0
	},
	mainscreen_bg: {
		flex: 1,
		position: 'absolute',
		left: 0,
		top: 0
	},
	bgimage: {
		flex: 1,
		position: 'absolute',
		left: 0,
		top: 0,
		width: app_width,
		height: app_height
	},
	tuner_button_view: {
		position: 'absolute',
		flexDirection: 'row',
		left: app_width/2-(276/2),
		top: 210,
		alignItems: 'center',
		justifyContent: 'center',
		width: 276
	},
	tuner_screen_view: {
		position: 'absolute',
		left: app_width/2-(276/2),
		top: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tuner_letter: {
		color: '#4e9e00', 
		fontSize: 60,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginLeft: 15,
		marginRight: 15
	},
	tuner_button_text_guitar: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginRight: 28
	},
	tuner_button_text_flat: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginLeft: 28
	},
	tuner_top_text_guitar: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginRight: 72
	},
	tuner_top_text_bass: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginLeft: 72
	},
	tuner_top_text_guitar_hidden: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginRight: 72,
		opacity: 0
	},
	tuner_top_text_bass_hidden: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-medium' : 'sans-serif-medium',
		marginLeft: 72,
		opacity: 0
	},
	tuner_text_flat1: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold'
	},
	tuner_text_flat2: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold'
	},
	tuner_text_flat3: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold'
	},
		tuner_text_flat1_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold',
		opacity: 0
	},
	tuner_text_flat2_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold',
		opacity: 0
	},
	tuner_text_flat3_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
		fontWeight: 'bold',
		opacity: 0
	},
	tuner_readout: {
		position: 'absolute',
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: 276
	},
	tuner_readout_middle_view: {
		position: 'absolute',
		left: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 276,
	},
	tuner_readout_bottom_view: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10
	},
	tuner_readout_top_view: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 95,
	},
	tuner_readout_flat_view: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	left_tuner_bar: {
		flexDirection: 'row'
	},
	right_tuner_bar: {
		flexDirection: 'row'
	},
	greentriangle: {
		opacity: 100
	},
	greentriangle_hidden: {
		opacity: 0
	},
	greenbarl1: {
		marginRight: 5,
		opacity: 100
	},
	greenbarl2: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarl3: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarl4: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarl5: {
		marginLeft: 5,
		opacity: 100
	},
	greenbarr1: {
		marginRight: 5,
		opacity: 100
	},
	greenbarr2: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarr3: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarr4: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 100
	},
	greenbarr5: {
		marginLeft: 5,
		opacity: 100
	},
	greenbarl1_hidden: {
		marginRight: 5,
		opacity: 0
	},
	greenbarl2_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarl3_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarl4_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarl5_hidden: {
		marginLeft: 5,
		opacity: 0
	},
	greenbarr1_hidden: {
		marginRight: 5,
		opacity: 0
	},
	greenbarr2_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarr3_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarr4_hidden: {
		marginRight: 5,
		marginLeft: 5,
		opacity: 0
	},
	greenbarr5_hidden: {
		marginLeft: 5,
		opacity: 0
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
