import React, { Component } from "react";
import { View, StatusBar, Alert, AsyncStorage } from "react-native";
import firebaseApp from 'react-native-firebase'
import { GiftedChat, MessageText, Day, Time, Bubble, SystemMessage, Composer, InputToolbar, Send } from 'react-native-gifted-chat'
import { sunglow, earlyDawn, putty, tana, alto, givry } from "../styles/colors";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

class ChatScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Chat Yuk!',
            headerStyle: {
                backgroundColor: sunglow,
            }, 
            headerTintColor: earlyDawn,
            headerTitleStyle: {
                textAlign: 'center',
                fontFamily: 'Lato Regular'
            },
            headerRight: <Icon 
                name="logout" 
                size={26} 
                color={earlyDawn} 
                style={{marginRight: 14}} 
                onPress={
                    () => Alert.alert('Log Out', 'Are you sure want to log out?', [
                        {text: "Cancel"}, 
                        {text: "Ok", onPress: 
                            async() => {
                                firebaseApp.auth().signOut()
                                await AsyncStorage.clear()
                                navigation.navigate('Splash')
                            }
                        }
                    ])} 
                />
        }
    }
    constructor() {
        super()
        this.state = {
            messages: [],
            user: {}
        }
        this._isMounted = false
    }
    loadUser = async() => {
        const userUid = await AsyncStorage.getItem('userToken')
        const name = await AsyncStorage.getItem('name')
        this.setState({user: {_id: userUid, name}})
    }
    loadMessages = () => {
        firebaseApp.database()
            .ref('messages')
            .limitToLast(5)
            .on('child_added', snapshot => {
                const { key } = snapshot
                const { createdAt, text, user } = snapshot.val()
                let message = {
                    _id: key,
                    createdAt: new Date(createdAt),
                    text,
                    user
                }
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, message),
                }))
            })
    }
    componentWillMount() {
        this.loadUser()
        this.loadMessages()
    }
    componentDidMount() {
        this._isMounted = true
    }
    componentWillUnmount() {
        firebaseApp.database().ref('messages').off()
        this._isMounted = false
    }
    onSend = (messages = []) => {
        messages.map(item => {
            const { text, user } = item
            const message = {
                text,
                user,
                createdAt: firebaseApp.database().getServerTime()
            }
            firebaseApp.database().ref('messages').push(message)
        })
    }
    renderBubble (props) {
        return <Bubble 
            {...props}
            wrapperStyle={{ 
                left: {borderRadius: 10, backgroundColor: putty},
                right: {borderRadius: 10, backgroundColor: sunglow}, 
            }}
            bottomContainerStyle={{
                left: {justifyContent: 'flex-start'}
            }}
        />
    }
    renderMessageText (props) {
        return <MessageText 
            {...props}
            textStyle={{
                left: {
                    marginTop: 8,
                    color: earlyDawn,
                    fontSize: 14,
                    fontFamily: 'Lato Regular'
                },
                right: {
                    marginTop: 8,
                    color: earlyDawn,
                    fontSize: 14,
                    fontFamily: 'Lato Regular'
                }
            }}
        />
    }
    renderDay (props) {
        return <Day 
            {...props}
            textStyle={{color: sunglow, fontSize: 12, fontFamily: 'Lato Regular'}}
        />
    }
    renderTime (props) {
        return <Time 
            {...props}
            textStyle={{
                left: {
                    color: earlyDawn,
                    fontSize: 10,
                    textAlign: 'left',
                    fontFamily: 'Lato Regular'
                },
                right: {
                    color: earlyDawn,
                    fontSize: 10,
                    fontFamily: 'Lato Regular'
                }
            }}
        />
    }
    renderSystemMessage (props) {
        return (
            <SystemMessage 
                {...props}
                textStyle={{color: tana, fontSize: 12, fontFamily: 'Lato Regular'}}
            />
        )
    }
    renderInputToolbar (props) {
        return (
            <InputToolbar 
                {...props}
                containerStyle={{borderTopColor: givry, borderTopWidth: 1}}
            />
        )
    }
    renderComposer (props) {
        return (
            <Composer 
                {...props}
                placeholderTextColor={alto}
            />
        )
    }
    renderSend (props) {
        return (
            <Send 
                {...props}
                containerStyle={{justifyContent: 'center'}}
                alwaysShowSend
            >
                <Icon name="send" size={26} color={sunglow} style={{marginRight: 10}} />
            </Send>
        )
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: sunglow}}>
                <StatusBar backgroundColor={sunglow}/>
                { this._isMounted ? 
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={this.onSend}
                        user={this.state.user}
                        renderBubble={this.renderBubble}
                        renderMessageText={this.renderMessageText}
                        renderDay={this.renderDay}
                        renderTime={this.renderTime}
                        renderSystemMessage={this.renderSystemMessage}
                        renderInputToolbar={this.renderInputToolbar}
                        renderComposer={this.renderComposer}
                        renderSend={this.renderSend}
                        placeholder="Type a message..."
                    />
                    : null
                }
            </View>
        );
    }
}

export default ChatScreen;