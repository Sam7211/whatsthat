import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
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

        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        const { orig_firstname, orig_lastname, orig_email } = this.props.route.params;
        this.setState({
            firstname: orig_firstname,
            lastname: orig_lastname,
            email: orig_email
        });
    }

    handleFirstnamechange(firstname) {
        this.setState({ firstname })
    };

    handleLastnamechange(lastname) {
        this.setState({ lastname })
    };

    handleEmailnamechange(email) {
        this.setState({ email })
    };

    handlePasswordnamechange(password) {
        this.setState({ password })
    };

    async updateUser() {
        const { firstname, lastname, email, password } = this.state;
        const { orig_firstname, orig_lastname, orig_email } = this.props.route.params;


        const user_id = await AsyncStorage.getItem("whatsthat_user_id");
        const updatedDetails = {};

        if (firstname !== orig_firstname) {
            updatedDetails.first_name = firstname;
        }
        if (lastname !== orig_lastname) {
            updatedDetails.last_name = lastname;
        }
        if (email !== orig_email) {
            updatedDetails.email = email;
        }
        if (password !== '') {
            updatedDetails.password = password;
        }


        return fetch('http://localhost:3333/api/1.0.0/user/' + user_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": await asyncStorage.getItem("whatsthat_session_token")
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

}
