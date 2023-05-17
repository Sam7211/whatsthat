import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default class Addcontact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
    };
  }

  handleInputChange = (text) => {
    this.setState({ user_id: text });
  }

  AddContact = async () => {
    const user_id = this.state.user_id.trim();

    if (user_id.length > 0) {
      try {
        const response = await fetch('http://localhost:3333/api/1.0.0/user/' + user_id + '/contact', {
          method: 'POST',
          headers: {
            "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log('User Added');
          this.props.navigation.navigate('Chats');
        } else if (response.status === 400) {
          throw 'Cannot Add User';
        } else if (response.status === 401) {
          throw 'Unauthorized';
        } else if (response.status === 404) {
          throw 'Not Found';
        } else {
          throw 'Something went wrong - try again';
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please enter a valid user");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Contacts"
          onChangeText={this.handleInputChange}
          value={this.state.user_id}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.AddContact}
        >
          <Text style={styles.buttonText}>Add Contacts</Text>
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
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
