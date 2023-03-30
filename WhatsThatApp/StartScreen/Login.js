import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: "test1@test.com",
      password: "Hello123!"

    }
  }


  Login = () => {
    const{email, password} = this.state;
    //validation


    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      email: email,
      password: password
    })
})
      .then((response) => {
  if (response.status === 200) {
    this.props.navigation.navigate('MainNav')
    return response.json()
  } else {
    throw 'Error occurred'
  }
})
.then (async (rJson) => {
  console.log(rJson)
  try{
    await AsyncStorage.setItem("whatsthat_user_id", rJson.id)
    await AsyncStorage.setItem("whatsthat_session_token", rJson.token)

    this.setState({"submitted": false});

    this.props.navigation.navigate("MainNav")
  }catch{
    throw "something went wrong"
  }
})

  .catch((error) => {
    console.log(error);
  });
  };



render() {
  return (

    <View>
      <TextInput
        placeholder='Email'
        onChangeText={(value => this.setState({email: value}))}
        value={this.state.email}
      />

      <TextInput
        placeholder='Password'
        onChangeText={(value => this.setState({password: value}))}
        secureTextEntry = {true}
        value={this.state.password}
      />
      <Button
        title="Login"
        onPress={() => this.Login()}
      />

      <Button
        title="Need an account?"
        onPress={() => this.props.navigation.navigate('Register')}
        />
    </View>

// const styles = StyleSheet.create({
//   box: {
//     width: 50,
//     height: 50,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   button: {
//  padding: 8,
//    borderRadius: 4,
// backgroundColor: 'oldlace',
// alignSelf: 'flex-start',
//     marginRight: 10,
//    marginBottom: 10,
//    },
//  }


  );
}
}
