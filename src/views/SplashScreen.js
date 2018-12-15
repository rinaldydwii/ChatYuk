import React, { Component } from "react";
import { View, Text, StatusBar, Animated, Easing } from "react-native";
import { sunglow, blackWhite, gorse } from "../styles/colors";
import Logo from "../assets/Logo";

class SplashScreen extends Component {
    constructor() {
        super()
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
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
        setTimeout(() => this.props.navigation.navigate('Auth'), 2000)
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