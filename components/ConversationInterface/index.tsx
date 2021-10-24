import React, { ComponentType } from 'react';
import { View, FlatList, Text } from 'react-native';
import Post from '../Post';
import styles from './style';
import { MessageType } from '../../types';
import MessageBubble from '../MessageBubble';

export type ConversationInterfaceProps = {
    conversation: MessageType[] | null,
}


const ConversationInterface = ({ conversation }: ConversationInterfaceProps) => {
   
    return (
        <View style={styles.feedContainer}>
            {
                conversation && conversation.length === 0 ? <Text style={styles.noChatText}>No chat yet</Text> :

                    <FlatList
                        data={conversation}
                        renderItem={({ item }) => <MessageBubble message={item} />}
                        keyExtractor={(item) => item.id}
                    />
            }
        </View>
    )
}

export default ConversationInterface;