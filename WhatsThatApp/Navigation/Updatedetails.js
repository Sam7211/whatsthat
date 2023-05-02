import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class UpdateDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };

        this.changeDetails = this.changeDetails.bind(this)
    }

    componentDidMount() {
        const { userfirstname, userlastname, useremail } = this.props.route.params;
        this.setState({
            firstname: userfirstname,
            lastname: userlastname,
            email: useremail
        });
    }

    Firstnamechange(firstname) {
        this.setState({ firstname })
    };

    Lastnamechange(lastname) {
        this.setState({ lastname })
    };

    Emailnamechange(email) {
        this.setState({ email })
    };

    Passwordchange(password) {
        this.setState({ password })
    };

    async changeDetails() {
        const { firstname, lastname, email, password } = this.state;
        const { userfirstname, userlastname, useremail } = this.props.route.params;


        const user_id = await AsyncStorage.getItem("whatsthat_user_id");
        const updatedDetails = {};

        if (firstname !== userfirstname) {
            updatedDetails.first_name = firstname;
        }
        if (lastname !== userlastname) {
            updatedDetails.last_name = lastname;
        }
        if (email !== useremail) {
            updatedDetails.email = email;
        }
        if (password !== '') {
            updatedDetails.password = password;
        }


        return fetch('http://localhost:3333/api/1.0.0/user/' + user_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
            },
            body: JSON.stringify(updatedDetails)
        })
            .then((Response) => {
                Alert.alert('User Information Updated');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Information Not Updated');
                ;
            })

    }



    render() {
        return (
            <View>
                <TextInput
                    placeholder='First Name'
                    onChangeText={( firstname ) => this.Firstnamechange(firstname)}
                value={this.state.firstname}
            />
                <TextInput
                    placeholder='Last Name'
                    onChangeText={( lastname ) => this.Lastnamechange(lastname)}
                value={this.state.lastname}
            />
                <TextInput
                    placeholder='Email'
                    onChangeText={( email ) => this.Emailnamechange(email)}
                value={this.state.email}
            />
                <TextInput
                    placeholder='Password'
                    onChangeText={( password ) => this.Passwordchange(password)}
                secureTextEntry = {true}
                value={this.state.password}
            />

                <Button
                    title="Update Details"
                    onPress={this.changeDetails}
                />
            </View>


        );

    }

}
