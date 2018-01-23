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
} from 'react-native';

const app_width = Dimensions.get('screen').width;
const app_height = Dimensions.get('screen').height;
const app_scale = Dimensions.get('screen').scale;

currentNote = 'A';

export class LeftTunerBars extends Component {
	render() {
		return (
			<View style={styles.left_tuner_bar}>
				<Image
					style={styles.greenbarl1}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarl2}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarl3}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarl4}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarl5}
					source={require('./images/green_bar.png')}
				/>
			</View>
		);
	}
}

export class RightTunerBars extends Component {
	render() {
		return (
			<View style={styles.right_tuner_bar}>
				<Image
					style={styles.greenbarr1}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarr2}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarr3}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarr4}
					source={require('./images/green_bar.png')}
				/>
				<Image
					style={styles.greenbarr5}
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
				<TunerReadoutMiddle name='TunerReadoutMiddle' />
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
				<LeftTunerBars name='LeftTunerBars' />
				<Text 
					style={styles.tuner_letter}
				>
					{currentNote}
				</Text>
				<RightTunerBars name='RightTunerBars' />
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
		};
	}
	
	componentDidMount() {
       StatusBar.setHidden(true);
    }
	
	onPressGuitarButton = () => {
		this.setState({guitar: !this.state.guitar, bass: !this.state.bass});
		//this.guitarReadoutCallback(this.state.guitar, this.state.bass);
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
		fontFamily: 'sans-serif-medium',
		marginLeft: 15,
		marginRight: 15
	},
	tuner_button_text_guitar: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginRight: 28
	},
	tuner_button_text_flat: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginLeft: 28
	},
	tuner_top_text_guitar: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginRight: 72
	},
	tuner_top_text_bass: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginLeft: 72
	},
	tuner_top_text_guitar_hidden: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginRight: 72,
		opacity: 0
	},
	tuner_top_text_bass_hidden: {
		color: '#4e9e00', 
		fontSize: 12,
		fontFamily: 'sans-serif-medium',
		marginLeft: 72,
		opacity: 0
	},
	tuner_text_flat1: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
		fontWeight: 'bold'
	},
	tuner_text_flat2: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
		fontWeight: 'bold'
	},
	tuner_text_flat3: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
		fontWeight: 'bold'
	},
		tuner_text_flat1_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
		fontWeight: 'bold',
		opacity: 0
	},
	tuner_text_flat2_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
		fontWeight: 'bold',
		opacity: 0
	},
	tuner_text_flat3_hidden: {
		color: '#4e9e00', 
		fontSize: 11,
		fontFamily: 'sans-serif',
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
	tuner_readout_top_view: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 105,
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
	greenbarl1: {
		marginRight: 5
	},
	greenbarl2: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarl3: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarl4: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarl5: {
		marginLeft: 5
	},
	greenbarr1: {
		marginRight: 5
	},
	greenbarr2: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarr3: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarr4: {
		marginRight: 5,
		marginLeft: 5
	},
	greenbarr5: {
		marginLeft: 5
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
