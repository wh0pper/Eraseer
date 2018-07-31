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
      initialPlayers: this.props.navigation.getParam('players', []).slice(),
      remainingPlayers: this.props.navigation.getParam('players', []).slice(),
      nextRoundReady: false,
      gameWon: false,
      noClickRoundCount: 0,
      timeRemaining: 5
    };

  }

  componentDidMount() {
    console.log('game component did mount, starting timer');
    // this.startTimer();
    this.props.screenProps.setCurrentScreen('game');
  }

  startTimer() {
    let startTime = Date.now();
    console.log('Round start time: ', startTime);
    this.listenForClick(startTime);
    let timer = setInterval(() => {
      let newValue = this.state.timeRemaining - 1;
      if (newValue >= 0) {
        this.setState({timeRemaining: newValue});
      } else {
        clearInterval(timer);
        this.processRound();
        //determine winner
      }
    }, 1000);
  }

  listenForClick(startTime) {
    // do {
    let players = this.state.remainingPlayers;
    let clickedPlayer;
    let listening = setInterval(() => {
      // console.log('listening in round: ', this.props.screenProps.lastClick);
      if (this.state.timeRemaining == 0) {
        clearInterval(listening);
      }
      let lastClick = this.props.screenProps.lastClick;
      if (lastClick.time > startTime) {
        console.log('Detected click in round:', lastClick)
        clickedPlayer = players.find((p) => p !== undefined && p.peripheralId == lastClick.peripheral) || {click: 0}
        //only log this click to user if they haven't already clicked this round
        console.log('Found player: ',clickedPlayer);
        console.log(!clickedPlayer.click > startTime);
        if (clickedPlayer.click < startTime) {
          let removeAt = players.indexOf(clickedPlayer);
          clickedPlayer.click = lastClick.time;
          console.log('logging received click to player: ',clickedPlayer);
          players.splice(removeAt, 1, clickedPlayer);
          console.log('updated playerlist: ', players);
        }
      }
    }, 100)
    // while (this.state.timeRemaining > 0)
    this.setState({remainingPlayers: players});
  }

  mockClick(player) {
    let clickTime = Date.now();
    let players = this.state.remainingPlayers;
    let clickedPlayer = players.find((individual) => p !== undefined && individual.color == player.color);
    clickedPlayer.click = clickTime;
    let updateIndex = players.indexOf(clickedPlayer);
    players.splice(updateIndex,1);
    players.splice(updateIndex,0,clickedPlayer);
  }

  processRound() {
    let allPlayers = this.state.initialPlayers;
    let remainingPlayers = this.state.remainingPlayers;
    //console.log('all players before process: ', allPlayers);
    //determine elimination
    let clickers = remainingPlayers.filter((p) => p !== undefined && p.click > 0);
    clickers.sort((a,b) => {return a.click-b.click});
    if (clickers.length > 0) {
      this.setState({noClickRoundCount: 0});
      let firstClicker = clickers[0];
      let startIndex = remainingPlayers.indexOf(firstClicker);
      //if everyone clicks, need to loop back to index 1
      let removeIndex = startIndex + clickers.length;
      if (removeIndex >= remainingPlayers.length) {
        removeIndex = removeIndex % remainingPlayers.length;
      }
      let removePlayer = remainingPlayers[removeIndex];
      //console.log("first click from: ", clickers[0]);
      //console.log('All clickers: ', clickers);
      //console.log('removed player: ', removePlayer)
      remainingPlayers.splice(removeIndex, 1);
      this.setState({remainingPlayers: remainingPlayers});

      //determine points
      remainingPlayers.forEach((player) => {
        let wasClicker = (clickers.indexOf(player) == -1) ? false : true;
        if (remainingPlayers.length == 1) {
          player.points += 5;
        }
        if (wasClicker) {
          if (player != removePlayer) {
            if (player == firstClicker) {
              player.points += 3;
            } else {
              player.points += 1;
            }
          }
        }
        //update that player in allPlayers list
        let updateObject = allPlayers.find((p) => p.color == player.color);
        let updateIndex = allPlayers.indexOf(updateObject);
        allPlayers.splice(updateIndex,1,updateObject);
        //console.log('all players with updated points: ', allPlayers);
        this.setState({initialPlayers: allPlayers});
      });
    } else {
      let newValue = this.state.noClickRoundCount + 1;
      this.setState({noClickRoundCount: newValue});
      if (newValue == 2) {
        //go to game over screen
      }
    }
    this.setState({remainingPlayers: remainingPlayers});
    //console.log('players at end of round: ', remainingPlayers);
    if (remainingPlayers.length>1) {
      // this.startNewRound();
      this.setState({nextRoundReady: true})
    } else {
      this.setState({
        nextRoundReady: false,
        gameWon: true
      });
      this.props.navigation.navigate('score', {
        players: this.state.initialPlayers,
        lastPlayerStanding: remainingPlayers[0]
      });
    }
  }

  calcScores() {

  }

  startNewRound() {
    let remainingPlayers = this.state.remainingPlayers;
    remainingPlayers.forEach((player) => player.click = 0);
    this.setState({
      timeRemaining: 10,
      players: remainingPlayers,
    });
    this.startTimer();
  }

  render() {
    let nextRoundButton = null;
    if (this.state.nextRoundReady) {
      nextRoundButton =
      <TouchableOpacity onPress={() => this.startNewRound()}>
        <Text>Next Round</Text>
      </TouchableOpacity>
    }

    // //console.log('player list in game screen: ', this.props.navigation.getParam('players','no players'));
    //console.log('player list from state in game: ', this.state.remainingPlayers);
    let displayPlayers = this.state.remainingPlayers;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.startTimer()}>
          <Text>Start round</Text>
        </TouchableOpacity>
        <Timer seconds={this.state.timeRemaining}/>
        <Text style={{color: '#ff0000', fontSize: 30}}>{this.state.timeRemaining}</Text>
        {/* <FlatList
            data={displayPlayers}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.mockClick(item)}>
                    <PlayerBox currentScreen={this.props.screenProps.currentScreen} displayInfo={item}></PlayerBox>
                  </TouchableOpacity>
                </View>
              );
            }}
          /> */}
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
