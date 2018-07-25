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
      name: ''
    };
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.visible}
          onRequestClose={() => null}>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={() => {
                this.props.hide()
              }}>
              <Text>X</Text>
            </TouchableHighlight>
            <TextInput
              placeholder="name"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
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
    justifyContent: 'space-around',
    padding: 10
  }
});
