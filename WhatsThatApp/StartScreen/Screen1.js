import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class App extends Component {
    render(){
        return (
            <View>
                <Button
                    title='Register'
                   onPress={() => this.props.navigation.navigate('Register')}
                />
                <Button
                    title='Login'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
    
            );
        }
    }