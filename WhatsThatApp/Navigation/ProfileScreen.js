import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userinfo: null,
      user_id: null,
      photo: null,
    };
  }

  async GetInfo() {
    const userid = await AsyncStorage.getItem("whatsthat_user_id")
    return fetch('http://localhost:3333/api/1.0.0/user/' + userid, {
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
        this.setState({ userinfo: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.GetInfo();
    this.get_profile_image()
  }

  async get_profile_image() {

    const user_id = await AsyncStorage.getItem("whatsthat_session_token")
    fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
      method: "GET",
      headers: {
        "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
        'Content-Type': 'image/PNG'
      }
    })
      .then((res) => {
        return res.blob()
      })
      .then((resBlob) => {
        let data = URL.createObjectURL(resBlob);

        this.setState({
          photo: data,
          isLoading: false
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    console.log(this.state.userinfo);
  
    if (this.state.photo) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.photo }}
            style={styles.image}
          />
  
          {this.state.userinfo && (
            <Text style={styles.text}>Name: {this.state.userinfo.first_name}</Text>
          )}
  
          {this.state.userinfo && (
            <Text style={styles.text}>Surname: {this.state.userinfo.last_name}</Text>
          )}
  
          {this.state.userinfo && (
            <Text style={styles.text}>Email: {this.state.userinfo.email}</Text>
          )}
  
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Updatedetails', {userfirstname: this.state.userinfo.first_name, userlastname: this.state.userinfo.last_name, useremail: this.state.userinfo.email})}>
            <Text style={styles.buttonText}>Update Details</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (<Text>Loading</Text>);
    }
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 5,
      height: 40,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });


