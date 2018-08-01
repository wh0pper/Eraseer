import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import PlayerBox from '../components/PlayerBox';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export default class RemovePlayerScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      playerList: []
    };

  }

  componentDidMount() {
    this.setState({
      playerList: this.props.navigation.getParam('players'),
      removedPlayer: this.props.navigation.getParam('removedPlayer', {})
    });
    console.log('removed player param in remove screen', this.state.removedPlayer);
  }

  nextScreen() {
    let remainingPlayers = this.state.playerList.filter((p) => p.isAlive);
    if (remainingPlayers == 1) {
      this.props.navigation.navigate('score', {players: this.state.playerList});
    } else {
      this.props.navigation.navigate('game');
    }
  }

  render() {

    return (
      <View style={styles.container}>
        {(this.state.removedPlayer !== {}) ?
          <View>
            <View style={styles.title}>
              <Text> was eliminated.</Text>
            </View>
            {/* <PlayerBox displayInfo={this.props.navigation.getParam('removedPlayer')}></PlayerBox> */}
            <TouchableOpacity onPress={() => this.nextScreen()}>
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <View style={styles.title}>
              <Text>No player eliminated.</Text>
            </View>
            <TouchableOpacity onPress={() => this.nextScreen()}>
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        }
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
  }
});
