import React, { Component } from "react";
import { View, Text, StatusBar, Alert } from "react-native";
import { GiftedChat, MessageText, Day, Time, Bubble, SystemMessage, Composer, InputToolbar, Send } from 'react-native-gifted-chat'
import { sunglow, earlyDawn, putty, tana, alto, givry } from "../styles/colors";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

class ChatScreen extends Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }
    componentWillMount() {
        this.setState({
          messages: [
            {
                _id: "3",
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
            {
                _id: "2",
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'Aldy',
                },
            },
            {
                _id: "1",
                text: 'Welcome to ChatYuk!',
                createdAt: new Date(),
                system: true,
                // Any additional custom parameters are passed through
            },
          ],
        })
      }
    onSend = (messages = []) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: 1,
                    }}
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
            </View>
        );
    }
}

ChatScreen.navigationOptions = {
    title: 'Chat Yuk!',
    headerStyle: {
        backgroundColor: sunglow,
    }, 
    headerTintColor: earlyDawn,
    headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'Lato Regular'
    },
    headerRight: <Icon name="logout" size={26} color={earlyDawn} style={{marginRight: 14}} onPress={() => Alert.alert('Test', 'Test')} />
}

export default ChatScreen;