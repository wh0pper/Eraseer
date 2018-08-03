import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  // PanGestureHandler
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CustomText from '../components/CustomText';
// async function sleep(time) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, time);
//   });
// }

export default class ScanScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      availableDevices: this.props.screenProps.deviceList,
    };

  }

  // componentDidMount() {
  // }
  //
  // componentDidUpdate() {
  //   this.setState
  // }

  onSwipeLeft(gestureState) {
    console.log('left swipe');
    this.props.navigation.navigate('registration')
  }

  // onSwipe(gestureName, gestureState) {
  //   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   this.setState({gestureName: gestureName});
  //   switch (gestureName) {
  //     case SWIPE_UP:
  //       console.log({backgroundColor: 'red'});
  //       break;
  //     case SWIPE_DOWN:
  //       console.log({backgroundColor: 'green'});
  //       break;
  //     case SWIPE_LEFT:
  //       console.log({backgroundColor: 'blue'});
  //       break;
  //     case SWIPE_RIGHT:
  //       console.log({backgroundColor: 'yellow'});
  //       break;
  //   }
  // }

  render() {
    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        // onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeLeft={(state)=> this.onSwipeLeft(state)}
        style={{flex: 1}}
        >
        <View style={styles.container}>
          {this.props.screenProps.scanState ?
            <ActivityIndicator/>
            :
            <TouchableOpacity onPress={() => this.props.screenProps.startScan()}>
              <CustomText>Scan</CustomText>
            </TouchableOpacity>
            }
          <View style={styles.title}>
            <CustomText>{this.state.availableDevices.length} runes connected</CustomText>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('registration');
              }
            }>
            <CustomText>Continue</CustomText>
          </TouchableOpacity>

        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    // padding: 20
  },
  title: {
    marginBottom: 100
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10
  },
  realmContainer: {
    width: 300,
    height: 300
  }
});
