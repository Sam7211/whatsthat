import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput, StyleSheet } from 'react-native';
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
            .then((info) => {
                this.setState({ user: info });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { search, user } = this.state;
        console.log(user)

        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        value={search}
                        style={styles.searchInput}
                        placeholder="Search Contacts"
                        onChangeText={(text) => this.setState({ search: text })}
                    />
                    <TouchableOpacity onPress={() => this.Search()}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={user}
                    renderItem={(info) => (
                        <View style={styles.itemContainer}>
                            <Text>{JSON.stringify(info)}</Text>
                            <Text>{info.given_name}</Text>
                            <Text>{info.family_name}</Text>
                            <Text>{info.email}</Text>
                        </View>
                    )}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    searchButtonText: {
        color: 'black',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});