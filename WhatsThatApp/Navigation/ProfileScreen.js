import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput } from 'react-native';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userinfo: null,
      user_id: null,
      photo: null,
    };
  }

  async GetInfo(){
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
    this.get_profile_image()
  }

    async get_profile_image(){

      const user_id =  await AsyncStorage.getItem("whatsthat_session_token")
      fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
            method: "GET",
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
                'Content-Type': 'image/PNG'
            }
        })
        .then((res) => {
            return res.blob()
        })
        .then((resBlob) => {
            let data = URL.createObjectURL(resBlob);

            this.setState({
                photo: data,
                isLoading: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }



    render(){
      console.log(photo)
      if(this.state.photo){
          return (
              <View style={{flex:1}}>
                  <Image
                      source={{
                          uri: this.state.photo
                      }}
                      style={{
                          width: 100,
                          height: 100
                      }}
                  />
              </View>
          )
      }else{
          return (<Text>Loading</Text>)
      }
  }

  render() {
    console.log(this.state.userinfo)
    return (
      <View>

        

        {this.state.userinfo && (
          <Text>Name: {this.state.userinfo.first_name}</Text>
        )}

        {this.state.userinfo && (
          <Text>Surname: {this.state.userinfo.last_name}</Text>
        )}

        {this.state.userinfo && (
          <Text>Email: {this.state.userinfo.email}</Text>
        )}

        <Button title="Add Photo" onPress={() => this.props.navigation.navigate('Camera')} />
      </View >
    );
  }

  
}

