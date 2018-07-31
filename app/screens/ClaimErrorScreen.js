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

    return (
      <View style={styles.container}>
        <Text>No clicks detected. Please ensure your rune is powered on and connected to the app.</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('registration')}>
          <Text>back</Text>
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
