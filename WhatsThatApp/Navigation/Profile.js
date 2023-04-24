import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camerascreen from './Camera';
import ProfileScreen from './ProfileScreen';



const Stack = createNativeStackNavigator();

export default class Chats extends Component {
  render() {
    return (
      <Stack.Navigator>
       <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Camera" component = {Camerascreen} options={{headerShown: false}}/>
       </Stack.Navigator> 
    );
  }
}