import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { axiosHandler, getData, tokenName, tokenType } from '../../helper';
import { StoreStateType } from '../../store/types';
import { MESSAGES_URL } from '../../urls';
import styles from './style';

export type SendMessageBarProps = {
    receiverId: string,
    addChatToConversation: Function
}


const SendMessageBar = ({ receiverId, addChatToConversation }: SendMessageBarProps) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null)
    const navigation = useNavigation();
    const { user } = useSelector(mapStateToProps);

    const createNewMessage = async () => {
        const tokenString = await getData(tokenName);
        if (!tokenString) {
          navigation.navigate('Login');
          return;
        }
        const token: tokenType = JSON.parse(tokenString);
    
        const response = await axiosHandler({
          url: MESSAGES_URL,
          method: 'POST',
          data: {
            receiver_id: receiverId,
            message: message
          },
          token: token.access_token,
        })?.catch(e => {
          setError(e.message);
        });
    
        if (response) {
            return response.data;
        } else {
          setError('Error occurred!');
        }
      }

    const onSubmitMessage = async () => {
        if(message === ''){
            setError('Empty message!');
            return;
        }
        addChatToConversation({
            created_at: Date.now(),
            id: String(Math.random()*100000000000000),
            message: message,
            receiver_id: receiverId,
            seen: false,
            sender_id: user?.id

        });
        setMessage('');
        await createNewMessage();
    }

    useEffect(() => {
        if (error) {
          Alert.alert(
            'Error',
            error,
            [{
              text: 'Ok',
            }]
          );
        }
      }, [error]);
    

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <TextInput
                style={styles.commentInput}
                onChangeText={text => setMessage(text)}
                value={message}
                placeholder='Message'
            />
            <TouchableOpacity onPress={onSubmitMessage} activeOpacity={0.8}>
                <Ionicons color={message === '' ? Colors.light.tabIconDefault : Colors.light.tabIconSelected} size={35} name='arrow-up-circle' />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state: StoreStateType) => ({
    user: state.user.user
  });

export default SendMessageBar;