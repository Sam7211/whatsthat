import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        };
    }

    handlefirstchange = (firstname) => {
        this.setState({ firstname });
    }

    handlelastchange = (lastname) => {
        this.setState({ lastname });
    }

    handleemailchange = (email) => {
        this.setState({ email });
    }

    handlepasschange = (password) => {
        this.setState({ password });
    }

    register = () => {
        const { firstname, lastname, email, password } = this.state;
        console.log(firstname)
        console.log(lastname)
        console.log(email)
        console.log(password)

        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        });

        return fetch('http://localhost:3333/api/1.0.0/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password,
            })
        })
            .then((response) => {
                throw "User Added!"
            })
            .catch((error) => {
                console.error(error);
            });



    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    onChangeText={this.handlefirstchange}
                    value={this.state.firstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    onChangeText={this.handlelastchange}
                    value={this.state.lastname}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={this.handleemailchange}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={this.handlepasschange}
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.register}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
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
