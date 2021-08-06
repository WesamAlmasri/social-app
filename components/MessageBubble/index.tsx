import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { MessageType } from '../../types';

// Dummy Data
import meProfile from '../../data/meProfile';
import moment from 'moment';

export type MessageBubbleProps = {
    message: MessageType,
}


const MessageBubble = ({ message }: MessageBubbleProps) => (
    <View style={{...styles.messageContainer, backgroundColor: message.sender_id === meProfile.id ? '#c4dcff' : '#eeeeee', alignSelf: message.sender_id === meProfile.id ? 'flex-end' : 'flex-start'}}>
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.createdAt}>{moment(message.created_at).fromNow()}</Text>
    </View>
)

export default MessageBubble;