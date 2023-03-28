import React, { Component } from 'react';
import { Text, View, Button, TextInput} from 'react-native';

export default class Register extends Component{
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
    console.log (firstname)
    console.log (lastname)
    console.log (email)
    console.log (password)

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

render(){
    return (
        <View>
            <TextInput
                placeholder='First Name'
                onChangeText={this.handlefirstchange}
                value={this.state.firstname}
            />
            <TextInput
                placeholder='Last Name'
                onChangeText={this.handlelastchange}
                value={this.state.lastname}
            />
            <TextInput
                placeholder='Email'
                onChangeText={this.handleemailchange}
                value={this.state.email}
            />
            <TextInput
                placeholder='Password'
                onChangeText={this.handlepasschange}
                secureTextEntry = {true}
                value={this.state.password}
            />

            <Button
                title="Create Account"
                onPress={this.register}
            />
        </View>

        );
    }
}
