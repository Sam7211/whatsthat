import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userinfo: null
    };
  }

  async GetInfo() {
    const userid = await AsyncStorage.getItem("whatsthat_user_id")
    return fetch('http://localhost:3333/api/1.0.0/user/' + userid, {
      method: 'GET',
      headers: {
        "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Cannot chat to this user';
        } else if (response.status === 401) {
          throw 'Attempt Unauthorised';
        } else if (response.status === 404) {
          throw 'Not Found';
        } else {
          throw 'Something went wrong on our end - Please try again later';
        }
      })
      .then((data) => {
        this.setState({ userinfo: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount(){
    this.GetInfo();
  }



  render() {
    console.log(this.state.userinfo)
    return (
      <View>

        {this.state.userinfo && (
          <Text>Name: {this.state.userinfo.first_name}</Text>
        )}

        <Button title="Go to CameraScreen" onPress={() => this.props.navigation.navigate('Camera')} />
      </View >
    );
  }
}

