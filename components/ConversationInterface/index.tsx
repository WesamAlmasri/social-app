import React, { useEffect, useRef } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './style';
import { MessageType } from '../../types';
import MessageBubble from '../MessageBubble';

export type ConversationInterfaceProps = {
    conversation: MessageType[] | null,
}


const ConversationInterface = ({ conversation }: ConversationInterfaceProps) => {
    const flatListRef = useRef(null);
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated: true, index: conversation?.length && conversation?.length - 1 || 0 });
        }
    }, [conversation]);

    return (
        <View style={styles.feedContainer}>
            {
                conversation && conversation.length === 0 ? <Text style={styles.noChatText}>No chat yet</Text> :

                    <FlatList
                        ref={flatListRef}
                        data={conversation}
                        renderItem={({ item }) => <MessageBubble message={item} />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        initialScrollIndex={conversation?.length && conversation?.length - 1 || 0}
                        onScrollToIndexFailed={(info) => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                            });
                        }
                        }
                    />
            }
        </View>
    )
}

export default ConversationInterface;