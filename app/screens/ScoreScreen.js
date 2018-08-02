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
import { StackActions, NavigationActions } from 'react-navigation';

const navigateToNewGame = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'registration'})]
});

export default class ScoreScreen extends Component {
  constructor(props) {

    super(props);
    let players = this.props.navigation.getParam('players') ||
    [ { name: 'DESPAIR',
    color: '#292929',
    peripheralId: '53C81C33-9350-FBC5-4AD7-07D9A006026D',
    click: 1533238910047,
    points: 3,
    isAlive: false },
  { name: 'DECEIT',
    color: '#7C9132',
    peripheralId: '43E09C09-2358-1AEC-F2A8-8E94611DF7F1',
    click: 0,
    points: 0,
    isAlive: false },
  { name: 'INDIFFERENCE',
    color: '#5386AD',
    peripheralId: '85428B3B-E3A9-FC77-1F67-2BFB064A50E9',
    click: 1533238932396,
    points: 8,
    isAlive: true } ]

    this.state = {
      playerList: players,
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
    this.props.navigation.dispatch(navigateToNewGame);
    // this.props.navigation.navigate('registration');
  }

  render() {
    let players = this.state.playerList;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{top: -30}}>LAST PLAYER STANDING</Text>
          <PlayerBox
            displayInfo={this.state.playerList.find((p) => p.isAlive == true)}>
          </PlayerBox>
        </View>
        <View style={styles.body}>
          <Text>OVERSEER RANKINGS</Text>
          <View style={styles.rankingsContainer}>
            <View style={{height: 375}}>
            <FlatList
                data={players}
                // extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <View style={styles.playerInfo}>
                      <View style={styles.box}><PlayerBox displayInfo={item}></PlayerBox></View>
                      <View style={styles.name}>
                        <Text>{item.name} - </Text><Text>{item.points}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            </View>
            <TouchableOpacity
              onPress={() => this.resetGame()}
              >
              <Text>New Match</Text>
            </TouchableOpacity>
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
    // alignItems: 'center',
    backgroundColor: '#DFDFDF',
    // padding: 20
  },
  rankingsContainer: {
    // flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    marginBottom: 20
  },
  body: {
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
  },
  playerInfo: {
    flexDirection: 'row',
    margin: 10
  },
  box: {
    top: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    // flexGrow: 1,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    // flexDirection: 'column',
    right: 5,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end'
    // alignSelf: 'flex-end'
  }
});
