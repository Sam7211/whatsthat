import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './StartScreen/Register';
import MainNav from './Navigation/MainNav';
import Login from './StartScreen/Login';
import Chats from './Navigation/Chats';
// import Profile from './Navigation/Profile';

const Stack = createNativeStackNavigator();


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen name="Screen1" component={Screen1} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainNav" component={MainNav} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
