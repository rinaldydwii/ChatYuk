import React, { Component } from "react";
import { View, Text, StatusBar, TouchableHighlight, TextInput, KeyboardAvoidingView } from "react-native";
import { Header } from 'react-navigation'
import { gorse, blackWhite, sunglow, earlyDawn, givry } from "../styles/colors";
import Logo from "../assets/Logo";

class JoinScreen extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }
    join = () => {
        if (this.state.name)
            this.props.navigation.navigate('App', {name: this.state.name})
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: sunglow}}>
                <StatusBar backgroundColor={sunglow}/>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 298, left: 0, right: 0}}>
                    <Logo width={116} height={107} />
                    <Text style={{color: blackWhite, fontSize: 33, fontFamily: 'Lato Regular'}}><Text style={{color: gorse, fontFamily: 'Lato Heavy'}}>Chat</Text>Yuk!</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50}}>
                    <TextInput 
                        style={{width: 250, fontSize: 14, color: earlyDawn, marginBottom: 20, textAlign: 'center', fontFamily: 'Lato Regular'}} 
                        underlineColorAndroid={earlyDawn}
                        placeholder="Enter your name here..."
                        placeholderTextColor={givry}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                    />
                    <TouchableHighlight style={{backgroundColor: earlyDawn, borderRadius: 10, padding: 8, width: 120}} onPress={this.join} underlayColor={gorse}>
                        <Text style={{fontSize: 14, color: sunglow, textAlign: 'center', fontFamily: 'Lato Regular'}}>Join</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        );
    }
}

JoinScreen.navigationOptions = {
    headerTransparent: true,
    headerTintColor: earlyDawn
}

export default JoinScreen;