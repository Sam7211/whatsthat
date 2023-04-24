import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <View>
        <Text>YOOOOOOOOO</Text>
        <Button title="Go to CameraScreen" onPress={() => this.props.navigation.navigate('Camera')} />
      </View >
      );
  }
}
