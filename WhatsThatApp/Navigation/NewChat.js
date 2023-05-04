import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default class NewChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Chat: "",
        }
        this.NewChat = this.NewChat.bind(this);
    }

    async NewChat() {
        const { Chat } = this.state;
        return fetch('http://localhost:3333/api/1.0.0/chat', {
            method: 'POST',
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Chat,
            })
        })
            .then((response) => {
                if (response.status === 201) {
                    this.props.navigation.navigate('Chats');
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
            .then((info) => {
                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Create Chat'
                    onChangeText={(Chat) => this.setState({ Chat })}
                    value={this.state.Chat}
                />
                <Button style={styles.button}
                    title="New Chat"
                    onPress={this.NewChat}
                />

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
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 5,
      height: 40,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
});