import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Logout extends Component {
    constructor (props) {
        super(props);
    }


    
    async Logout() {
        return fetch ('http://localhost:3333/api/1.0.0/logout', {
            method: 'POST',
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
            }
        } )
        .then(async (Response) => {
            if (Response.status === 200){
                await AsyncStorage.removeItem("whatsthat_session_token")
                await AsyncStorage.removeItem("whatsthat_user_id")
                this.props.navigation.navigate("Login")
            } else if (Response.status === 401) {
                console.log("Unauthorised")
                await AsyncStorage.removeItem("whatsthat_session_token")
                await AsyncStorage.removeItem("whatsthat_user_id")
                this.props.navigation.navigate("Login")
            } else {
                throw "Something went wrong on our end."
            }
        } )
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"Submitted": false})
        })
    }




    render(){
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={this.Logout}
                />
            </View>
        

        );
    }


}