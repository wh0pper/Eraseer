import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native';

import CustomText from '../components/CustomText';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export default class WarningScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {
    this.queueNextScreen();
  }

  async queueNextScreen() {
    await sleep(1200);
    this.props.navigation.navigate('click', {realm: this.props.navigation.getParam('realm')});
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <CustomText>{`OTHER PLAYERS\nHOLD YOUR CLICKS`}</CustomText>
        </View>
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
    marginBottom: 100,
    alignItems: 'center'
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
