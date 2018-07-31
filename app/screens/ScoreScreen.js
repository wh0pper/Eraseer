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
    this.props.screenProps.setCurrentScreen('score');
  }

  resetGame() {
    let players = this.state.playerList;
    players.forEach((player) => player = {} );
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
                <View>
                  <PlayerBox currentScreen={this.props.screenProps.currentScreen} displayInfo={item}></PlayerBox>
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
  }
});
