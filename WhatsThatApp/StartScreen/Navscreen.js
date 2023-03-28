import Chats from '../Navigation/Chats'
import Profile from '../Navigation/Profile'

export default class Navscreen extends Component{

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.checkLoggedIn();
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('whatsthat_session_token');
        if (value == null){
            this.props.navigation.navigate('login');
        }
    };

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name = 'Chats' component = {Chats}></Tab.Screen>
                <Tab.Screen name = 'Profile' component = {Profile}></Tab.Screen>
            </Tab.Navigator>
        )
    }




}