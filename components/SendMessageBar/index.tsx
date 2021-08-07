import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './style';

export type SendMessageBarProps = {
    receiverId: string
}


const SendMessageBar = ({ receiverId }: SendMessageBarProps) => {
    const [message, setMessage] = useState('');

    const onSubmitMessage = () => {
        console.warn('Pressed', message);
    }

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

export default SendMessageBar;