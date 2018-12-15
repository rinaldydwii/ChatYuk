import React, { Component } from "react";
import { View, Text, StatusBar, Animated, Easing, TouchableHighlight } from "react-native";
import Logo from "../assets/Logo";
import { blackWhite, sunglow, gorse, earlyDawn } from "../styles/colors";

class WelcomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            bottomPos: new Animated.Value(0),
            fadeContent: new Animated.Value(0)
        }
    }
    join = () => {
        this.props.navigation.navigate('Join')
    }
    componentDidMount() {
        Animated.sequence([
            Animated.timing(
                this.state.bottomPos,
                {
                    toValue: 298,
                    duration: 500,
                    easing: Easing.elastic(1.5)
                }
            ),
            Animated.delay(250),
            Animated.timing(
                this.state.fadeContent,
                {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.linear
                }
            )
        ]).start()
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: sunglow}}>
                <StatusBar backgroundColor={sunglow}/>
                <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: this.state.bottomPos, left: 0, right: 0}}>
                    <Logo width={116} height={107} />
                    <Text style={{color: blackWhite, fontSize: 33, fontFamily: 'Lato Regular'}}><Text style={{color: gorse, fontFamily: 'Lato Heavy'}}>Chat</Text>Yuk!</Text>
                </Animated.View>
                <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 173, opacity: this.state.fadeContent}}>
                    <Text style={{color: earlyDawn, fontSize: 14, lineHeight: 21, maxWidth: 200, textAlign: 'center', marginBottom: 120, fontFamily: 'Lato Regular'}}>ChatYuk is a prototype of chat application build with React Native and Firebase.</Text>
                    <Text style={{color: earlyDawn, fontSize: 14, lineHeight: 21, maxWidth: 200, marginBottom: 25, fontFamily: 'Lato Regular'}}>Click join to try ChatYuk</Text>
                    <TouchableHighlight style={{backgroundColor: earlyDawn, borderRadius: 10, padding: 8, width: 120}} onPress={this.join} underlayColor={gorse}>
                        <Text style={{fontSize: 14, color: sunglow, textAlign: 'center', fontFamily: 'Lato Regular'}}>Join</Text>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }
}

WelcomeScreen.navigationOptions = {
    headerTransparent: true
}

export default WelcomeScreen;