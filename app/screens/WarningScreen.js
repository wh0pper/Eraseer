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
    console.log('realm to warning: ', this.props.navigation.getParam('realm'));
    await sleep(2000);
    console.log('moving to click listen screen');
    this.props.navigation.navigate('click', {realm: this.props.navigation.getParam('realm')});
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 20}}>{`OTHER PLAYERS\n HOLD YOUR CLICKS`}</Text>
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
