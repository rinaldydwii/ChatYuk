import React, { Component } from "react";
import { View, Text, StatusBar, TouchableHighlight, TextInput, AsyncStorage, ActivityIndicator, Dimensions, ToastAndroid } from "react-native";
import { gorse, blackWhite, sunglow, earlyDawn, givry } from "../styles/colors";
import Logo from "../assets/Logo";
import firebaseApp from 'react-native-firebase'

class JoinScreen extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            isPressed: false
        }
    }
    join = async() => {
        if (this.state.name) {
            this.setState({isPressed: true})
            firebaseApp.auth().signInAnonymously().then(async() => {
                const userUid = firebaseApp.auth().currentUser.uid
                await AsyncStorage.setItem('userToken', userUid)
                await AsyncStorage.setItem('name', this.state.name)
                this.props.navigation.navigate('App')
            })
        }
        else ToastAndroid.show('Name is required!', ToastAndroid.SHORT)
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: sunglow}}>
                <StatusBar backgroundColor={sunglow}/>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 100, left: 0, right: 0}}>
                    <Logo width={116} height={107} />
                    <Text style={{color: blackWhite, fontSize: 33, fontFamily: 'Lato Regular'}}><Text style={{color: gorse, fontFamily: 'Lato Heavy'}}>Chat</Text>Yuk!</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', paddingTop: (Dimensions.get('window').height/2) - (85/2)}}>
                    <TextInput 
                        style={{width: 250, fontSize: 14, color: earlyDawn, marginBottom: 20, textAlign: 'center', fontFamily: 'Lato Regular'}} 
                        underlineColorAndroid={earlyDawn}
                        placeholder="Enter your name here..."
                        placeholderTextColor={givry}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                    />
                    { this.state.isPressed ? <ActivityIndicator color={earlyDawn} />
                    : (
                        <TouchableHighlight style={{backgroundColor: earlyDawn, borderRadius: 10, padding: 8, width: 120}} onPress={this.join} underlayColor={gorse}>
                            <Text style={{fontSize: 14, color: sunglow, textAlign: 'center', fontFamily: 'Lato Regular'}}>Join</Text>
                        </TouchableHighlight>
                    )}
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