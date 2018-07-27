import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.visible}
          onRequestClose={() => null}>
          <View style={styles.container}>
            <Text>Press your ruin to claim the realm of {this.props.realm.name}</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.hide()
              }}>
              <Text>X</Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => {
                this.props.register(this.state.name);
                this.setState({name: ''});
              }}
              >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  }
});
