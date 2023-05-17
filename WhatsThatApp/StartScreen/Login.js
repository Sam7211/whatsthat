import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-web';



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
    const { email, password } = this.state;
    //validation
    if (!(this.state.email && this.state.password)) {
      this.setState({ error: "Must enter email and password" })
      return;
    }

    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)" })
      return;
    }


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
      .then(async (rJson) => {
        console.log(rJson)
        try {
          await AsyncStorage.setItem("whatsthat_user_id", rJson.id)
          await AsyncStorage.setItem("whatsthat_session_token", rJson.token)

          this.setState({ "submitted": false });

          this.props.navigation.navigate("MainNav")
        } catch {
          throw "something went wrong"
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };



  render() {
    return (

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(value => this.setState({ email: value }))}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={(value => this.setState({ password: value }))}
          secureTextEntry={true}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.Login()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Need an account?</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});