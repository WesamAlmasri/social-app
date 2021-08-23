import React, { ComponentType } from 'react';
import { View, FlatList } from 'react-native';
import Post from '../Post';
import styles from './style';
import { MessageType } from '../../types';
import MessageBubble from '../MessageBubble';

export type ConversationInterfaceProps = {
  conversation: MessageType[],
}


const ConversationInterface = ({ conversation }: ConversationInterfaceProps) => (
    <View style={styles.feedContainer}>
        <FlatList
            data={conversation}
            renderItem={({ item }) => <MessageBubble message={item} />}
            keyExtractor={(item) => item.id}
        />
    </View>
)

export default ConversationInterface;