import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated
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

export default class ClaimErrorScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {

  }


  render() {
    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        onSwipeUp={()=> this.props.navigation.navigate('registration')}
        style={{flex: 1}}
        >
        <View style={styles.container}>
          <CustomText>{`No clicks detected.\n\nPlease confirm that your rune is powered on and connected.`}</CustomText>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('registration')}>
            <CustomText>back</CustomText>
          </TouchableOpacity> */}
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
    padding: 20
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
