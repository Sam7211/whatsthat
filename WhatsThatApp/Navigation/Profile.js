import React, { Component } from 'react';
import ProfileScreen from '../Navigation/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default class Chats extends Component {
  render() {
    return (
      <Stack.Navigator>
       <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} options={{headerShown: false}}/>
       </Stack.Navigator> 
    );
  }
}