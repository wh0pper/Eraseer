import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native';
import SmallPlayerBox from '../components/SmallPlayerBox';
import Timer from '../components/Timer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CustomText from '../components/CustomText';

export default class GameScreen extends Component {
  constructor(props) {

    super(props);

    this.timerRotation = new Animated.Value(0);
    this.state = {
      playerList: this.props.navigation.getParam('players', []), //was initialPlayers
      //remainingPlayers: this.props.navigation.getParam('players', []).slice(),
      gameWon: false,
      noClickRoundCount: 0,
      timeRemaining: this.props.navigation.getParam('timeRemaining', 10)
    };

  }

  componentDidMount() {
    console.log('game component did mount, starting timer');
    console.log('passed params to game screen: ', this.props.navigation.state.params);
    this.focusListener = this.props.navigation.addListener('willFocus', this.componentWillFocus.bind(this));
    // this.startTimer();
  }

  componentWillFocus() {
    console.log('game screen will focus');
    this.setState({timeRemaining: 10});

    Animated.timing(
      this.timerRotation,
      {
        toValue: 0,
        duration: 1000,
        // easing: Easing.cubic
      }
    ).start();
    // this.startTimer();
    //put back later, easier to flow through while debugging w/o this.startTimer();
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }



  startTimer() {
    let startTime = Date.now();
    console.log('Round start time: ', startTime);
    this.listenForClick(startTime);
    let animationTarget = 1;
    let timer = setInterval(() => {
      //trigger animation every second
      Animated.timing(
        this.timerRotation,
        {
          toValue: animationTarget,
          duration: 1000,
          // easing: Easing.cubic
        }
      ).start();
      animationTarget++;
      let newValue = this.state.timeRemaining - 1;
      if (newValue >= 0) {
        // this.animateTimer();
        this.setState({timeRemaining: newValue});
      } else {
        clearInterval(timer);
        this.processRound(startTime);
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

  processRound(startTime) {
    let removePlayer;
    let allPlayers = this.state.playerList;
    let remainingPlayers = this.state.playerList.filter((p) => p.isAlive == true);
    // console.log('remaining players before scoring: ', remainingPlayers);
    //determine elimination
    let clickers = remainingPlayers.filter((p) => p !== undefined && p.click > startTime);
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
      removePlayer = remainingPlayers[removeIndex];
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
    // console.log('removed player sent to remove screen', removePlayer);
    this.props.navigation.navigate('remove', {
      removedPlayer: removePlayer,
      players: this.state.playerList,
      // resetPlayers: this.props.navigation.getParam('resetPlayers')
    });
    console.log('Player list at end of round: ', this.state.playerList);
    // console.log('remaining players list at end of round', remainingPlayers);
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

    // //console.log('player list in game screen: ', this.props.navigation.getParam('players','no players'));
    //console.log('player list from state in game: ', this.state.remainingPlayers);
    let displayPlayers = this.state.playerList.filter((p) => p.isAlive);
    const timerRotation = this.timerRotation.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      outputRange: ['0deg', '30deg', '60deg', '90deg', '120deg', '150deg', '180deg', '210deg', '240deg', '270deg', '300deg', '330deg', '360deg']
    });

    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        onSwipeDown={() => this.startTimer()}
        style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.playersContainer}>
            <FlatList
                data={displayPlayers}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                renderItem={({item}) => {
                  return (
                    <View>
                      <SmallPlayerBox displayInfo={item}></SmallPlayerBox>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.timerContainer}>
              <Timer
                seconds={this.state.timeRemaining}
                rotationInterpolation={timerRotation}/>
            </View>
            <CustomText>{`OVERSEERS MAY USE RUNES\n TO CAST POWER TO ERASE\n`}</CustomText>
            <CustomText>SWIPE DOWN TO START</CustomText>
            <View style={styles.afterContainer}>
              {/* <TouchableOpacity onPress={() => this.startTimer()}>
                <CustomText>Start round</CustomText>
              </TouchableOpacity> */}
            </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    padding: 20
  },
  playersContainer: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // height: 300
  },
  timerContainer: {
    flex: 5
  },
  afterContainer: {
    flex: 1
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
