import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export default class ScanScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      availableDevices: this.props.screenProps.deviceList,
    };

  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>{this.state.availableDevices.length} runes connected</Text>
        </View>
        <Text>Swipe left to continue when all runes are connected.</Text>
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
    justifyContent: 'center',
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
