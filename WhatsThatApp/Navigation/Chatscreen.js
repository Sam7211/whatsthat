import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-web';

export default class Chatscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Chats: [],
            isLoading: true,
            chat: []

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

    SignOut = () => {
        return fetch('http://localhost:3333/api/1.0.0/logout', {
            method: 'POST',
            headers: {
                "X-Authorization": AsyncStorage.getItem("whatsthat_session_token")
            }
        })
            .then(async (Response) => {
                if (Response.status === 200) {
                    await AsyncStorage.removeItem("whatsthat_session_token")
                    await AsyncStorage.removeItem("whatsthat_user_id")
                    this.props.navigation.navigate("Login")
                } else if (Response.status === 401) {
                    console.log("Unauthorised")
                    await AsyncStorage.removeItem("whatsthat_session_token")
                    await AsyncStorage.removeItem("whatsthat_user_id")
                    this.props.navigation.navigate("Login")
                } else {
                    throw "Something went wrong on our end. Please try again"
                }
            })
        // .catch((error) => {
        //     this.setState({"error": error})
        //     this.setState({"Submitted": false})
        // })
    }



    componentDidMount() {
        this.Chats();
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.chat}
                    renderItem={({ item }) => (
                        <Text style={styles.item}>{item.name}</Text>
                    )}
                    keyExtractor={(item) => item.id}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NewChat')}>
                        <Text style={styles.buttonText}>New Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Search')}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Addcontact')}>
                        <Text style={styles.buttonText}>Add Contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.SignOut}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    item: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
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

