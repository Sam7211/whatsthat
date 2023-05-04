import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            search: ''
        };
    }

    componentDidMount() {
        this.searchUsers();
    }

    async searchUsers() {
        const { search } = this.state;

        return fetch('http://localhost:3333/api/1.0.0/search?search_in=all&q=' + this.state.search, {
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
                    throw 'Error Message';
                } else {
                    throw 'Something went wrong - Try again';
                }
            })
            .then((data) => {
                this.setState({ user: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { search, user } = this.state;
        console.log(user)

        return (
            <View>
                <View>
                    <TextInput
                        value={search}
                        placeholder="Search Contacts"
                        onChangeText={(text) => this.setState({ search: text })}
                    />
                    <TouchableOpacity onPress={() => this.Search()}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                {user && (
                    <FlatList
                        data={user}
                        renderItem={({ data }) => (
                            <View>
                                <Text>{data.given_name}</Text>
                                <Text>{data.family_name}</Text>
                                <Text>{data.email}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    };
} 
