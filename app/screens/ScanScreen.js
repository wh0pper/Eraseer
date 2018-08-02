import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

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

  render() {

    return (
      <View style={styles.container}>
        {this.props.screenProps.scanState ?
          <ActivityIndicator/>
          :
          <TouchableOpacity onPress={() => this.props.screenProps.startScan()}>
            <Text>Scan</Text>
          </TouchableOpacity>
          }
        <View style={styles.title}>
          <Text>{this.state.availableDevices.length} runes connected</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('registration');
            }
          }>
          <Text>Continue</Text>
        </TouchableOpacity>

      </View>
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
