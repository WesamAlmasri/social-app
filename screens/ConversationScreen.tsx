import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Dummy Data
import chatConversation from '../data/chatConversation';

export type ConversationScreenProps = {
  receiverId: string
}

export default function ConversationScreen({ receiverId }: ConversationScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Conversation Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec'
  },
});
