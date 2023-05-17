import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chats from '../Navigation/Chats';
import Profile from '../Navigation/Profile';

const Tab = createBottomTabNavigator();

export default class MainNav extends Component {

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}