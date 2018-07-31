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
      playerList: this.props.navigation.getParam('players', []).slice(), //was initialPlayers
      //remainingPlayers: this.props.navigation.getParam('players', []).slice(),
      nextRoundReady: false,
      gameWon: false,
      noClickRoundCount: 0,
      timeRemaining: 10
    };

  }

  componentDidMount() {
    console.log('game component did mount, starting timer');
    console.log('passed params to game screen: ', this.props.navigation.state.params);
    this.startTimer();
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
    let players = this.state.playerList;
    let clickedPlayer;
    let listening = setInterval(() => {
      // console.log('listening in round: ', this.props.screenProps.lastClick);
      if (this.state.timeRemaining == 0) {
        clearInterval(listening);
      }
      let lastClick = this.props.screenProps.lastClick;
      if (lastClick.time > startTime) {
        // console.log('Detected click in round:', lastClick)
        clickedPlayer = players.find((p) => p !== undefined && p.peripheralId == lastClick.peripheral);// || {click: 0}
        //only log this click to user if they haven't already clicked this round
        // console.log('Found player: ',clickedPlayer);
        // console.log(!clickedPlayer.click > startTime);
        if (clickedPlayer !== undefined && clickedPlayer.click < startTime && clickedPlayer.isAlive) {
          let removeAt = players.indexOf(clickedPlayer);
          clickedPlayer.click = lastClick.time;
          console.log('logging received click to player: ',clickedPlayer);
          players.splice(removeAt, 1, clickedPlayer);
          console.log('updated playerlist: ', players);
        }
      }
    }, 100)
    // while (this.state.timeRemaining > 0)
    this.setState({playerList: players});
  }

  mockClick(player) {
    let clickTime = Date.now();
    let players = this.state.playerList;
    let clickedPlayer = players.find((individual) => p !== undefined && individual.color == player.color);
    clickedPlayer.click = clickTime;
    let updateIndex = players.indexOf(clickedPlayer);
    players.splice(updateIndex,1);
    players.splice(updateIndex,0,clickedPlayer);
  }

  processRound() {
    let allPlayers = this.state.playerList;
    let remainingPlayers = this.state.playerList.filter((p) => p.isAlive == true);
    console.log('Scoring, remaining players before scoring: ', remainingPlayers);
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
      let updateIndex = allPlayers.indexOf(removePlayer);
      removePlayer.isAlive = false;
      allPlayers.splice(updateIndex, 1, removePlayer);
      remainingPlayers.splice(removeIndex, 1);
      this.setState({playerList: allPlayers});

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
      });
      this.setState({playerList: allPlayers});
    } else { //no one clicked in this round
      let newValue = this.state.noClickRoundCount + 1;
      this.setState({noClickRoundCount: newValue});
      if (newValue == 2) {
        //go to game over screen
      }
    }
    if (remainingPlayers.length>1) {
      // this.startNewRound();
      this.setState({nextRoundReady: true})
    } else {
      this.setState({
        nextRoundReady: false,
        gameWon: true
      });
      this.props.navigation.navigate('score', {
        players: this.state.playerList,
        resetPlayers: this.props.navigation.getParam('resetPlayers')
      });
    }
    console.log('Player list at end of round: ', this.state.playerList);
  }

  calcScores() {

  }

  startNewRound() {
    let remainingPlayers = this.state.playerList;
    remainingPlayers.forEach((player) => player.click = 0);
    this.setState({
      timeRemaining: 10,
      playerList: remainingPlayers,
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
    let displayPlayers = this.state.playerList.filter((p) => p.isAlive);
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => this.startTimer()}>
          <Text>Start round</Text>
        </TouchableOpacity> */}
        <Timer seconds={this.state.timeRemaining}/>
        <FlatList
            data={displayPlayers}
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
