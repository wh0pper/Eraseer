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

export default class ConfirmScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {
    this.queueNextScreen();
  }

  async queueNextScreen() {
    await sleep(1500);
    this.props.navigation.navigate('registration');
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>Dominion claimed successfully.</Text>
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
