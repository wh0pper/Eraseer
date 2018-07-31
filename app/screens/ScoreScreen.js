import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PlayerBox from '../components/PlayerBox';
import Timer from '../components/Timer';

export default class ScoreScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      playerList: this.props.navigation.getParam('players', []),
    };

  }

  componentDidMount() {
    let players = this.state.playerList;
    players.sort((a,b) => {return b.points - a.points});
    this.setState({players: players});
  }

  resetGame() {
    let players = this.state.playerList;
    players.forEach((player) => player = {} );
    let resetPlayers = this.props.navigation.getParam('resetPlayers');
    resetPlayers();
    this.props.navigation.navigate('registration');
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Score screen</Text>
        <Text>Last player standing:</Text>
        <PlayerBox displayInfo={this.state.playerList.find((p) => p.isAlive == true)}></PlayerBox>
        <Text>Point Totals:</Text>
        <FlatList
            data={this.state.playerList}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.columnContainer}>
                  <View style={styles.hexColumn}>
                    <PlayerBox displayInfo={item}></PlayerBox>
                  </View>
                  <View style={styles.pointColumn}>
                    <Text>{item.points}</Text>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => this.resetGame()}
            >
            <Text>New Match</Text>
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
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  columnContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hexColumn: {

  },
  pointColumn: {

  }
});
