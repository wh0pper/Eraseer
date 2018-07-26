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
      players: this.props.navigation.getParam('players', []),
      lastPlayerStanding: this.props.navigation.getParam('lastPlayerStanding', {})
    };

  }

  componentDidMount() {
    let players = this.state.players;
    players.sort((a,b) => {return b.points - a.points});
    this.setState({players: players});
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Score screen</Text>
        <Text>Last player standing:</Text>
        <PlayerBox displayInfo={this.state.lastPlayerStanding}></PlayerBox>
        <Text>Point Totals:</Text>
        <FlatList
            data={this.state.players}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <PlayerBox displayInfo={item}></PlayerBox>
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
  }
});
