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

export default class GameScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      players: this.props.navigation.getParam('players', []),
      nextRoundReady: false,
      gameWon: false,
      noClickRoundCount: 0,
      timerDuration: 10
    };

  }

  componentDidMount() {
    let timer = setInterval(() => {
      let newValue = this.state.timerDuration - 1;
      if (newValue >= 0) {
        this.setState({timerDuration: newValue});
      } else {
        clearInterval(timer);
        this.processRound();
        //determine winner
      }
    }, 1000);
  }

  mockClick(player) {
    let clickTime = Date.now();
    let players = this.state.players;
    let clickedPlayer = players.find((individual) => individual.color == player.color);
    clickedPlayer.click = clickTime;
    let updateIndex = players.indexOf(clickedPlayer);
    players.splice(updateIndex,1);
    players.splice(updateIndex,0,clickedPlayer);
  }

  processRound() {
    let allPlayers = this.state.players;
    let clickers = allPlayers.filter((player) => player.click > 0);
    clickers.sort((a,b) => {return a.click-b.click});
    if (clickers.length > 0) {
      this.setState({noClickRoundCount: 0});
      let firstClicker = clickers[0];
      let startIndex = allPlayers.indexOf(firstClicker);
      //if everyone clicks, need to loop back to index 1
      let removeIndex = startIndex + clickers.length;
      if (removeIndex > allPlayers.length) {
        removeIndex = removeIndex % allPlayers.length;
      }
      let removePlayer = allPlayers[removeIndex];
      console.log("first click from: ", clickers[0]);
      console.log('All clickers: ', clickers);
      console.log('removed player: ', removePlayer)
      allPlayers.splice(removeIndex, 1);

      //determine points
      allPlayers.forEach((player) => {
        let wasClicker = (clickers.indexOf(player) == -1) ? false : true;
        if (wasClicker) {
          if (player != removePlayer) {
            if (player == firstClicker) {
              player.points += 3;
            } else {
              player.points += 1;
            }
          }
        }
      });
    } else {
      let newValue = this.state.noClickRoundCount + 1;
      this.setState({noClickRoundCount: newValue});
      if (newValue == 2) {
        //go to game over screen
      }
    }
    this.setState({players: allPlayers});
    console.log('players at end of round: ', allPlayers);
    if (allPlayers.length>1) {
      // this.startNewRound();
      this.setState({nextRoundReady: true})
    } else {
      this.setState({
        nextRoundReady: false,
        gameWon: true
      });
    }
  }

  startNewRound() {

  }

  render() {
    let nextRoundButton = null;
    if (this.state.nextRoundReady) {
      nextRoundButton =
      <TouchableOpacity>
        <Text>Next Round</Text>
      </TouchableOpacity>
    }

    // console.log('player list in game screen: ', this.props.navigation.getParam('players','no players'));
    let players = this.state.players;
    return (
      <View style={styles.container}>
        <Text>Game screen</Text>
        <Text style={{color: '#ff0000', fontSize: 30}}>{this.state.timerDuration}</Text>
        {/* <Timer processRound={() => this.processRound()}/> */}
        <FlatList
            data={players}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.mockClick(item)}>
                    <PlayerBox displayInfo={item}></PlayerBox>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {nextRoundButton}
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
  button: {
    backgroundColor: 'lightgray',
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
