import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import RegisterModal from '../components/RegisterModal';
import PlayerBox from '../components/PlayerBox';

let realms = [
  {
    color: '#7C9132',
    isPopulated: false
  },
  {
    color: '#292929',
    isPopulated: false
  },
  {
    color: '#5386AD',
    isPopulated: false
  },
  {
    color: '#BCAC46',
    isPopulated: false
  },
  {
    color: '#673D91',
    isPopulated: false
  },
  {
    color: '#88241E',
    isPopulated: false
  }
];

export default class RegistrationScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      realms: realms.slice(),
      registrationVisible: false,
      playerList: []
    };

  }

  componentDidMount() {
    console.log('reg mounted');
    this.setState({realms: realms.slice()});
  }

  registerPlayer(selectedBox) {
    console.log('Registering new player');
    this.setState({
      registrationVisible: true,
      colorPendingRegistration: selectedBox.color
    });

    //update info for rendering
    this.hideRegistration();
    let registrations = this.state.realms;
    let regToUpdate = registrations.find((reg) => reg.color == selectedBox.color);
    let removeIndex = registrations.indexOf(regToUpdate);
    console.log('updating registration for: ', regToUpdate);
    registrations.splice(removeIndex, 1);
    regToUpdate.name = 'Claimed';
    regToUpdate.color = selectedBox.color;
    regToUpdate.isPopulated = true;
    regToUpdate.click = 0;
    regToUpdate.points = 0;
    registrations.splice(removeIndex, 0, regToUpdate);

    //also add this player to playerlist
    // let players = this.state.playerList;
    let playerList = registrations.filter((realm) => realm.isPopulated == true);
    this.setState({
      realms: registrations,
      colorPendingRegistration: '',
      playerList: playerList
    });
  }

  startGame() {
    // console.log('playerlist on game start: ', this.state.playerList)
  }

  hideRegistration() {
    // let newValue = !this.state.registrationVisible;
    this.setState({ registrationVisible: false });
  }

  render() {
    // console.log('registration list: ', this.state.realms);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.startScan()}>
          <Text>{this.state.isScanning ? "Stop" : "Scan"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
              this.startGame();
              this.props.navigation.navigate('game', {players: this.state.playerList});
            }
          }>
          <Text>Start Game</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.realms}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.registerPlayer(item)}>
                    <PlayerBox displayInfo={item}></PlayerBox>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
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
  }
});
