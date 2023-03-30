import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Chatscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Chats: [],
            isLoading: true,

        }
    }
    async Chats() {
        return fetch('http://localhost:3333/api/1.0.0/chat', {
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
                this.setState({ chat: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {
        return (
            <View>
                <Text>\Hi</Text>
                <FlatList
                    data={this.state.Chats}
                    renderItem = {({ item }) => (
                        <Text>{item.name}</Text>
                    )}
                />

            </View >
        );
    };
}

