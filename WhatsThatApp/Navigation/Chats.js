import React, { Component } from 'react';
import Chatscreen from '../Navigation/Chatscreen';
import NewChat from '../Navigation/NewChat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../Navigation/Search';
import Addcontact from '../Contacts/Addcontact';
import Viewcontacts from '../Contacts/Viewcontacts';
import Removecontact from '../Contacts/Removecontact';
import Blockcontact from '../Contacts/Blockcontact';
import Unblockcontact from '../Contacts/Unblockcontact';

const Stack = createNativeStackNavigator();

export default class Chats extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ChatScreen" component={Chatscreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewChat" component={NewChat} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Addcontact" component={Addcontact} options={{ headerShown: false }} />
        <Stack.Screen name="Viewcontacts" component={Viewcontacts} options={{ headerShown: false }} />
        <Stack.Screen name="Removecontact" component={Removecontact} options={{ headerShown: false }} />
        <Stack.Screen name="Blockcontact" component={Blockcontact} options={{ headerShown: false }} />
        <Stack.Screen name="Unblockcontact" component={Unblockcontact} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}