import React, { Component } from "react";
import { View, Text, StatusBar, Animated, Easing, AsyncStorage } from "react-native";
import { sunglow, blackWhite, gorse } from "../styles/colors";
import Logo from "../assets/Logo";

class SplashScreen extends Component {
    constructor() {
        super()
        this.state = {
            // userToken: '',
            isAuthenticated: false,
            fadeAnim: new Animated.Value(0)
        }
    }
    loadUserToken = async() => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
        this.loadUserToken()
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: sunglow, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={sunglow}/>
                <Animated.View style={{alignItems: 'center', opacity: this.state.fadeAnim}}>
                    <Logo width={116} height={107} />
                    <Text style={{color: blackWhite, fontSize: 33, fontFamily: 'Lato Regular'}}><Text style={{color: gorse, fontFamily: 'Lato Heavy'}}>Chat</Text>Yuk!</Text>
                </Animated.View>
            </View>
        );
    }
}
export default SplashScreen;